import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

export default function BodyMeasurementsScreen() {
    const navigation = useNavigation();

    const navigateToAddBodyMeasurement = () => {
        navigation.navigate('AddBodyMeasurement');
    }

    const [activeSections, setActiveSections] = useState([]);

    const [data, setData] = useState([]);
    const [isData, setIsData] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const handleModal = (category, index) => {
        setModalData({ category, index });
        setIsModalVisible(!isModalVisible);
    }

    const retrieveData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('data');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setData(parsedData);
                if (parsedData.length === 0) setIsData(false);
                else setIsData(true);
            } else {
                setData([]);
                setIsData(false);
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage: ', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            retrieveData();
            renderHeader();
            renderContent();
        }, [])
    );

    const deleteMeasurement = async (category, index) => {
        try {
            const existingData = await AsyncStorage.getItem('data');
            const parsedData = existingData ? JSON.parse(existingData) : [];
            const categoryIndex = parsedData.findIndex(entry => entry.category === category);

            if (categoryIndex !== -1) {
                const elementIndex = index;
                const updatedData = [
                    ...parsedData.slice(0, categoryIndex),
                    {
                        ...parsedData[categoryIndex],
                        data: [
                            ...parsedData[categoryIndex].data.slice(0, elementIndex),
                            ...parsedData[categoryIndex].data.slice(elementIndex + 1),
                        ],
                    },
                    ...parsedData.slice(categoryIndex + 1),
                ];
                if (updatedData[categoryIndex].data.length === 0) updatedData.splice(categoryIndex, 1);
                await AsyncStorage.setItem('data', JSON.stringify(updatedData, null, 2));
                retrieveData();
                setIsModalVisible(!isModalVisible);
            }
        } catch (error) {
            console.error('Error deleting measurement from AsyncStorage:', error);
        }
    };

    const imageMapping = {
        'Masa ciała': require('../../assets/measures/body-mass.png'),
        'Obwód talii': require('../../assets/measures/waist-circumference.png'),
        'Obwód klatki piersiowej': require('../../assets/measures/chest-circumference.png'),
        'Obwód bicepsa': require('../../assets/measures/biceps-circumference.png'),
    };

    const renderHeader = (section, _, isActive) => {
        let url;
        if (section) {
            url = imageMapping[section.category];
            return (
                <LinearGradient
                    colors={['#6430D2', '#376DEC']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.header}>
                    <View style={styles.imageBackground}>
                        <Image source={url} style={{ width: 60, height: 60, margin: 5 }} />
                    </View>
                    <Text style={styles.headerText}>{section.category}</Text>
                    <Icon
                        name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={32}
                        color={'white'}
                    />
                </LinearGradient>
            );
        } else {
            url = '';
            return null;
        }
    };

    const renderContent = (section) => {
        if (section) {
            return (
                <View>
                    {section.data && section.data.map((measurement, index) => (
                        <View key={index} style={styles.measurementItem}>
                            <Text style={styles.measurementText}>
                                {measurement.value} {measurement.unit}
                            </Text>
                            <Text style={styles.measurementText}>
                                {measurement.date}
                            </Text>
                            <TouchableOpacity onPress={() => handleModal(section.category, index)}>
                                <Icon name="delete" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            );
        } else return null;
    };

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (
        <View style={styles.container}>
            {isData ? (
                <Accordion
                    underlayColor='#ECECEC'
                    sections={data}
                    activeSections={activeSections}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={updateSections}
                />
            ) : (
                <Text style={styles.emptyText}>Nie masz jeszcze żadnych pomiarów. Użyj przycisku w prawym dolnym rogu ekranu, aby dodać swój pierwszy.</Text>
            )}

            <LinearGradient
                colors={['#6430D2', '#376DEC']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.add}
            >
                <TouchableOpacity onPress={navigateToAddBodyMeasurement}>
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </LinearGradient>
            <Image source={require('../../assets/background.png')} style={styles.image} />
            <Modal isVisible={isModalVisible}>
                <View>
                    <Text style={[styles.buttonText, { fontSize: 22, paddingBottom: 10 }]}>Czy na pewno chcesz usunąć ten pomiar?</Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => deleteMeasurement(modalData.category, modalData.index)} style={styles.button}>
                            <LinearGradient
                                colors={['#6430D2', '#376DEC']}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Tak</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleModal()} style={styles.button}>
                            <LinearGradient colors={['#6430D2', '#376DEC']}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Anuluj</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        padding: 16,
        flex: 1
    },
    imageBackground: {
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        elevation: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 5,
        elevation: 10
    },
    headerText: {
        fontFamily: 'msb',
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
    },
    measurementItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: '#376DEC',
        padding: 10,
        borderRadius: 15
    },
    measurementText: {
        fontFamily: 'msr',
        color: 'white',
        fontSize: 16,
    },
    add: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginTop: 'auto',
        marginLeft: 'auto',
        elevation: 10,
    },
    text: {
        fontFamily: 'msr',
        color: '#5AFF98',
        textAlign: 'center',
        fontSize: 64
    },
    emptyText: {
        fontFamily: 'msb',
        color: '#D9D9D9',
        fontSize: 32,
        textAlign: 'center',
        paddingTop: 40,
        paddingHorizontal: 25
    },
    image: {
        zIndex: -1,
        width: 400,
        height: 400,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: -90,
        right: -90,
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
    buttonText: {
        fontFamily: 'msb',
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});
