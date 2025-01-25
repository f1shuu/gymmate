import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Modal from '../../components/Modal';
import Background from '../../components/Background';
import AddButton from '../../components/buttons/AddButton';

export default function BodyMeasurementsScreen() {
    const [bodyMeasurements, setBodyMeasurements] = useState([]);
    const [isBodyMeasurements, setIsBodyMeasurements] = useState(false);
    const [activeCategory, setActiveCategory] = useState([]);
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
            retrieveBodyMeasurements();
        }, [])
    )

    const toggleAccordion = (category) => {
        setActiveCategory(activeCategory === category ? null : category);
    };

    const handleModal = (category, index) => {
        setModalData({ category, index });
        setIsModalVisible(!isModalVisible);
    }

    const retrieveBodyMeasurements = async () => {
        try {
            const storedBodyMeasurements = await AsyncStorage.getItem('bodyMeasurements');
            if (storedBodyMeasurements) {
                const parsedBodyMeasurements = JSON.parse(storedBodyMeasurements);
                setBodyMeasurements(parsedBodyMeasurements);
                if (parsedBodyMeasurements.length === 0) setIsBodyMeasurements(false);
                else setIsBodyMeasurements(true);
            } else {
                setBodyMeasurements([]);
                setIsBodyMeasurements(false);
            }
        } catch (error) {
            console.error('Error retrieving body measurements from AsyncStorage: ', error);
        }
    }

    const deleteBodyMeasurement = async (category, index) => {
        try {
            const existingBodyMeasurements = await AsyncStorage.getItem('bodyMeasurements');
            const parsedBodyMeasurements = existingBodyMeasurements ? JSON.parse(existingBodyMeasurements) : [];
            const categoryIndex = parsedBodyMeasurements.findIndex(entry => entry.category === category);

            if (categoryIndex !== -1) {
                const elementIndex = index;
                const updatedBodyMeasurements = [
                    ...parsedBodyMeasurements.slice(0, categoryIndex),
                    {
                        ...parsedBodyMeasurements[categoryIndex],
                        bodyMeasurements: [
                            ...parsedBodyMeasurements[categoryIndex].bodyMeasurements.slice(0, elementIndex),
                            ...parsedBodyMeasurements[categoryIndex].bodyMeasurements.slice(elementIndex + 1)
                        ]
                    },
                    ...parsedBodyMeasurements.slice(categoryIndex + 1)
                ]
                if (updatedBodyMeasurements[categoryIndex].bodyMeasurements.length === 0) updatedBodyMeasurements.splice(categoryIndex, 1);
                await AsyncStorage.setItem('measurements', JSON.stringify(updatedBodyMeasurements, null, 2));
                retrieveBodyMeasurements();
                setIsModalVisible(!isModalVisible);
            }
        } catch (error) {
            console.error('Error deleting body measurement from AsyncStorage:', error);
        }
    }

    const BodyMeasurement = ({ item }) => {
        const isActive = activeCategory === item.category;
        const url = imageMapping[item.category];

        return (
            <TouchableOpacity onPress={() => toggleAccordion(item.category)} activeOpacity={1}>
                <View style={styles.header}>
                    <View style={styles.imageBackground}>
                        <Image source={url} style={{ width: 60, height: 60, margin: 5 }} />
                    </View>
                    <Text style={styles.headerText}>{item.category}</Text>
                    <Icon
                        name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={32}
                        color={Colors.white}
                    />
                </View>
                {isActive ? (
                    <View>
                        {item.bodyMeasurements && item.bodyMeasurements.map((bodyMeasurement, index) => (
                            <View key={index} style={styles.bodyMeasurementItem}>
                                <Text style={styles.bodyMeasurementText}>
                                    {bodyMeasurement.value} {bodyMeasurement.unit}
                                </Text>
                                <Text style={styles.bodyMeasurementText}>
                                    {bodyMeasurement.date}
                                </Text>
                                <TouchableOpacity onPress={() => handleModal(item.category, index)}>
                                    <Icon name='delete' size={30} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : null}
            </TouchableOpacity>
        );
    }

    return (
        <Container>
            {isBodyMeasurements ? (
                <>
                    <Background text={false} />
                    <FlatList
                        data={bodyMeasurements}
                        renderItem={({ item }) => <BodyMeasurement item={item} />}
                        keyExtractor={item => item.id}
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
                buttonOneOnPress={() => deleteBodyMeasurement(modalData.category, modalData.index)}
                buttonTwoText='Nie'
                buttonTwoOnPress={() => setIsModalVisible(!isModalVisible)}
            >
            </Modal>
        </Container>
    )
}

const styles = {
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
    bodyMeasurementItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: Colors.button,
        padding: 10,
        borderRadius: 15
    },
    bodyMeasurementText: {
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white
    }
}