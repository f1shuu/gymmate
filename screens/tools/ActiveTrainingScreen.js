import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';
import Modal from '../../components/Modal';

import DataController from '../../helpers/dataController';
import { useSettings } from '../../helpers/SettingsProvider';

const getRequiredSteps = (exercise) => {
    if (exercise.data?.type === 'time_based') return 1;
    const sets = Number.parseInt(exercise.data?.setsAmount, 10);
    return Number.isFinite(sets) && sets > 0 ? sets : 1;
}

const calculateExerciseVolume = (exercise) => {
    if (exercise.data?.type !== 'reps_based') return 0;

    const sets = Number.parseInt(exercise.data?.setsAmount, 10) || 0;
    const reps = Number.parseInt(exercise.data?.repsAmount, 10) || 0;
    const weightText = String(exercise.data?.weight || '');
    const weight = Number.parseFloat(weightText.replace(',', '.')) || 0;
    const weightInKilograms = /lbs/i.test(weightText) ? weight * 0.453592 : weight;
    return sets * reps * weightInKilograms;
}

const calculateWorkoutStats = (exercises) => exercises.reduce((stats, exercise) => {
    const sets = getRequiredSteps(exercise);
    const reps = exercise.data?.type === 'reps_based'
        ? (Number.parseInt(exercise.data?.repsAmount, 10) || 0) * sets
        : 0;
    return {
        sets: stats.sets + sets,
        reps: stats.reps + reps
    }
}, { sets: 0, reps: 0 })

const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    const minuteAndSecond = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return hours > 0 ? `${hours}:${minuteAndSecond}` : minuteAndSecond;
}

