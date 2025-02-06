import { Text, View, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import Colors from '../../Colors';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import SegmentedButton from '../../components/buttons/SegmentedButton';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

import { muscleGroups } from '../../constants/muscleGroups';
import { repsAmounts } from '../../constants/repsAmounts';
import { setsAmounts } from '../../constants/setsAmounts';
import { times } from '../../constants/times';
import { kgWeights } from '../../constants/kgWeights';
import { lbsWeights } from '../../constants/lbsWeights';

export default function ExerciseCreator({ route }) {
    const [id, setId] = useState(route.params?.id || null);
    const [muscleGroup, setMuscleGroup] = useState(route.params?.data.muscleGroup || null);

    const { settings, translate } = useSettings();

    const [type, setType] = useState(route.params?.data.type || translate('repsBased'));
    const [setsAmount, setSetsAmount] = useState(route.params?.data.setsAmount || null);
    const [repsAmount, setRepsAmount] = useState(route.params?.data.repsAmount || null);
    const [time, setTime] = useState(route.params?.data.time || null);
    const [weight, setWeight] = useState(route.params?.data.weight || null);
    const [name, setName] = useState(route.params?.name || null);

    const [isFocus, setIsFocus] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errors, setErrors] = useState(false);

    const { theme } = useTheme();

    const navigation = useNavigation();

    useEffect(() => {
        if (route.params && route.params.type) setType(route.params.type);
    }, [route.params])

    const onDropdownChange = (setData, item) => {
        setData(item);
        setIsFocus(false);
    }

    const validate = async (isLast, ...params) => {
        const result = Object.values(params).some(param => param === null);
        if (result) {
            setIsModalVisible(() => !isModalVisible);
            setErrors(true);
        } else {
            if (type === translate('repsBased')) setTime(null);
            else {
                setSetsAmount(null);
                setRepsAmount(null);
            }
            setErrors(false);
            if (isLast) await DataController.store('exercises', id, name, 'exercises', navigation, 'ExercisesScreen', { muscleGroup, type, setsAmount, repsAmount, time, weight });
        }
    }

    const styles = {
        button: {
            backgroundColor: theme.primary,
            width: 100,
            height: 60,
            borderRadius: 15,
            justifyContent: 'center'
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textHeader,
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
            backgroundColor: theme.background,
            height: 60,
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary,
            borderRadius: 15,
            padding: 15,
            marginVertical: 10
        }
    }

    return (
        <Container>
            <ProgressSteps
                activeStepIconBorderColor={theme.primary}
                progressBarColor={theme.tertiary}
                completedProgressBarColor={Colors.green}
                completedStepIconColor={Colors.green}
                disabledStepIconColor={theme.tertiary}
                labelFontFamily='Nexa'
                labelColor={theme.tertiary}
                activeLabelColor={theme.primary}
                completedLabelColor={Colors.green}
                activeStepNumColor={theme.primary}
                completedStepNumColor={Colors.green}
                disabledStepNumColor={theme.background}
            >
                <ProgressStep
                    label={translate('type')}
                    nextBtnText={translate('next')}
                    nextBtnStyle={styles.button}
                    nextBtnTextStyle={styles.text}
                    onNext={() => validate(false, muscleGroup)}
                    errors={errors}
                >
                    <>
                        <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('chooseMuscleGroup')}</Text>
                        <Dropdown
                            passedStyle={{ borderBottomLeftRadius: isFocus ? 0 : 15, borderBottomRightRadius: isFocus ? 0 : 15 }}
                            data={muscleGroups[settings.language]}
                            placeholder={isFocus ? '...' : translate('chooseMuscleGroup') + '...'}
                            value={muscleGroup}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => onDropdownChange(setMuscleGroup, item.value)}
                        />
                        <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('chooseExerciseType')}</Text>
                        <SegmentedButton option1={translate('repsBased')} option2={translate('timeBased')} selectedOption={type} onOptionChange={(selectedOption) => setType(selectedOption)} />
                        <Modal
                            isVisible={isModalVisible}
                            text={translate('fillAllFields')}
                            twoButtons={false}
                            buttonOneText={translate('ok')}
                            buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
                        />
                    </>
                </ProgressStep>
                <ProgressStep
                    label={translate('details')}
                    nextBtnText={translate('next')}
                    previousBtnText={translate('back')}
                    nextBtnStyle={styles.button}
                    nextBtnTextStyle={styles.text}
                    previousBtnStyle={styles.button}
                    previousBtnTextStyle={styles.text}
                    onNext={() => validate(false, type === translate('repsBased') ? (setsAmount, repsAmount) : time)}
                    errors={errors}
                >
                    <>
                        {type === translate('repsBased') ? (
                            <>
                                <View style={styles.row}>
                                    <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('setsAmount')}</Text>
                                    <Dropdown
                                        passedStyle={{ width: '30%', borderBottomLeftRadius: isFocus ? 0 : 15, borderBottomRightRadius: isFocus ? 0 : 15 }}
                                        data={setsAmounts}
                                        placeholder={'...'}
                                        value={setsAmount}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={(item) => onDropdownChange(setSetsAmount, item.value)}
                                    />
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('repsAmount')}</Text>
                                    <Dropdown
                                        passedStyle={{ width: '30%', borderBottomLeftRadius: isFocus ? 0 : 15, borderBottomRightRadius: isFocus ? 0 : 15 }}
                                        data={repsAmounts}
                                        placeholder={'...'}
                                        value={repsAmount}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => onDropdownChange(setRepsAmount, item.value)}
                                    />
                                </View>
                                <Modal
                                    isVisible={isModalVisible}
                                    text={translate('fillAllFields')}
                                    twoButtons={false}
                                    buttonOneText={translate('ok')}
                                    buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
                                />
                            </>) : (
                            <>
                                <View style={styles.row}>
                                    <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('time')}</Text>
                                    <Dropdown
                                        passedStyle={{ width: '30%', borderBottomLeftRadius: isFocus ? 0 : 15, borderBottomRightRadius: isFocus ? 0 : 15 }}
                                        data={times}
                                        placeholder={'...'}
                                        value={time}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={(item) => onDropdownChange(setTime, item.value)}
                                    />
                                </View>
                                <Modal
                                    isVisible={isModalVisible}
                                    text={translate('fillAllFields')}
                                    twoButtons={false}
                                    buttonOneText={translate('ok')}
                                    buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
                                />
                            </>)}
                        <View style={styles.row}>
                            <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('weightOptional')}</Text>
                            <Dropdown
                                passedStyle={{ width: '30%', borderBottomLeftRadius: isFocus ? 0 : 15, borderBottomRightRadius: isFocus ? 0 : 15 }}
                                data={settings.units = 'metric' ? kgWeights : lbsWeights}
                                placeholder={'...'}
                                value={weight}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={(item) => onDropdownChange(setWeight, item.value)}
                            />
                        </View>
                    </>
                </ProgressStep>
                <ProgressStep
                    label={translate('name')}
                    previousBtnText={translate('back')}
                    finishBtnText={translate('save')}
                    nextBtnStyle={styles.button}
                    nextBtnTextStyle={styles.text}
                    previousBtnStyle={styles.button}
                    previousBtnTextStyle={styles.text}
                    onSubmit={() => validate(true, name)}
                    errors={errors}
                >
                    <>
                        <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('nameYourExercise')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={translate('exerciseNameExample')}
                            placeholderTextColor={theme.textSecondary}
                            maxLength={50}
                            fontSize={16}
                            color={theme.textPrimary}
                            onChangeText={(text) => setName(text)}
                            value={name} >
                        </TextInput>
                        <Modal
                            isVisible={isModalVisible}
                            text={translate('fillAllFields')}
                            twoButtons={false}
                            buttonOneText={translate('ok')}
                            buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
                        />
                    </>
                </ProgressStep>
            </ProgressSteps>
        </Container>
    )
}
