import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';

import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';
import Setting from '../../components/widgets/Setting';

import { useAchievements } from '../../helpers/AchievementProvider';
import { useSettings } from '../../helpers/SettingsProvider';

const DELETION_SUCCESS_KEYS = {
    all: 'dataDeletedSuccessfully',
    bodyMeasurements: 'bodyMeasurementsDeletedSuccessfully',
    exercises: 'exercisesDeletedSuccessfully',
    trainingHistory: 'trainingHistoryDeletedSuccessfully',
    trainings: 'trainingsDeletedSuccessfully'
}

export default function DataDeletionScreen() {
    const [exercisesCount, setExercisesCount] = useState(0);
    const [bodyMeasurementsCount, setBodyMeasurementsCount] = useState(0);
    const [trainingsCount, setTrainingsCount] = useState(0);
    const [trainingHistoryCount, setTrainingHistoryCount] = useState(0);
    const [dataCount, setDataCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [text, setText] = useState(null);
    const [dataSet, setDataSet] = useState(null);
    const [includeAllQualifier, setIncludeAllQualifier] = useState(true);

    const { resetAchievements } = useAchievements();
    const { settings, translate } = useSettings();

    const fetchData = async () => {
        const [exercises, bodyMeasurements, trainings, trainingHistory] = await Promise.all([
            DataController.getCount('exercises'),
            DataController.getCount('bodyMeasurements'),
            DataController.getCount('trainings'),
            DataController.getCount('trainingHistory')
        ])

        setExercisesCount(exercises);
        setBodyMeasurementsCount(bodyMeasurements);
        setTrainingsCount(trainings);
        setTrainingHistoryCount(trainingHistory);
        setDataCount(exercises + bodyMeasurements + trainings + trainingHistory);
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    )

    const showModal = (selectedDataSet, selectedText, shouldIncludeAll = true) => {
        if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error);
        setDataSet(selectedDataSet);
        setText(selectedText);
        setIncludeAllQualifier(shouldIncludeAll);
        setIsModalVisible(true);
    }

    const clearSelectedData = async () => {
        const cleared = await DataController.clear(
            dataSet,
            isModalVisible,
            setIsModalVisible,
            fetchData,
            isConfirmationModalVisible,
            setIsConfirmationModalVisible
        )
        if (cleared && dataSet === 'all') await resetAchievements();
    }

    const styles = {
        container: {
            gap: 10,
            borderRadius: 10,
            overflow: 'hidden'
        },
        allDataButton: {
            borderWidth: 2,
            borderColor: Colors.red
        }
    }

    const qualifier = includeAllQualifier ? translate('all') : '';

    return (
        <Container>
            <View style={styles.container}>
                <Setting active={exercisesCount > 0} name={translate('delete') + ' ' + translate('exercises')} icon={'delete'} color={Colors.red} onPress={() => showModal('exercises', translate('exercises'))} />
                <Setting active={bodyMeasurementsCount > 0} name={translate('delete') + ' ' + translate('bodyMeasurements')} icon={'delete'} color={Colors.red} onPress={() => showModal('bodyMeasurements', translate('bodyMeasurements'))} />
                <Setting active={trainingsCount > 0} name={translate('delete') + ' ' + translate('trainings')} icon={'delete'} color={Colors.red} onPress={() => showModal('trainings', translate('trainings'))} />
                <Setting active={trainingHistoryCount > 0} name={translate('deleteTrainingHistory')} icon={'delete'} color={Colors.red} onPress={() => showModal('trainingHistory', translate('trainingHistory'), false)} />
                <Setting active={dataCount > 0} name={translate('delete') + ' ' + translate('allData')} icon={'delete-forever'} color={Colors.red} onPress={() => showModal('all', translate('data'))} style={styles.allDataButton} />
            </View>
            <Modal
                isVisible={isModalVisible}
                text={translate('areYouSure') + qualifier + text + '? ' + translate('irreversible')}
                twoButtons={true}
                buttonOneText={translate('yes')}
                buttonOneOnPress={clearSelectedData}
                buttonTwoText={translate('cancel')}
                buttonTwoOnPress={() => setIsModalVisible(false)}
            />
            <Modal
                isVisible={isConfirmationModalVisible}
                text={translate(DELETION_SUCCESS_KEYS[dataSet] || 'dataDeletedSuccessfully')}
                twoButtons={false}
                buttonOneText={translate('ok')}
                buttonOneOnPress={() => setIsConfirmationModalVisible(false)}
            />
        </Container>
    )
}