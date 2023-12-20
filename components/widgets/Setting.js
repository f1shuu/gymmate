import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Modal from "react-native-modal";

export default Setting = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            setIsModalVisible(!isModalVisible);
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => handleModal()} style={styles.container}>
                <Text style={styles.text}>Usuń dane metryczne</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Czy na pewno chcesz usunąć wszystkie pomiary?</Text>
                    <Text style={[styles.modalText, { color: '#FD5056', textDecorationLine: 'underline', paddingBottom: 10 }]}>
                        Tej operacji nie można cofnąć.
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => clearAsyncStorage()} style={styles.button}>
                            <LinearGradient
                                colors={['#6430D2', '#376DEC']}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={styles.button}>
                                <Text style={styles.modalText}>Tak</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleModal()} style={styles.button}>
                            <LinearGradient
                                colors={['#6430D2', '#376DEC']}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={styles.button}>
                                <Text style={styles.modalText}>Anuluj</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E1E1E1',
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 5,
        elevation: 10
    },
    text: {
        flex: 1,
        fontFamily: 'msb',
        color: '#FD5056',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20,
        margin: 10
    },
    modalText: {
        fontFamily: 'msb',
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    button: {
        width: 150,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 10,
        elevation: 10
    },
});