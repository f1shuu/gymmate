import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Modal from '../../components/Modal';
import Background from '../../components/Background';
import AddButton from '../../components/buttons/AddButton';

export default function BodyMeasurementsScreen() {

    const [activeSections, setActiveSections] = useState([]);

    const [data, setData] = useState([]);
    const [isData, setIsData] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const imageMapping = {
        'Masa ciała': require('../../assets/images/measures/body-mass.png'),
        'Obwód talii': require('../../assets/images/measures/waist-circumference.png'),
        'Obwód klatki piersiowej': require('../../assets/images/measures/chest-circumference.png'),
        'Obwód bicepsa': require('../../assets/images/measures/biceps-circumference.png')
    }

    useFocusEffect(
        useCallback(() => {
            retrieveData();
            renderHeader();
            renderContent();
        }, [])
    )

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
    }

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
                            ...parsedData[categoryIndex].data.slice(elementIndex + 1)
                        ]
                    },
                    ...parsedData.slice(categoryIndex + 1)
                ]
                if (updatedData[categoryIndex].data.length === 0) updatedData.splice(categoryIndex, 1);
                await AsyncStorage.setItem('data', JSON.stringify(updatedData, null, 2));
                retrieveData();
                setIsModalVisible(!isModalVisible);
            }
        } catch (error) {
            console.error('Error deleting measurement from AsyncStorage:', error);
        }
    }

    const renderHeader = (section, _, isActive) => {
        let url;
        if (section) {
            url = imageMapping[section.category];
            return (
                <View style={styles.header}>
                    <View style={styles.imageBackground}>
                        <Image source={url} style={{ width: 60, height: 60, margin: 5 }} />
                    </View>
                    <Text style={styles.headerText}>{section.category}</Text>
                    <Icon
                        name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={32}
                        color={Colors.white}
                    />
                </View>
            )
        } else {
            url = '';
            return null;
        }
    }

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
                                <Icon name='delete' size={30} color={Colors.white} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )
        } else return null;
    }

    return (
        <Container>
            {isData ? (
                <>
                    <Background text={false} />
                    <Accordion
                        underlayColor={Colors.background}
                        sections={data}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={(activeSections) => setActiveSections(activeSections)}
                    />
                </>
            ) : (
                <Background text={true} content='pomiarów' type='masculine' />
            )}
            <AddButton onPress='AddBodyMeasurement' />
            <Modal
                isVisible={isModalVisible}
                text='Czy na pewno chcesz usunąć ten pomiar?'
                twoButtons={true}
                buttonOneText='Tak'
                buttonOneOnPress={() => deleteMeasurement(modalData.category, modalData.index)}
                buttonTwoText='Nie'
                buttonTwoOnPress={() => setIsModalVisible(!isModalVisible)}
            >
            </Modal>
        </Container>
    )
}

const styles = ({
    header: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 5
    },
    imageBackground: {
        backgroundColor: Colors.primary,
        borderRadius: 15
    },
    headerText: {
        fontFamily: 'Nexa',
        fontSize: 18,
        color: Colors.white,
        marginLeft: 10
    },
    measurementItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: Colors.button,
        padding: 10,
        borderRadius: 15
    },
    measurementText: {
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white
    }
})