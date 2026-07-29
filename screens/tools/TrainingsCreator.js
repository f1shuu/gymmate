import { Text, View, TouchableOpacity, TextInput, TextView, ScrollView } from 'react-native';
import { useState, useCallback, useMemo, useRef } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

import { useSettings } from '../../helpers/SettingsProvider';

export default function TrainingsCreator({ route }) {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedExerciseIds, setSelectedExerciseIds] = useState([]);
    const [name, setName] = useState(route.params?.name || '');
    const [isModalVisible, setIsModalVisible] = useState(false);
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
                setSelectedExerciseIds(currentIds => {
                    const availableIds = new Set(storedExercises.map(exercise => exercise.id));
                    const sourceIds = initializedSelection.current
                        ? currentIds
                        : (route.params?.data?.exerciseIds || []);
                    initializedSelection.current = true;
                    return sourceIds.filter(id => availableIds.has(id));
                })
            }

            loadExercises();
            return () => {
                isActive = false;
            }
        }, [route.params])
    )

    const selectedExercises = useMemo(
        () => selectedExerciseIds
            .map(id => exercises.find(exercise => exercise.id === id))
            .filter(Boolean),
        [exercises, selectedExerciseIds]
    )
    const availableExercises = useMemo(
        () => exercises.filter(exercise => !selectedExerciseIds.includes(exercise.id)),
        [exercises, selectedExerciseIds]
    )

    const provideHapticFeedback = () => {
        if (settings?.isHapticsOn) Haptics.selectionAsync().catch(console.error);
    }

    const addExercise = (id) => {
        provideHapticFeedback();
        setSelectedExerciseIds(currentIds => [...currentIds, id]);
    }

    const removeExercise = (id) => {
        provideHapticFeedback();
        setSelectedExerciseIds(currentIds => currentIds.filter(exerciseId => exerciseId !== id));
    }

    const moveExercise = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= selectedExerciseIds.length) return;

        provideHapticFeedback();
        setSelectedExerciseIds(currentIds => {
            const reorderedIds = [...currentIds];
            [reorderedIds[index], reorderedIds[targetIndex]] = [reorderedIds[targetIndex], reorderedIds[index]];
            return reorderedIds;
        })
    }

    const saveTraining = async () => {
        if (!name.trim() || selectedExerciseIds.length === 0) {
            setIsModalVisible(true);
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
            { exerciseIds: selectedExerciseIds }
        )
        setIsSaving(false);
    }

    const goToExerciseCreator = () => {
        navigation.navigate('ExercisesNavigator', { screen: 'ExerciseCreator' });
    }

    const styles = {
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
        sectionTitle: {
            fontFamily: 'Nexa',
            fontSize: 15,
            color: theme.textSecondary,
            marginHorizontal: 5,
            marginBottom: 10
        },
        exerciseCard: {
            minHeight: 68,
            borderRadius: 10,
            backgroundColor: theme.background,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            marginBottom: 7
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
        iconButton: {
            width: 38,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center'
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
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    maxLength={50}
                    placeholder={translate('trainingNamePlaceholder')}
                    placeholderTextColor={theme.textSecondary}
                />

                <Text style={styles.sectionTitle}>{translate('selectedExercises')}</Text>
                {selectedExercises.length === 0 ? (
                    <Text style={styles.emptyText}>{translate('selectAtLeastOneExercise')}</Text>
                ) : selectedExercises.map((exercise, index) => (
                    <View key={exercise.id} style={styles.exerciseCard}>
                        <View style={styles.orderBadge}>
                            <Text style={styles.orderText}>{index + 1}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            <Text style={styles.exerciseDetails}>{exerciseSummary(exercise)}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.iconButton}
                            disabled={index === 0}
                            onPress={() => moveExercise(index, -1)}
                        >
                            <Icon name='arrow-upward' size={24} color={index === 0 ? theme.tertiary : theme.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconButton}
                            disabled={index === selectedExercises.length - 1}
                            onPress={() => moveExercise(index, 1)}
                        >
                            <Icon name='arrow-downward' size={24} color={index === selectedExercises.length - 1 ? theme.tertiary : theme.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => removeExercise(exercise.id)}>
                            <Icon name='remove-circle-outline' size={25} color={Colors.red} />
                        </TouchableOpacity>
                    </View>
                ))}

                {availableExercises.length > 0 ? (
                    <>
                        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>{translate('availableExercises')}</Text>
                        {availableExercises.map(exercise => (
                            <TouchableOpacity
                                key={exercise.id}
                                style={styles.exerciseCard}
                                activeOpacity={0.8}
                                onPress={() => addExercise(exercise.id)}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                                    <Text style={styles.exerciseDetails}>{exerciseSummary(exercise)}</Text>
                                </View>
                                <Icon name='add-circle-outline' size={28} color={Colors.green} />
                            </TouchableOpacity>
                        ))}
                    </>
                ) : null}

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
                isVisible={isModalVisible}
                text={translate('trainingCreatorValidation')}
                twoButtons={false}
                buttonOneText={translate('ok')}
                buttonOneOnPress={() => setIsModalVisible(false)}
            />
        </Container>
    )
}