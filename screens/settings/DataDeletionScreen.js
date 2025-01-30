import { View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import Colors from '../../Colors';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

export default function DataDeletionScreen() {
    const [exercisesCount, setExercisesCount] = useState(0);
    const [bodyMeasurementsCount, setBodyMeasurementsCount] = useState(0);
    const [trainingsCount, setTrainingsCount] = useState(0);
    const [dataCount, setDataCount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [text, setText] = useState(null);
    const [dataSet, setDataSet] = useState(null);

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
        setIsModalVisible(!isModalVisible);
        setDataSet(dataSet);
        setText(text);
    }

    return (
        <Container>
            <View style={styles.container}>
                <Setting active={exercisesCount > 0} name='Usuń ćwiczenia' icon={'delete'} color={Colors.red} onPress={() => showModal(isModalVisible, 'exercises', 'ćwiczenia')} />
                <Setting active={bodyMeasurementsCount > 0} name='Usuń pomiary' icon={'delete'} color={Colors.red} onPress={() => showModal(isModalVisible, 'bodyMeasurements', 'pomiary')} />
                <Setting active={trainingsCount > 0} name='Usuń treningi' icon={'delete'} color={Colors.red} onPress={() => showModal(isModalVisible, 'trainings', 'treningi')} />
                <Setting active={dataCount > 0} name='Usuń wszystkie dane' icon={'delete-forever'} color={Colors.red} onPress={() => showModal(isModalVisible, 'all', 'dane')} style={{ borderWidth: 1, borderColor: Colors.red }} />
            </View>
            <Modal
                isVisible={isModalVisible}
                text={`Czy na pewno chcesz usunąć wszystkie ${text} z aplikacji? Tej operacji nie można cofnąć.`}
                twoButtons={true}
                buttonOneText='Tak'
                buttonOneOnPress={async () => DataController.clear(dataSet, isModalVisible, setIsModalVisible, fetchData, isConfirmationModalVisible, setIsConfirmationModalVisible)}
                buttonTwoText='Anuluj'
                buttonTwoOnPress={() => setIsModalVisible(() => !isModalVisible)}
            />
            <Modal
                isVisible={isConfirmationModalVisible}
                text={`Wszystkie ${text} zostały pomyślnie usunięte.`}
                twoButtons={false}
                buttonOneText='OK'
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
    }
}