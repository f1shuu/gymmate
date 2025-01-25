import { Text, View, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import Background from '../../components/Background';
import Colors from '../../Colors';
import Container from '../../components/Container';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import SegmentedButton from '../../components/buttons/SegmentedButton';

import { muscleGroups } from '../../constants/muscleGroups';
import { repsAmounts } from '../../constants/repsAmounts';
import { setsAmounts } from '../../constants/setsAmounts';
import { times } from '../../constants/times';
import { weights } from '../../constants/weights';

export default function ExerciseCreator({ route }) {
    const [id, setId]                   = useState(route.params?.id || null);
    const [muscleGroup, setMuscleGroup] = useState(route.params?.muscleGroup || null);
    const [type, setType]               = useState(route.params?.type || 'Powtórzeniowe');
    const [setsAmount, setSetsAmount]   = useState(route.params?.setsAmount || '4');
    const [repsAmount, setRepsAmount]   = useState(route.params?.repsAmount || '10');
    const [time, setTime]               = useState(route.params?.time || '60 s');
    const [weight, setWeight]           = useState(route.params?.weight || '-');
    const [name, setName]               = useState(route.params?.name || null);

    const [isDropdownFocused, setIsDropdownFocused] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errors, setErrors] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if (route.params && route.params.type) {
            setType(route.params.type);
        }
    }, [route.params]);

    const handleTypeChange = (type) => {
        setType(type);
    }

    const validate = (isLast, param) => {
        if (!param) {
            setIsModalVisible(() => !isModalVisible);
            setErrors(true);
        } else {
            setErrors(false);
            if (isLast) saveExercise(id, muscleGroup, type, setsAmount, repsAmount, weight, time, name);
        }
    }

    const saveExercise = async (id, muscleGroup, type, setsAmount, repsAmount, weight, time, name) => {
        try {
            const existingExercises = await AsyncStorage.getItem('exercises');
            const parsedExercises = existingExercises ? JSON.parse(existingExercises) : [];

            if (id) {
                const index = parsedExercises.findIndex(exercise => exercise.id === id);
                if (index !== -1) parsedExercises.splice(index, 1);
            }

            parsedExercises.push({
                id: id ? id : uuidv4(),
                muscleGroup,
                type,
                setsAmount: type === 'Powtórzeniowe' ? setsAmount : undefined,
                repsAmount: type === 'Powtórzeniowe' ? repsAmount : undefined,
                time: type === 'Czasowe' ? time : undefined,
                weight,
                name
            })

            await AsyncStorage.setItem('exercises', JSON.stringify(parsedExercises, null, 2));
            navigation.navigate('ExercisesScreen');
        } catch (error) {
            console.error('Error saving exercise: ', error);
        }
    }

    return (
        <Container>
            <Background text={false} />
            <ProgressSteps
                activeStepIconBorderColor={Colors.button}
                progressBarColor={Colors.secondary}
                completedProgressBarColor={Colors.add}
                completedStepIconColor={Colors.add}
                disabledStepIconColor={Colors.secondary}
                labelFontFamily='Nexa'
                labelColor={Colors.secondary}
                activeLabelColor={Colors.button}
                completedLabelColor={Colors.add}
                activeStepNumColor={Colors.button}
                completedStepNumColor={Colors.add}
                disabledStepNumColor={Colors.background}
            >
                <ProgressStep
                    label='Typ'
                    nextBtnText='Dalej'
                    nextBtnStyle={styles.button}
                    nextBtnTextStyle={styles.text}
                    onNext={() => validate(false, muscleGroup)}
                    errors={errors}
                >
                    <>
                        <Text style={styles.text}>Wybierz grupę mięśniową</Text>
                        <Dropdown
                            passedStyle={{ borderBottomLeftRadius: isDropdownFocused ? 0 : 15, borderBottomRightRadius: isDropdownFocused ? 0 : 15 }}
                            data={muscleGroups}
                            placeholder={isDropdownFocused ? '...' : 'Wybierz grupę mięśni...'}
                            value={muscleGroup}
                            onFocus={() => setIsDropdownFocused(true)}
                            onBlur={() => setIsDropdownFocused(false)}
                            onChange={item => {
                                setMuscleGroup(item.value);
                                setIsDropdownFocused(false);
                            }}
                        />
                        <Text style={styles.text}>Wybierz typ ćwiczenia</Text>
                        <SegmentedButton option1='Powtórzeniowe' option2='Czasowe' selectedOption={type} onOptionChange={handleTypeChange} />
                        <Modal
                            isVisible={isModalVisible}
                            text='Najpierw wybierz grupę mięśniową.'
                            twoButtons={false}
                            buttonOneText='Ok'
                            buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
                        />
                    </>
                </ProgressStep>
                <ProgressStep
                    label='Szczegóły'
                    nextBtnText='Dalej'
                    previousBtnText='Wstecz'
                    nextBtnStyle={styles.button}
                    nextBtnTextStyle={styles.text}
                    previousBtnStyle={styles.button}
                    previousBtnTextStyle={styles.text}
                >
                    <>
                        {type === 'Powtórzeniowe' ? (
                            <>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Ilość serii</Text>
                                    <Dropdown
                                        passedStyle={{ width: '20%', borderBottomLeftRadius: isDropdownFocused ? 0 : 15, borderBottomRightRadius: isDropdownFocused ? 0 : 15 }}
                                        data={setsAmounts}
                                        placeholder={isDropdownFocused ? '...' : setsAmount}
                                        value={setsAmount}
                                        onFocus={() => setIsDropdownFocused(true)}
                                        onBlur={() => setIsDropdownFocused(false)}
                                        onChange={item => {
                                            setSetsAmount(item.value);
                                            setIsDropdownFocused(false);
                                        }}
                                    />
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Ilość powtórzeń</Text>
                                    <Dropdown
                                        passedStyle={{ width: '20%', borderBottomLeftRadius: isDropdownFocused ? 0 : 15, borderBottomRightRadius: isDropdownFocused ? 0 : 15 }}
                                        data={repsAmounts}
                                        placeholder={isDropdownFocused ? '...' : repsAmount}
                                        value={repsAmount}
                                        onFocus={() => setIsDropdownFocused(true)}
                                        onBlur={() => setIsDropdownFocused(false)}
                                        onChange={item => {
                                            setRepsAmount(item.value);
                                            setIsDropdownFocused(false);
                                        }}
                                    />
                                </View>
                            </>) : (
                            <>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Czas</Text>
                                    <Dropdown
                                        passedStyle={{ width: '30%', borderBottomLeftRadius: isDropdownFocused ? 0 : 15, borderBottomRightRadius: isDropdownFocused ? 0 : 15 }}
                                        data={times}
                                        placeholder={isDropdownFocused ? '...' : time}
                                        value={time}
                                        onFocus={() => setIsDropdownFocused(true)}
                                        onBlur={() => setIsDropdownFocused(false)}
                                        onChange={item => {
                                            setTime(item.value);
                                            setIsDropdownFocused(false);
                                        }}
                                    />
                                </View>
                            </>)}
                        <View style={styles.row}>
                            <Text style={styles.text}>Obciążenie (opc.)</Text>
                            <Dropdown
                                passedStyle={{ width: '30%', borderBottomLeftRadius: isDropdownFocused ? 0 : 15, borderBottomRightRadius: isDropdownFocused ? 0 : 15 }}
                                data={weights}
                                placeholder={isDropdownFocused ? '...' : weight}
                                value={weight}
                                onFocus={() => setIsDropdownFocused(true)}
                                onBlur={() => setIsDropdownFocused(false)}
                                onChange={item => {
                                    setWeight(item.value);
                                    setIsDropdownFocused(false);
                                }}
                            />
                        </View>
                    </>
                </ProgressStep>
                <ProgressStep
                    label='Nazwa'
                    previousBtnText='Wstecz'
                    finishBtnText='Zapisz'
                    nextBtnStyle={styles.button}
                    nextBtnTextStyle={styles.text}
                    previousBtnStyle={styles.button}
                    previousBtnTextStyle={styles.text}
                    onSubmit={() => validate(true, name)}
                    errors={errors}
                >
                    <>
                        <Text style={styles.text}>Nadaj swojemu ćwiczeniu nazwę</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='np. Wyciskanie sztangi na ławce'
                            placeholderTextColor={Colors.secondary}
                            maxLength={50}
                            fontSize={16}
                            color={Colors.white}
                            onChangeText={(text) => setName(text)}
                            value={name} >
                        </TextInput>
                        <Modal
                            isVisible={isModalVisible}
                            text='Najpierw nazwij swoje ćwiczenie.'
                            twoButtons={false}
                            buttonOneText='Ok'
                            buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
                        />
                    </>
                </ProgressStep>
            </ProgressSteps>
        </Container>
    )
}

const styles = {
    button: {
        backgroundColor: Colors.button,
        width: 100,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginVertical: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        backgroundColor: Colors.primary,
        height: 60,
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white,
        borderRadius: 15,
        padding: 15,
        marginVertical: 10
    }
}