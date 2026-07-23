import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

import AddButton from '../../components/buttons/AddButton';
import Background from '../../components/Background';
import Colors from '../../Colors';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

import { useSettings } from '../../helpers/SettingsProvider';

export default function BodyMeasurementsScreen() {
    const [bodyMeasurements, setBodyMeasurements] = useState([]);
    const [isBodyMeasurements, setIsBodyMeasurements] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const { settings, theme, translate } = useSettings();

    const groupedBodyMeasurements = DataController.groupByCategory(bodyMeasurements);

    const imageMapping = {
        body_mass: require('../../assets/images/measures/body-mass.png'),
        waist_circumference: require('../../assets/images/measures/waist-circumference.png'),
        chest_circumference: require('../../assets/images/measures/chest-circumference.png'),
        biceps_circumference: require('../../assets/images/measures/biceps-circumference.png')
    }

    const categoryLabels = {
        body_mass: translate('bodyMass'),
        waist_circumference: translate('waistCircumference'),
        chest_circumference: translate('chestCircumference'),
        biceps_circumference: translate('bicepsCircumference')
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
                <TouchableOpacity onPress={() => toggleCategory(category)} style={styles.header} activeOpacity={0.8}>
                    <Image source={url} style={styles.image} />
                    <Text style={styles.text}>{categoryLabels[category] || category}</Text>
                    <Icon name={expandedCategories[category] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color={theme.textPrimary} />
                </TouchableOpacity>

                {expandedCategories[category] && (
                    <View style={styles.itemsContainer}>
                        {items.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((measurement, index) => (
                            <View key={measurement.id} style={[styles.measurement, index === 0 ? { backgroundColor: Colors.green } : null]}>
                                <Text style={styles.text}>
                                    {new Intl.DateTimeFormat(settings.language, { dateStyle: 'medium' }).format(new Date(measurement.createdAt))}
                                </Text>
                                <Text style={styles.text}>
                                    {measurement.data.value} {measurement.data.unit}
                                </Text>
                                <TouchableOpacity onPress={() => handleModal(measurement.id)} activeOpacity={0.8}>
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
            borderRadius: 10,
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
            borderRadius: 10
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
                <Background text={true} content={translate('bodyMeasurementsDeclined')} type='masculine' />
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
