import { Animated, PanResponder, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

import { useSettings } from '../../helpers/SettingsProvider';

const MAX_EXERCISES = 20;
const EXERCISE_ROW_HEIGHT = 75;
let selectionSequence = 0;

const createSelection = (exerciseId) => ({
    entryId: `${exerciseId}-${Date.now()}-${selectionSequence++}`,
    exerciseId
})

function DraggableExerciseCard({ entry, exercise, index, itemCount, onMove, onRemove, styles, theme, summary }) {
    const dragY = useRef(new Animated.Value(0)).current;
    const [isDragging, setIsDragging] = useState(false);

    const resetDragPosition = () => {
        dragY.setValue(0);
        setIsDragging(false);
    }

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 2,
        onPanResponderGrant: () => setIsDragging(true),
        onPanResponderMove: (_, gestureState) => dragY.setValue(gestureState.dy),
        onPanResponderRelease: (_, gestureState) => {
            const targetIndex = Math.max(
                0,
                Math.min(itemCount - 1, index + Math.round(gestureState.dy / EXERCISE_ROW_HEIGHT))
            )
            resetDragPosition();
            if (targetIndex !== index) onMove(index, targetIndex);
        },
        onPanResponderTerminate: resetDragPosition
    }), [dragY, index, itemCount, onMove])

    return (
        <Animated.View
            style={[
                styles.exerciseCard,
                isDragging && styles.draggingCard,
                { transform: [{ translateY: dragY }] }
            ]}
        >
            <View style={styles.orderBadge}>
                <Text style={styles.orderText}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>{summary}</Text>
            </View>
            <View
                style={styles.dragHandle}
                accessibilityRole='adjustable'
                {...panResponder.panHandlers}
            >
                <Icon name='drag-indicator' size={29} color={theme.primary} />
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => onRemove(entry.entryId)}>
                <Icon name='remove-circle-outline' size={25} color={Colors.red} />
            </TouchableOpacity>
        </Animated.View>
    )
}