export default function ActiveTrainingScreen({ route }) {
    const training = route.params?.training || { name: '' };
    const exercises = route.params?.exercises || [];
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [checkedSteps, setCheckedSteps] = useState(() => Array(getRequiredSteps(exercises[0] || {})).fill(false));
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [pendingExitAction, setPendingExitAction] = useState(null);
    const [sessionStats, setSessionStats] = useState(null);
    const startedAt = useRef(Date.now());
    const allowExit = useRef(false);
    const completionLock = useRef(false);

    const { settings, theme, translate } = useSettings();
    const navigation = useNavigation();
    const currentExercise = exercises[exerciseIndex];
    const isLastExercise = exerciseIndex === exercises.length - 1;
    const allStepsChecked = checkedSteps.length > 0 && checkedSteps.every(Boolean);
    const completedSteps = checkedSteps.filter(Boolean).length;
    const workoutVolume = useMemo(
        () => Math.round(exercises.reduce((total, exercise) => total + calculateExerciseVolume(exercise), 0)),
        [exercises]
    )
    const workoutStats = useMemo(() => calculateWorkoutStats(exercises), [exercises]);

    useEffect(() => {
        const removeListener = navigation.addListener('beforeRemove', event => {
            if (isCompleted || allowExit.current || !currentExercise) return;
            event.preventDefault();
            setPendingExitAction(currentAction => currentAction || {
                type: 'navigation',
                action: event.data.action
            })
        })

        const tabNavigation = navigation.getParent()?.getParent();
        const tabListener = tabNavigation?.addListener('tabPress', event => {
            if (isCompleted || allowExit.current || !currentExercise) return;
            const targetRoute = tabNavigation.getState().routes.find(routeItem => routeItem.key === event.target);
            if (!targetRoute) return;
            event.preventDefault();
            setPendingExitAction(currentAction => currentAction || {
                type: 'tab',
                routeName: targetRoute.name
            })
        })

        return () => {
            removeListener();
            tabListener?.();
        }
    }, [currentExercise, isCompleted, navigation])

    const provideHapticFeedback = (style = Haptics.ImpactFeedbackStyle.Light) => {
        if (settings?.isHapticsOn) Haptics.impactAsync(style).catch(console.error);
    }

    const toggleStep = (index) => {
        provideHapticFeedback();
        setCheckedSteps(currentSteps => currentSteps.map((checked, stepIndex) => (
            stepIndex === index ? !checked : checked
        )))
    }

    const finishWorkout = async () => {
        if (completionLock.current) return;
        completionLock.current = true;
        setIsCompleting(true);
        const completedAt = Date.now();

        const historySaved = await DataController.recordTrainingCompletion(training, workoutVolume);
        if (!historySaved) {
            completionLock.current = false;
            setIsCompleting(false);
            return;
        }

        setSessionStats({
            duration: Math.max(0, Math.floor((completedAt - startedAt.current) / 1000)),
            sets: workoutStats.sets,
            reps: workoutStats.reps
        })
        if (settings?.isHapticsOn) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(console.error);
        }
        setIsCompleted(true);
        setIsCompleting(false);
    }

    const goToNextExercise = async () => {
        if (!allStepsChecked) return;

        if (isLastExercise) {
            await finishWorkout();
            return;
        }

        provideHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
        const nextIndex = exerciseIndex + 1;
        setExerciseIndex(nextIndex);
        setCheckedSteps(Array(getRequiredSteps(exercises[nextIndex])).fill(false));
    }

    const confirmExit = () => {
        if (!pendingExitAction) return;
        allowExit.current = true;
        const exitAction = pendingExitAction;
        setPendingExitAction(null);

        if (exitAction.type === 'navigation') {
            navigation.dispatch(exitAction.action);
            return;
        }

        navigation.popToTop();
        const homeNavigation = navigation.getParent();
        const tabNavigation = homeNavigation?.getParent();
        if (exitAction.routeName === 'HomeNavigator') homeNavigation?.navigate('HomeScreen');
        tabNavigation?.navigate(exitAction.routeName);
    }

    const goHome = () => {
        allowExit.current = true;
        const parentNavigation = navigation.getParent();
        navigation.popToTop();
        parentNavigation?.navigate('HomeScreen');
    }

    const styles = {
        completedContent: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 24
        },
        trophy: {
            width: 112,
            height: 112,
            borderRadius: 56,
            backgroundColor: theme.background,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 22
        },
        congratulations: {
            fontFamily: 'Nexa',
            fontSize: 30,
            color: theme.textPrimary,
            textAlign: 'center'
        },
        completedText: {
            fontFamily: 'Nexa',
            fontSize: 16,
            lineHeight: 24,
            color: theme.textSecondary,
            textAlign: 'center',
            marginVertical: 14
        },
        statsRow: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 8,
            marginBottom: 24
        },
        statCard: {
            flex: 1,
            minHeight: 82,
            borderRadius: 10,
            backgroundColor: theme.background,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8
        },
        statValue: {
            fontFamily: 'Nexa',
            fontSize: 20,
            color: theme.primary
        },
        statLabel: {
            fontFamily: 'Nexa',
            fontSize: 10,
            lineHeight: 14,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 5
        },
        centeredContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20
        },
        content: {
            flexGrow: 1,
            paddingBottom: 20
        },
        trainingName: {
            fontFamily: 'Nexa',
            fontSize: 22,
            color: theme.textPrimary,
            textAlign: 'center',
            marginTop: 8
        },
        progress: {
            fontFamily: 'Nexa',
            fontSize: 13,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 6
        },
        exerciseCard: {
            flex: 1,
            minHeight: 300,
            borderRadius: 18,
            backgroundColor: theme.background,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            marginTop: 24
        },
        exerciseIcon: {
            width: 74,
            height: 74,
            borderRadius: 37,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
        },
        exerciseName: {
            fontFamily: 'Nexa',
            fontSize: 27,
            lineHeight: 34,
            color: theme.textPrimary,
            textAlign: 'center'
        },
        details: {
            fontFamily: 'Nexa',
            fontSize: 15,
            lineHeight: 22,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 12
        },
        note: {
            width: '100%',
            borderRadius: 10,
            backgroundColor: theme.secondary,
            padding: 12,
            fontFamily: 'Nexa',
            fontSize: 13,
            lineHeight: 19,
            color: theme.textPrimary,
            textAlign: 'center',
            marginTop: 16
        },
        checksContainer: {
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 14,
            marginTop: 28
        },
        checkButton: {
            alignItems: 'center',
            minWidth: 62
        },
        checkLabel: {
            fontFamily: 'Nexa',
            fontSize: 11,
            color: theme.textSecondary,
            marginTop: 6
        },
        completionCount: {
            fontFamily: 'Nexa',
            fontSize: 13,
            color: theme.textSecondary,
            textAlign: 'center',
            marginVertical: 14
        },
        nextButton: {
            minHeight: 56,
            borderRadius: 10,
            backgroundColor: allStepsChecked ? theme.primary : theme.tertiary,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            opacity: allStepsChecked && !isCompleting ? 1 : 0.55
        },
        nextText: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textHeader,
            textAlign: 'center'
        }
    }

    if (isCompleted) {
        return (
            <Container gradient={0.75}>
                <ScrollView contentContainerStyle={styles.completedContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.trophy}>
                        <Icon name='trophy' size={48} color={Colors.green} />
                    </View>
                    <Text style={styles.congratulations}>{translate('congratulations')}</Text>
                    <Text style={styles.completedText}>
                        {translate('trainingCompleted')} „{training.name}”.
                    </Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{formatDuration(sessionStats?.duration || 0)}</Text>
                            <Text style={styles.statLabel}>{translate('trainingDuration')}</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{sessionStats?.sets || 0}</Text>
                            <Text style={styles.statLabel}>{translate('completedSets')}</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{sessionStats?.reps || 0}</Text>
                            <Text style={styles.statLabel}>{translate('completedReps')}</Text>
                        </View>
                    </View>
                    <Button onPress={goHome} text={translate('backToHome')} type='small' />
                </ScrollView>
            </Container>
        )
    }

    if (!currentExercise) {
        return (
            <Container>
                <View style={styles.centeredContainer}>
                    <Text style={styles.completedText}>{translate('trainingHasNoAvailableExercises')}</Text>
                    <Button onPress={goHome} text={translate('backToHome')} type='small' />
                </View>
            </Container>
        )
    }

    const isTimeBased = currentExercise.data?.type === 'time_based';
    const detailParts = isTimeBased
        ? [currentExercise.data?.time]
        : [
            `${currentExercise.data?.setsAmount || 0} × ${currentExercise.data?.repsAmount || 0}`,
            currentExercise.data?.weight
        ]

    return (
        <Container gradient={0.75}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.trainingName}>{training.name}</Text>
                <Text style={styles.progress}>
                    {translate('exercise')} {exerciseIndex + 1} / {exercises.length}
                </Text>

                <View style={styles.exerciseCard}>
                    <View style={styles.exerciseIcon}>
                        <Icon name={isTimeBased ? 'timer' : 'dumbbell'} size={38} color={theme.textHeader} />
                    </View>
                    <Text style={styles.exerciseName}>{currentExercise.name}</Text>
                    <Text style={styles.details}>{detailParts.filter(Boolean).join(' • ')}</Text>
                    {currentExercise.data?.note ? (
                        <Text style={styles.note}>{currentExercise.data.note}</Text>
                    ) : null}

                    <View style={styles.checksContainer}>
                        {checkedSteps.map((checked, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.checkButton}
                                activeOpacity={0.75}
                                onPress={() => toggleStep(index)}
                            >
                                <Icon
                                    name={checked ? 'check-circle' : 'circle'}
                                    size={32}
                                    color={checked ? Colors.green : theme.tertiary}
                                />
                                <Text style={styles.checkLabel}>
                                    {isTimeBased ? currentExercise.data?.time : `${translate('set')} ${index + 1}`}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <Text style={styles.completionCount}>
                    {completedSteps} / {checkedSteps.length} {translate('completed')}
                </Text>
                <TouchableOpacity
                    style={styles.nextButton}
                    activeOpacity={0.8}
                    disabled={!allStepsChecked || isCompleting}
                    onPress={goToNextExercise}
                >
                    <Text style={styles.nextText}>
                        {isLastExercise ? translate('finishTraining') : translate('nextExercise')}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                isVisible={Boolean(pendingExitAction)}
                text={translate('exitTrainingConfirmation')}
                twoButtons={true}
                buttonOneText={translate('yes')}
                buttonOneOnPress={confirmExit}
                buttonTwoText={translate('cancel')}
                buttonTwoOnPress={() => setPendingExitAction(null)}
            />
        </Container>
    )
}