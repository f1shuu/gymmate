import { View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';
import Setting from '../../components/widgets/Setting';

import { useSettings } from '../../providers/SettingsProvider';

export default function DataDeletionScreen() {
    const [exercisesCount, setExercisesCount] = useState(0);
    const [bodyMeasurementsCount, setBodyMeasurementsCount] = useState(0);
    const [trainingsCount, setTrainingsCount] = useState(0);
    const [dataCount, setDataCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [text, setText] = useState(null);
    const [dataSet, setDataSet] = useState(null);

    const { settings, translate } = useSettings();

    const fetchData = async () => {
        const exercises = await DataController.getCount('exercises');
        const bodyMeasurements = await DataController.getCount('bodyMeasurements');
        const trainings = await DataController.getCount('trainings');

        setExercisesCount(exercises);
        setBodyMeasurementsCount(bodyMeasurements);
        setTrainingsCount(trainings);
        setDataCount(exercises + bodyMeasurements + trainings);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    )

    const showModal = (isModalVisible, dataSet, text) => {
        if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error);
        setIsModalVisible(!isModalVisible);
        setDataSet(dataSet);
        setText(text);
    }

    return (
        <Container>
            <View style={styles.container}>
                <Setting active={exercisesCount > 0} name={translate('delete') + ' ' + translate('exercisePlural')} icon={'delete'} color={Colors.red} onPress={() => showModal(isModalVisible, 'exercises', translate('exercisePlural'))} />
                <Setting active={bodyMeasurementsCount > 0} name={translate('delete') + ' ' + translate('bodyMeasurementPlural')} icon={'delete'} color={Colors.red} onPress={() => showModal(isModalVisible, 'bodyMeasurements', translate('measurementPlural'))} />
                <Setting active={trainingsCount > 0} name={translate('delete') + ' ' + translate('trainingPlural')} icon={'delete'} color={Colors.red} onPress={() => showModal(isModalVisible, 'trainings', translate('trainingPlural'))} />
                <Setting active={dataCount > 0} name={translate('delete') + ' ' + translate('allData')} icon={'delete-forever'} color={Colors.red} onPress={() => showModal(isModalVisible, 'all', translate('data'))} style={styles.allDataButton} />
            </View>
            <Modal
                isVisible={isModalVisible}
                text={translate('areYouSure') + translate('all') + text + '?' + translate('irreversible')}
                twoButtons={true}
                buttonOneText={translate('yes')}
                buttonOneOnPress={async () => DataController.clear(dataSet, isModalVisible, setIsModalVisible, fetchData, isConfirmationModalVisible, setIsConfirmationModalVisible)}
                buttonTwoText={translate('cancel')}
                buttonTwoOnPress={() => setIsModalVisible(() => !isModalVisible)}
            />
            <Modal
                isVisible={isConfirmationModalVisible}
                text={translate('deletedSuccessfully1') + text + (text === translate('data') ? ' has' : ' have') + translate('deletedSuccessfully2')}
                twoButtons={false}
                buttonOneText={translate('ok')}
                buttonOneOnPress={() => setIsConfirmationModalVisible(!isConfirmationModalVisible)}
            />
        </Container>
    )
}

const styles = {
    container: {
        gap: 10,
        borderRadius: 15,
        overflow: 'hidden'
    },
    allDataButton: {
        borderWidth: 2,
        borderColor: Colors.red
    }
}