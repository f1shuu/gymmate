import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';

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

export default function ActiveTrainingScreen({ route }) {
    const training = route.params?.training || { name: '' };
    const exercises = route.params?.exercises || [];
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [checkedSteps, setCheckedSteps] = useState(() => Array(getRequiredSteps(exercises[0] || {})).fill(false));
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);

    const { settings, theme, translate, updateSettings } = useSettings();
    const navigation = useNavigation();
    const currentExercise = exercises[exerciseIndex];
    const isLastExercise = exerciseIndex === exercises.length - 1;
    const allStepsChecked = checkedSteps.length > 0 && checkedSteps.every(Boolean);
    const completedSteps = checkedSteps.filter(Boolean).length;
    const workoutVolume = useMemo(
        () => Math.round(exercises.reduce((total, exercise) => total + calculateExerciseVolume(exercise), 0)),
        [exercises]
    )

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
        if (isCompleting) return;
        setIsCompleting(true);

        await updateSettings({
            trainingsTotal: (settings.trainingsTotal || 0) + 1,
            liftedKgsTotal: (settings.liftedKgsTotal || 0) + workoutVolume
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

    const goHome = () => {
        const parentNavigation = navigation.getParent();
        navigation.popToTop();
        parentNavigation?.navigate('HomeScreen');
    }

    const styles = {
        completedContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20
        },
        trophy: {
            width: 124,
            height: 124,
            borderRadius: 62,
            backgroundColor: theme.background,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28
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
            marginVertical: 16
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
                <View style={styles.completedContainer}>
                    <View style={styles.trophy}>
                        <Icon name='trophy' size={50} color={Colors.green} />
                    </View>
                    <Text style={styles.congratulations}>{translate('congratulations')}</Text>
                    <Text style={styles.completedText}>
                        {translate('trainingCompleted')} „{training.name}”.
                    </Text>
                    <Button onPress={goHome} text={translate('backToHome')} type='small' />
                </View>
            </Container>
        )
    }

    if (!currentExercise) {
        return (
            <Container>
                <View style={styles.completedContainer}>
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
        </Container>
    )
}