import { Text, View, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import Background from '../../components/Background';
import Colors from '../../Colors';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import SegmentedButton from '../../components/buttons/SegmentedButton';

import { muscleGroups } from '../../constants/muscleGroups';
import { repsAmounts } from '../../constants/repsAmounts';
import { setsAmounts } from '../../constants/setsAmounts';
import { times } from '../../constants/times';
import { weights } from '../../constants/weights';

export default function ExerciseCreator({ route }) {
    const [id, setId] = useState(route.params?.id || null);
    const [muscleGroup, setMuscleGroup] = useState(route.params?.data.muscleGroup || null);
    const [type, setType] = useState(route.params?.data.type || 'Powtórzeniowe');
    const [setsAmount, setSetsAmount] = useState(route.params?.data.setsAmount || null);
    const [repsAmount, setRepsAmount] = useState(route.params?.data.repsAmount || null);
    const [time, setTime] = useState(route.params?.data.time || null);
    const [weight, setWeight] = useState(route.params?.data.weight || null);
    const [name, setName] = useState(route.params?.name || null);

    const [isDropdownFocused, setIsDropdownFocused] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errors, setErrors] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if (route.params && route.params.type) setType(route.params.type);
    }, [route.params]);

    const validate = async (isLast, ...params) => {
        const result = Object.values(params).some(param => param === null);
        if (result) {
            setIsModalVisible(() => !isModalVisible);
            setErrors(true);
        } else {
            if (type === 'Powtórzeniowe') setTime(null);
            else {
                setSetsAmount(null);
                setRepsAmount(null);
            }
            setErrors(false);
            if (isLast) await DataController.store('exercises', id, name, 'exercises', navigation, 'ExercisesScreen', { muscleGroup, type, setsAmount, repsAmount, time, weight })
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
                        <SegmentedButton option1='Powtórzeniowe' option2='Czasowe' selectedOption={type} onOptionChange={(selectedOption) => setType(selectedOption)} />
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
                    onNext={() => validate(false, type === 'Powtórzeniowe' ? (setsAmount, repsAmount) : time)}
                    errors={errors}
                >
                    <>
                        {type === 'Powtórzeniowe' ? (
                            <>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Ilość serii</Text>
                                    <Dropdown
                                        passedStyle={{ width: '30%', borderBottomLeftRadius: isDropdownFocused ? 0 : 15, borderBottomRightRadius: isDropdownFocused ? 0 : 15 }}
                                        data={setsAmounts}
                                        placeholder={'...'}
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
                                        passedStyle={{ width: '30%', borderBottomLeftRadius: isDropdownFocused ? 0 : 15, borderBottomRightRadius: isDropdownFocused ? 0 : 15 }}
                                        data={repsAmounts}
                                        placeholder={'...'}
                                        value={repsAmount}
                                        onFocus={() => setIsDropdownFocused(true)}
                                        onBlur={() => setIsDropdownFocused(false)}
                                        onChange={item => {
                                            setRepsAmount(item.value);
                                            setIsDropdownFocused(false);
                                        }}
                                    />
                                </View>
                                <Modal
                                    isVisible={isModalVisible}
                                    text='Najpierw wybierz ilość serii i powtórzeń.'
                                    twoButtons={false}
                                    buttonOneText='Ok'
                                    buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
                                />
                            </>) : (
                            <>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Czas</Text>
                                    <Dropdown
                                        passedStyle={{ width: '30%', borderBottomLeftRadius: isDropdownFocused ? 0 : 15, borderBottomRightRadius: isDropdownFocused ? 0 : 15 }}
                                        data={times}
                                        placeholder={'...'}
                                        value={time}
                                        onFocus={() => setIsDropdownFocused(true)}
                                        onBlur={() => setIsDropdownFocused(false)}
                                        onChange={item => {
                                            setTime(item.value);
                                            setIsDropdownFocused(false);
                                        }}
                                    />
                                </View>
                                <Modal
                                    isVisible={isModalVisible}
                                    text='Najpierw wybierz czas trwania ćwiczenia.'
                                    twoButtons={false}
                                    buttonOneText='Ok'
                                    buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
                                />
                            </>)}
                        <View style={styles.row}>
                            <Text style={styles.text}>Obciążenie (opc.)</Text>
                            <Dropdown
                                passedStyle={{ width: '30%', borderBottomLeftRadius: isDropdownFocused ? 0 : 15, borderBottomRightRadius: isDropdownFocused ? 0 : 15 }}
                                data={weights}
                                placeholder={'...'}
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