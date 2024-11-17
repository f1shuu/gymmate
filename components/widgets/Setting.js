// this code needs to be refactored since it's not a reusable component

import { Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../../Colors';
import Modal from '../Modal';

export default Setting = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            setIsModalVisible(!isModalVisible);
            setIsConfirmationModalVisible(!isConfirmationModalVisible);
            () => setIsConfirmationModalVisible(() => !isConfirmationModalVisible)
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    }

    return (
        <>
            <TouchableOpacity onPress={() => setIsModalVisible(() => !isModalVisible)} style={styles.container}>
                <Text style={styles.text}>Usuń dane metryczne</Text>
            </TouchableOpacity>
            <Modal
                isVisible={isModalVisible}
                text='Czy na pewno chcesz usunąć wszystkie pomiary? Tej operacji nie można cofnąć.'
                twoButtons={true}
                buttonOneText='Tak'
                buttonOneOnPress={() => clearAsyncStorage()}
                buttonTwoText='Anuluj'
                buttonTwoOnPress={() => setIsModalVisible(() => !isModalVisible)}
            />
            <Modal
                isVisible={isConfirmationModalVisible}
                text='Pomiary zostały pomyślnie usunięte.'
                twoButtons={false}
                buttonOneText='OK'
                buttonOneOnPress={() => setIsConfirmationModalVisible(() => !isConfirmationModalVisible)}
            />
        </>
    )
}

const styles = {
    container: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 5
    },
    text: {
        flex: 1,
        fontFamily: 'Nexa',
        fontSize: 20,
        color: Colors.delete,
        textAlign: 'center',
        alignSelf: 'center',
        margin: 10
    }
}