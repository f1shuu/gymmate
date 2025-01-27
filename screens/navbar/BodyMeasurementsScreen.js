import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AddButton from '../../components/buttons/AddButton';
import Background from '../../components/Background';
import Colors from '../../Colors';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

export default function BodyMeasurementsScreen() {
    const [bodyMeasurements, setBodyMeasurements] = useState([]);
    const [isBodyMeasurements, setIsBodyMeasurements] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const groupedBodyMeasurements = DataController.groupByCategory(bodyMeasurements);

    const imageMapping = {
        'Masa ciała': require('../../assets/images/measures/body-mass.png'),
        'Obwód talii': require('../../assets/images/measures/waist-circumference.png'),
        'Obwód klatki piersiowej': require('../../assets/images/measures/chest-circumference.png'),
        'Obwód bicepsa': require('../../assets/images/measures/biceps-circumference.png')
    }

    useFocusEffect(
        useCallback(() => {
            const fetchBodyMeasurements = async () => {
                await DataController.get('bodyMeasurements', setBodyMeasurements, setIsBodyMeasurements);
            }
            fetchBodyMeasurements();
        }, [])
    )

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }))
    }

    const handleModal = (id) => {
        setModalData(id);
        setIsModalVisible(!isModalVisible);
    }

    const BodyMeasurement = ({ category, items }) => {
        const url = imageMapping[category];

        return (
            <View>
                <TouchableOpacity style={styles.header} onPress={() => toggleCategory(category)} activeOpacity={1}>
                    <View style={styles.imageBackground}>
                        <Image source={url} style={styles.image} />
                    </View>
                    <Text style={styles.text}>{category}</Text>
                    <Icon
                        name={expandedCategories[category] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={24}
                        color={Colors.white}
                    />
                </TouchableOpacity>

                {expandedCategories[category] && (
                    <View style={styles.itemsContainer}>
                        {items.map((measurement) => (
                            <View key={measurement.id} style={styles.row}>
                                <Text style={styles.text}>
                                    {measurement.date}
                                </Text>
                                <Text style={styles.text}>
                                    {measurement.data.value} {measurement.data.unit}
                                </Text>
                                <TouchableOpacity onPress={() => handleModal(measurement.id)}>
                                    <Icon name='delete' size={30} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        )
    }

    return (
        <Container>
            {isBodyMeasurements ? (
                <>
                    <Background text={false} />
                    <FlatList
                        data={Object.entries(groupedBodyMeasurements)}
                        keyExtractor={([category]) => category}
                        renderItem={({ item: [category, items] }) => <BodyMeasurement category={category} items={items} />}
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
                buttonOneOnPress={async () => await DataController.delete('bodyMeasurements', setBodyMeasurements, setIsBodyMeasurements, modalData, isModalVisible, setIsModalVisible)}
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
        justifyContent: 'space-between',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 5
    },
    imageBackground: {
        backgroundColor: Colors.primary,
        borderRadius: 15
    },
    image: {
        width: 60,
        height: 60,
        margin: 5,
        marginRight: 15
    },
    text: {
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: Colors.button,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 15
    }
}