export default function TrainingsCreator({ route }) {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [name, setName] = useState(route.params?.name || '');
    const [modalType, setModalType] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const initializedSelection = useRef(false);

    const { settings, theme, translate } = useSettings();
    const navigation = useNavigation();
    const trainingId = route.params?.id || null;

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const loadExercises = async () => {
                const storedExercises = await DataController.readDataSet('exercises');
                if (!isActive) return;

                setExercises(storedExercises);
                setIsLoading(false);
                setSelectedEntries(currentEntries => {
                    const availableIds = new Set(storedExercises.map(exercise => exercise.id));
                    const sourceEntries = initializedSelection.current
                        ? currentEntries
                        : (route.params?.data?.exerciseIds || []).map(createSelection);
                    initializedSelection.current = true;
                    return sourceEntries
                        .filter(entry => availableIds.has(entry.exerciseId))
                        .slice(0, MAX_EXERCISES);
                })
            }

            loadExercises();
            return () => {
                isActive = false;
            }
        }, [route.params])
    )

    const exercisesById = useMemo(
        () => new Map(exercises.map(exercise => [exercise.id, exercise])),
        [exercises]
    )
    const selectedExercises = useMemo(
        () => selectedEntries
            .map(entry => ({ entry, exercise: exercisesById.get(entry.exerciseId) }))
            .filter(item => Boolean(item.exercise)),
        [exercisesById, selectedEntries]
    )
    const selectionCounts = useMemo(
        () => selectedEntries.reduce((counts, entry) => {
            counts.set(entry.exerciseId, (counts.get(entry.exerciseId) || 0) + 1);
            return counts;
        }, new Map()),
        [selectedEntries]
    )

    const provideHapticFeedback = () => {
        if (settings?.isHapticsOn) Haptics.selectionAsync().catch(console.error);
    }

    const addExercise = (exerciseId) => {
        if (selectedEntries.length >= MAX_EXERCISES) {
            setModalType('limit');
            return;
        }

        provideHapticFeedback();
        setSelectedEntries(currentEntries => [...currentEntries, createSelection(exerciseId)]);
    }

    const removeExercise = (entryId) => {
        provideHapticFeedback();
        setSelectedEntries(currentEntries => currentEntries.filter(entry => entry.entryId !== entryId));
    }

    const moveExercise = useCallback((fromIndex, targetIndex) => {
        if (fromIndex === targetIndex) return;

        provideHapticFeedback();
        setSelectedEntries(currentEntries => {
            if (fromIndex < 0 || targetIndex < 0 || fromIndex >= currentEntries.length || targetIndex >= currentEntries.length) {
                return currentEntries;
            }

            const reorderedEntries = [...currentEntries];
            const [movedEntry] = reorderedEntries.splice(fromIndex, 1);
            reorderedEntries.splice(targetIndex, 0, movedEntry);
            return reorderedEntries;
        })
    }, [settings?.isHapticsOn])

    const saveTraining = async () => {
        if (!name.trim() || selectedEntries.length === 0) {
            setModalType('validation');
            return;
        }
        if (isSaving) return;

        setIsSaving(true);
        await DataController.store(
            'trainings',
            trainingId,
            name.trim(),
            'trainings',
            navigation,
            'TrainingsScreen',
            { exerciseIds: selectedEntries.map(entry => entry.exerciseId) }
        )
        setIsSaving(false);
    }

    const goToExerciseCreator = () => {
        navigation.navigate('ExercisesNavigator', { screen: 'ExerciseCreator' });
    }

    const styles = {
        exerciseCard: {
            minHeight: 68,
            borderRadius: 10,
            backgroundColor: theme.background,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 14,
            paddingRight: 6,
            marginBottom: 7
        },
        draggingCard: {
            zIndex: 10,
            elevation: 8,
            opacity: 0.94
        },
        orderBadge: {
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12
        },
        orderText: {
            fontFamily: 'Nexa',
            fontSize: 15,
            color: theme.textHeader
        },
        exerciseName: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary
        },
        exerciseDetails: {
            fontFamily: 'Nexa',
            fontSize: 12,
            color: theme.textSecondary,
            marginTop: 4
        },
        dragHandle: {
            width: 42,
            minHeight: 58,
            alignItems: 'center',
            justifyContent: 'center'
        },
        iconButton: {
            width: 38,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center'
        },
        emptyContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24
        },
        emptyText: {
            fontFamily: 'Nexa',
            fontSize: 18,
            lineHeight: 26,
            color: theme.textPrimary,
            textAlign: 'center',
            marginBottom: 20
        },
        emptyIcon: {
            width: 90,
            height: 90,
            borderRadius: 45,
            backgroundColor: theme.background,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 22
        },
        input: {
            height: 60,
            borderRadius: 10,
            paddingHorizontal: 16,
            backgroundColor: theme.background,
            color: theme.textPrimary,
            fontFamily: 'Nexa',
            fontSize: 16,
            marginBottom: 22
        },
        sectionTitleRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 5,
            marginBottom: 10
        },
        sectionTitle: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 15,
            color: theme.textSecondary
        },
        selectionLimit: {
            fontFamily: 'Nexa',
            fontSize: 13,
            color: selectedEntries.length >= MAX_EXERCISES ? Colors.red : theme.textSecondary
        },
        selectedCount: {
            minWidth: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12
        },
        selectedCountText: {
            fontFamily: 'Nexa',
            fontSize: 12,
            color: theme.textHeader
        },
        saveButton: {
            minHeight: 52,
            borderRadius: 10,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 18,
            opacity: isSaving ? 0.55 : 1
        },
        saveText: {
            fontFamily: 'Nexa',
            fontSize: 17,
            color: theme.textHeader
        }
    }

    const exerciseSummary = (exercise) => exercise.data?.type === 'time_based'
        ? exercise.data?.time
        : `${exercise.data?.setsAmount || 0} × ${exercise.data?.repsAmount || 0}`

    if (isLoading) {
        return (
            <Container gradient={0.75}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{translate('loading')}</Text>
                </View>
            </Container>
        )
    }

    if (exercises.length === 0) {
        return (
            <Container gradient={0.75}>
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIcon}>
                        <Icon name='fitness-center' size={46} color={theme.primary} />
                    </View>
                    <Text style={styles.emptyText}>{translate('createExerciseBeforeTraining')}</Text>
                    <Button onPress={goToExerciseCreator} text={translate('createExercise')} />
                </View>
            </Container>
        )
    }

    return (
        <Container gradient={0.75}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
            >
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    maxLength={50}
                    placeholder={translate('trainingNamePlaceholder')}
                    placeholderTextColor={theme.textSecondary}
                />

                <View style={styles.sectionTitleRow}>
                    <Text style={styles.sectionTitle}>{translate('selectedExercises')}</Text>
                    <Text style={styles.selectionLimit}>{selectedEntries.length}/{MAX_EXERCISES}</Text>
                </View>
                {selectedExercises.length === 0 ? (
                    <Text style={styles.emptyText}>{translate('selectAtLeastOneExercise')}</Text>
                ) : selectedExercises.map(({ entry, exercise }, index) => (
                    <DraggableExerciseCard
                        key={entry.entryId}
                        entry={entry}
                        exercise={exercise}
                        index={index}
                        itemCount={selectedExercises.length}
                        onMove={moveExercise}
                        onRemove={removeExercise}
                        styles={styles}
                        theme={theme}
                        summary={exerciseSummary(exercise)}
                    />
                ))}

                <View style={[styles.sectionTitleRow, { marginTop: 18 }]}>
                    <Text style={styles.sectionTitle}>{translate('availableExercises')}</Text>
                </View>
                {exercises.map(exercise => {
                    const selectedCount = selectionCounts.get(exercise.id) || 0;
                    const limitReached = selectedEntries.length >= MAX_EXERCISES;

                    return (
                        <TouchableOpacity
                            key={exercise.id}
                            style={[styles.exerciseCard, limitReached && { opacity: 0.55 }]}
                            activeOpacity={0.8}
                            onPress={() => addExercise(exercise.id)}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={styles.exerciseName}>{exercise.name}</Text>
                                <Text style={styles.exerciseDetails}>{exerciseSummary(exercise)}</Text>
                            </View>
                            {selectedCount > 0 ? (
                                <View style={styles.selectedCount}>
                                    <Text style={styles.selectedCountText}>×{selectedCount}</Text>
                                </View>
                            ) : null}
                            <Icon name='add-circle-outline' size={28} color={limitReached ? theme.tertiary : Colors.green} />
                        </TouchableOpacity>
                    )
                })}

                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.8}
                    disabled={isSaving}
                    onPress={saveTraining}
                >
                    <Text style={styles.saveText}>{translate('saveTraining')}</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                isVisible={Boolean(modalType)}
                text={translate(modalType === 'limit' ? 'trainingExerciseLimitReached' : 'trainingCreatorValidation')}
                twoButtons={false}
                buttonOneText={translate('ok')}
                buttonOneOnPress={() => setModalType(null)}
            />
        </Container>
    )
}