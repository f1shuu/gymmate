import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

import AddButton from '../../components/buttons/AddButton';
import Background from '../../components/Background';
import Button from '../../components/buttons/Button';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

import { useSettings } from '../../helpers/SettingsProvider';

import { muscleGroups } from '../../constants/muscleGroups';

export default function ExercisesScreen() {
    const [exercises, setExercises] = useState([]);
    const [isExercises, setIsExercises] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [activeId, setActiveId] = useState(null);

    const { settings, theme, translate } = useSettings();

    const navigation = useNavigation();
    const translateDomainValue = (value) => {
        if (Array.isArray(value)) return value.map(translateDomainValue).join(', ');
        if (value === 'reps_based') return translate('repsBased');
        if (value === 'time_based') return translate('timeBased');
        return muscleGroups[settings.language].find(group => group.value === value)?.label || translate(value);
    }

    const hasDisplayValue = (value) => Array.isArray(value) ? value.length > 0 : Boolean(value);

    useFocusEffect(
        useCallback(() => {
            const fetchExercises = async () => {
                await DataController.get('exercises', setExercises, setIsExercises);
            }
            fetchExercises();
        }, [])
    )

    const handleModal = (id) => {
        setModalData(id);
        if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error);
        setIsModalVisible(!isModalVisible);
    }

    const Exercise = ({ item }) => {
        const isActive = activeId === item.id;

        return (
            <TouchableOpacity onPress={() => setActiveId(activeId === item.id ? null : item.id)} activeOpacity={0.8}>
                <View style={styles.header}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Icon name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={32} color={theme.textPrimary} />
                </View>
                {isActive ? (
                    <View style={styles.exercise}>
                        {Object.entries(item.data).map(([key, value], id) => (
                            hasDisplayValue(value) ? (
                                <View key={key} style={styles.row}>
                                    <Text style={styles.text}>{translate(key)}:</Text>
                                    <Text style={styles.text}>{translateDomainValue(value)}</Text>
                                </View>
                            ) : null
                        ))}
                        <View style={[styles.row, { marginTop: 15 }]}>
                            <Button onPress={async () => await DataController.update('exercises', item.id, navigation, 'ExerciseCreator')} text={translate('edit')}/>
                            <Button onPress={() => handleModal(item.id)} text={translate('delete')} type='delete' />
                        </View>
                    </View>
                ) : null}
            </TouchableOpacity>
        )
    }

    const styles = {
        header: {
            backgroundColor: theme.background,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 5
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary
        },
        exercise: {
            flexDirection: 'column',
            marginBottom: 5,
            backgroundColor: theme.background,
            padding: 15,
            borderRadius: 10
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 2,
            gap: 15
        }
    }

    return (
        <Container gradient={0.75}>
            {isExercises ? (
                <>
                    <FlatList
                        data={exercises}
                        renderItem={({ item }) => <Exercise item={item} />}
                        keyExtractor={item => item.id}
                    />
                </>
            ) : (
                <Background text={true} content={translate('exercisesDeclined')} type='feminine' />
            )}
            <AddButton onPress='ExerciseCreator' />
            <Modal
                isVisible={isModalVisible}
                text={translate('areYouSure') + translate('thisExercise') + '?'}
                twoButtons={true}
                buttonOneText={translate('yes')}
                buttonOneOnPress={async () => await DataController.delete('exercises', setExercises, setIsExercises, modalData, isModalVisible, setIsModalVisible)}
                buttonTwoText={translate('no')}
                buttonTwoOnPress={() => setIsModalVisible(!isModalVisible)}
            >
            </Modal>
        </Container>
    )
}