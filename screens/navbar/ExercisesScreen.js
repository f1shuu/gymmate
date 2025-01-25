import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AddButton from '../../components/buttons/AddButton';
import Background from '../../components/Background';
import Button from '../../components/buttons/Button';
import Colors from '../../Colors';
import Container from '../../components/Container';
import Modal from '../../components/Modal';

import { translateToPolish } from '../../translations/pl';

export default function ExercisesScreen() {
    const [exercises, setExercises] = useState([]);
    const [isExercises, setIsExercises] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [activeIndex, setActiveIndex] = useState(null);

    const navigation = useNavigation();
    
    useFocusEffect(
        useCallback(() => {
            retrieveExercises();
        }, [])
    )
    
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleModal = (index) => {
        setModalData(index);
        setIsModalVisible(!isModalVisible);
    }

    const retrieveExercises = async () => {
        try {
            const storedExercises = await AsyncStorage.getItem('exercises');
            if (storedExercises) {
                const parsedExercises = JSON.parse(storedExercises);
                setExercises(parsedExercises);
                if (parsedExercises.length === 0) setIsExercises(false);
                else setIsExercises(true);
            } else {
                setExercises([]);
                setIsExercises(false);
            }
        } catch (error) {
            console.error('Error retrieving exercises from AsyncStorage: ', error);
        }
    }

    const editExercise = async (id) => {
        try {
            const storedExercises = await AsyncStorage.getItem('exercises');
            const parsedExercises = storedExercises ? JSON.parse(storedExercises) : [];

            navigation.navigate('ExerciseCreator', parsedExercises.find(exercise => exercise.id === id));
        } catch (error) {
            console.error('Error editing exercise: ', error);
        }
    }

    const deleteExercise = async (id) => {
        try {
            const storedExercises = await AsyncStorage.getItem('exercises');
            const parsedExercises = storedExercises ? JSON.parse(storedExercises) : [];
            const updatedExercises = parsedExercises.filter(exercise => exercise.id !== id);

            await AsyncStorage.setItem('exercises', JSON.stringify(updatedExercises, null, 2));

            retrieveExercises();
            setIsModalVisible(!isModalVisible);
        } catch (error) {
            console.error('Error deleting exercise: ', error);
        }
    }


    const Exercise = ({ item }) => {
        const isActive = activeIndex === item.id;
        
        return (
            <TouchableOpacity onPress={() => toggleAccordion(item.id)} activeOpacity={1}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{item.name}</Text>
                    <Icon
                        name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={32}
                        color={Colors.white}
                    />
                </View>
                {isActive ? (
                    <View style={styles.exercise}>
                        {Object.entries(item).map(([key, value], index) => (
                            key !== 'id' && key !== 'name' && value !== '-' ? (
                                <View key={index} style={styles.row}>
                                    <Text style={styles.text}>{translateToPolish(key)}:</Text>
                                    <Text style={styles.text}>{value}</Text>
                                </View>
                            ) : null
                        ))}
                        <TouchableOpacity style={styles.removeButton}>
                            <Button onPress={() => editExercise(item.id)} text={'Edytuj'} />
                            <Button onPress={() => handleModal(item.id)} text={'Usuń'} type='delete' />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </TouchableOpacity>
        );
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
                buttonOneOnPress={() => deleteExercise(modalData)}
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
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginTop: 10,
        marginBottom: 5
    },
    headerText: {
        fontFamily: 'Nexa',
        fontSize: 18,
        color: Colors.white,
        marginLeft: 10
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
    text: {
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white
    },
    removeButton: {
        flexDirection: 'row',
        marginTop: 15
    }
}