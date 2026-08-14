import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';

import AddButton from '../../components/buttons/AddButton';
import Background from '../../components/Background';
import Button from '../../components/buttons/Button';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

import { useSettings } from '../../helpers/SettingsProvider';

export default function TrainingsScreen() {
    const [trainings, setTrainings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [exercises, setExercises] = useState([]);
    const [isTrainings, setIsTrainings] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [modalState, setModalState] = useState(null);

    const { settings, theme, translate } = useSettings();
    const navigation = useNavigation();
    const exercisesById = useMemo(
        () => new Map(exercises.map(exercise => [exercise.id, exercise])),
        [exercises]
    )

    const loadData = useCallback(async () => {
        const [storedTrainings, storedExercises] = await Promise.all([
            DataController.readDataSet('trainings'),
            DataController.readDataSet('exercises')
        ]);
        setTrainings(storedTrainings);
        setExercises(storedExercises);
        setIsTrainings(storedTrainings.length > 0);
        setIsLoading(false);
    }, [])

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    )

    const provideHapticFeedback = (style = Haptics.ImpactFeedbackStyle.Light) => {
        if (settings?.isHapticsOn) Haptics.impactAsync(style).catch(console.error);
    }

    const resolveExercises = (training) => (training.data?.exerciseIds || [])
        .map(id => exercisesById.get(id))
        .filter(Boolean);

    const startTraining = (training) => {
        const resolvedExercises = resolveExercises(training);
        if (resolvedExercises.length === 0) {
            setModalState({ type: 'unavailable' });
            return;
        }

        provideHapticFeedback();
        navigation.navigate('ActiveTrainingScreen', {
            training: { id: training.id, name: training.name },
            exercises: resolvedExercises
        })
    }

    const confirmDelete = (id) => {
        provideHapticFeedback(Haptics.ImpactFeedbackStyle.Error);
        setModalState({ type: 'delete', id });
    }

    const deleteTraining = async () => {
        await DataController.delete(
            'trainings',
            setTrainings,
            setIsTrainings,
            modalState.id,
            true,
            () => setModalState(null)
        )
        setActiveId(null);
    }

    const styles = {
        header: {
            minHeight: 68,
            borderRadius: 10,
            backgroundColor: theme.background,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 18,
            marginBottom: 6
        },
        headerIcon: {
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 13
        },
        name: {
            fontFamily: 'Nexa',
            fontSize: 17,
            color: theme.textPrimary
        },
        subtitle: {
            fontFamily: 'Nexa',
            fontSize: 12,
            color: theme.textSecondary,
            marginTop: 4
        },
        details: {
            borderRadius: 10,
            backgroundColor: theme.background,
            padding: 15,
            marginBottom: 7
        },
        exerciseRow: {
            minHeight: 36,
            flexDirection: 'row',
            alignItems: 'center'
        },
        order: {
            width: 26,
            fontFamily: 'Nexa',
            fontSize: 14,
            color: theme.primary
        },
        exerciseName: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 14,
            color: theme.textPrimary
        },
        missingText: {
            fontFamily: 'Nexa',
            fontSize: 12,
            color: Colors.red,
            marginTop: 6
        },
        actions: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            gap: 15
        }
    }

    const Training = ({ item }) => {
        const isActive = activeId === item.id;
        const exerciseIds = item.data?.exerciseIds || [];
        const resolvedExercises = resolveExercises(item);
        const missingCount = exerciseIds.length - resolvedExercises.length;

        return (
            <View>
                <TouchableOpacity
                    style={styles.header}
                    activeOpacity={0.8}
                    onPress={() => setActiveId(isActive ? null : item.id)}
                >
                    <View style={styles.headerIcon}>
                        <Icon name='format-list-numbered' size={24} color={theme.textHeader} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.subtitle}>
                            {translate('exercisesCount')}: {resolvedExercises.length}
                        </Text>
                    </View>
                    <Icon name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={theme.textPrimary} />
                </TouchableOpacity>

                {isActive ? (
                    <View style={styles.details}>
                        {resolvedExercises.map((exercise, index) => (
                            <View key={`${exercise.id}-${index}`} style={styles.exerciseRow}>
                                <Text style={styles.order}>{index + 1}.</Text>
                                <Text style={styles.exerciseName}>{exercise.name}</Text>
                            </View>
                        ))}
                        {missingCount > 0 ? (
                            <Text style={styles.missingText}>
                                {translate('missingExercises')}: {missingCount}
                            </Text>
                        ) : null}

                        <View style={{ marginTop: 15 }}>
                            <Button
                                onPress={() => startTraining(item)}
                                text={translate('startTraining')}
                            />
                        </View>
                        <View style={styles.actions}>
                            <Button
                                onPress={() => DataController.update('trainings', item.id, navigation, 'TrainingsCreator')}
                                text={translate('edit')}
                            />
                            <Button
                                onPress={() => confirmDelete(item.id)}
                                text={translate('delete')}
                                type='delete'
                            />
                        </View>
                    </View>
                ) : null}
            </View>
        )
    }

    return (
        <Container gradient={0.75}>
            {isLoading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.name}>{translate('loading')}</Text>
                </View>
            ) : isTrainings ? (
                <FlatList
                    data={trainings}
                    renderItem={({ item }) => <Training item={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Background text={true} content={translate('trainingsDeclined')} type='masculine' />
            )}
            <AddButton onPress='TrainingsCreator' />
            <Modal
                isVisible={modalState?.type === 'delete'}
                text={translate('areYouSure') + translate('thisTraining') + '?'}
                twoButtons={true}
                buttonOneText={translate('yes')}
                buttonOneOnPress={deleteTraining}
                buttonTwoText={translate('no')}
                buttonTwoOnPress={() => setModalState(null)}
            />
            <Modal
                isVisible={modalState?.type === 'unavailable'}
                text={translate('trainingHasNoAvailableExercises')}
                twoButtons={false}
                buttonOneText={translate('ok')}
                buttonOneOnPress={() => setModalState(null)}
            />
        </Container>
    )
}