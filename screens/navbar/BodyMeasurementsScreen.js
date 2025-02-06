import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

import AddButton from '../../components/buttons/AddButton';
import Background from '../../components/Background';
import Colors from '../../Colors';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

export default function BodyMeasurementsScreen() {
    const [bodyMeasurements, setBodyMeasurements] = useState([]);
    const [isBodyMeasurements, setIsBodyMeasurements] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const { settings, translate } = useSettings();
    const { theme } = useTheme();

    const groupedBodyMeasurements = DataController.groupByCategory(bodyMeasurements);

    const imageMapping = {
        [translate('bodyMass')]: require('../../assets/images/measures/body-mass.png'),
        [translate('waistCircumference')]: require('../../assets/images/measures/waist-circumference.png'),
        [translate('chestCircumference')]: require('../../assets/images/measures/chest-circumference.png'),
        [translate('bicepsCircumference')]: require('../../assets/images/measures/biceps-circumference.png')
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
        if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error);
        setIsModalVisible(!isModalVisible);
    }

    const BodyMeasurement = ({ category, items }) => {
        const url = imageMapping[category];

        return (
            <View>
                <TouchableOpacity style={styles.header} onPress={() => toggleCategory(category)} activeOpacity={0.8}>
                    <Image source={url} style={styles.image} />
                    <Text style={styles.text}>{category}</Text>
                    <Icon name={expandedCategories[category] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color={theme.textPrimary} />
                </TouchableOpacity>

                {expandedCategories[category] && (
                    <View style={styles.itemsContainer}>
                        {items.slice().reverse().map((measurement, index) => (
                            <View key={measurement.id} style={[styles.measurement, index === 0 ? { backgroundColor: Colors.green } : '']}>
                                <Text style={styles.text}>
                                    {measurement.date}
                                </Text>
                                <Text style={styles.text}>
                                    {measurement.data.value} {measurement.data.unit}
                                </Text>
                                <TouchableOpacity onPress={() => handleModal(measurement.id)}>
                                    <Icon name='delete' size={30} color={theme.textPrimary} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        )
    }

    const styles = {
        header: {
            backgroundColor: theme.background,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 5
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
            color: theme.textPrimary
        },
        measurement: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
            backgroundColor: theme.background,
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 15
        }
    }

    return (
        <Container gradient={0.75}>
            {isBodyMeasurements ? (
                <>
                    <FlatList
                        data={Object.entries(groupedBodyMeasurements)}
                        keyExtractor={([category]) => category}
                        renderItem={({ item: [category, items] }) => <BodyMeasurement category={category} items={items} />}
                    />
                </>
            ) : (
                <Background text={true} content={translate('bodyMeasurements')} type='masculine' />
            )}
            <AddButton onPress='BodyMeasurementsCreator' />
            <Modal
                isVisible={isModalVisible}
                text={translate('areYouSure') + translate('thisBodyMeasurement') + '?'}
                twoButtons={true}
                buttonOneText={translate('yes')}
                buttonOneOnPress={async () => await DataController.delete('bodyMeasurements', setBodyMeasurements, setIsBodyMeasurements, modalData, isModalVisible, setIsModalVisible)}
                buttonTwoText={translate('no')}
                buttonTwoOnPress={() => setIsModalVisible(!isModalVisible)}
            >
            </Modal>
        </Container>
    )
}
