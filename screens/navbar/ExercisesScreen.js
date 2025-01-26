import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AddButton from '../../components/buttons/AddButton';
import Background from '../../components/Background';
import Button from '../../components/buttons/Button';
import Colors from '../../Colors';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Modal from '../../components/Modal';

import { translateToPolish } from '../../helpers/translations/pl';

export default function ExercisesScreen() {
    const [exercises, setExercises] = useState([]);
    const [isExercises, setIsExercises] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [activeId, setActiveId] = useState(null);

    const navigation = useNavigation();

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
        setIsModalVisible(!isModalVisible);
    }

    const Exercise = ({ item }) => {
        const isActive = activeId === item.id;

        return (
            <TouchableOpacity onPress={() => setActiveId(activeId === item.id ? null : item.id)} activeOpacity={1}>
                <View style={styles.header}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Icon
                        name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={32}
                        color={Colors.white}
                    />
                </View>
                {isActive ? (
                    <View style={styles.exercise}>
                        {Object.entries(item.data).map(([key, value], id) => (
                            value ? (
                                <View key={id} style={styles.row}>
                                    <Text style={styles.text}>{translateToPolish(key)}:</Text>
                                    <Text style={styles.text}>{value}</Text>
                                </View>
                            ) : null
                        ))}
                        <TouchableOpacity style={styles.removeButton}>
                            <Button onPress={async () => await DataController.update('exercises', item.id, navigation, 'ExerciseCreator')} text={'Edytuj'} />
                            <Button onPress={() => handleModal(item.id)} text={'Usuń'} type='delete' />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            {isExercises ? (
                <>
                    <Background text={false} />
                    <FlatList
                        data={exercises}
                        renderItem={({ item }) => <Exercise item={item} />}
                        keyExtractor={item => item.id}
                    />
                </>
            ) : (
                <Background text={true} content='ćwiczeń' type='feminine' />
            )}
            <AddButton onPress='ExerciseCreator' />
            <Modal
                isVisible={isModalVisible}
                text='Czy na pewno chcesz usunąć to ćwiczenie?'
                twoButtons={true}
                buttonOneText='Tak'
                buttonOneOnPress={async () => await DataController.delete('exercises', setExercises, setIsExercises, modalData, isModalVisible, setIsModalVisible)}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 5
    },
    text: {
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white
    },
    exercise: {
        flexDirection: 'column',
        marginBottom: 5,
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 15,
        color: Colors.white
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2
    },
    removeButton: {
        flexDirection: 'row',
        marginTop: 15
    }
}