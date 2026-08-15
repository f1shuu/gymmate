import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import Colors from '../../Colors';

import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Dropdown from '../../components/Dropdown';
import MultiSelect from '../../components/MultiSelect';
import Modal from '../../components/Modal';
import SegmentedButton from '../../components/buttons/SegmentedButton';

import { useAchievements } from '../../helpers/AchievementProvider';
import { useSettings } from '../../helpers/SettingsProvider';

import { kgWeights } from '../../constants/kgWeights';
import { lbsWeights } from '../../constants/lbsWeights';
import { muscleGroups } from '../../constants/muscleGroups';
import { repsAmounts } from '../../constants/repsAmounts';
import { setsAmounts } from '../../constants/setsAmounts';
import { times } from '../../constants/times';

const isMissing = (value) => value === null || value === undefined || (Array.isArray(value) && value.length === 0) || (typeof value === 'string' && value.trim() === '');

export default function ExerciseCreator({ route }) {
    const { evaluateAchievements } = useAchievements();
    const { settings, theme, translate } = useSettings();
    const localizedMuscleGroups = muscleGroups[settings.language] || muscleGroups.en || [];
    const id = route.params?.id || null;
    const [activeStep, setActiveStep] = useState(0);
    const [muscleGroupsSelected, setMuscleGroupsSelected] = useState(() => {
        const storedGroups = route.params?.data?.muscleGroups;
        if (Array.isArray(storedGroups)) return storedGroups;
        return route.params?.data?.muscleGroup ? [route.params.data.muscleGroup] : [];
    })
    const [type, setType] = useState(route.params?.data?.type || 'reps_based');
    const [setsAmount, setSetsAmount] = useState(route.params?.data?.setsAmount || null);
    const [repsAmount, setRepsAmount] = useState(route.params?.data?.repsAmount || null);
    const [time, setTime] = useState(route.params?.data?.time || null);
    const [weight, setWeight] = useState(route.params?.data?.weight ?? null);
    const [name, setName] = useState(route.params?.name || '');
    const [note, setNote] = useState(route.params?.data?.note || '');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const navigation = useNavigation();

    const onDropdownChange = (setData, value) => {
        setData(value);
        setActiveDropdown(null);
    }

    const dropdownHandlers = (name) => ({
        onFocus: () => setActiveDropdown(name),
        onBlur: () => setActiveDropdown(current => current === name ? null : current)
    })

    const dropdownStyle = (name) => ({
        width: '50%',
        borderBottomLeftRadius: activeDropdown === name ? 0 : 10,
        borderBottomRightRadius: activeDropdown === name ? 0 : 10
    })

    const showValidationErrorIfNeeded = (...values) => {
        const hasMissingValue = values.some(isMissing);
        if (hasMissingValue) setIsModalVisible(true);
        return hasMissingValue;
    }

    const goToDetails = () => {
        if (!showValidationErrorIfNeeded(muscleGroupsSelected)) setActiveStep(1);
    }

    const goToName = () => {
        const hasErrors = type === 'reps_based' ? showValidationErrorIfNeeded(setsAmount, repsAmount) : showValidationErrorIfNeeded(time);
        if (!hasErrors) setActiveStep(2);
    }

    const saveExercise = async () => {
        if (showValidationErrorIfNeeded(name) || isSaving) return;

        const isRepsBased = type === 'reps_based';
        const exerciseData = {
            muscleGroups: muscleGroupsSelected,
            type,
            setsAmount: isRepsBased ? setsAmount : null,
            repsAmount: isRepsBased ? repsAmount : null,
            time: isRepsBased ? null : time,
            weight,
            note: note.trim() || null
        }

        setIsSaving(true);
        const saved = await DataController.store(
            'exercises',
            id,
            name.trim(),
            'exercises',
            navigation,
            'ExercisesScreen',
            exerciseData
        )
        if (saved) await evaluateAchievements();
        setIsSaving(false);
    }

    const styles = {
        navigationRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            paddingTop: 20,
            paddingBottom: 20,
            marginHorizontal: 10
        },
        navigationButton: {
            minWidth: 120,
            height: 48,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16
        },
        previousButton: {
            borderWidth: 1,
            borderColor: theme.primary
        },
        navigationButtonText: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textHeader
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
            height: 50,
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary,
            borderRadius: 10,
            padding: 15,
            marginVertical: 10
        },
        noteInput: {
            height: 100,
            minHeight: 100,
            textAlignVertical: 'top'
        },
        characterCount: {
            fontFamily: 'Nexa',
            fontSize: 12,
            color: theme.textSecondary,
            textAlign: 'right',
            marginRight: 4
        }
    }

    const navigationButtons = (previousStep, onNext, nextText, disabled = false) => (
        <View style={styles.navigationRow}>
            {previousStep === null ? <View /> : (
                <TouchableOpacity
                    style={[styles.navigationButton, styles.previousButton]}
                    activeOpacity={0.8}
                    onPress={() => setActiveStep(previousStep)}
                >
                    <Text style={[styles.navigationButtonText, { color: theme.primary }]}>{translate('back')}</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity
                style={[styles.navigationButton, { backgroundColor: theme.primary }, disabled && { opacity: 0.55 }]}
                activeOpacity={0.8}
                onPress={onNext}
                disabled={disabled}
            >
                <Text style={styles.navigationButtonText}>{nextText}</Text>
            </TouchableOpacity>
        </View>
    )

    const progressStepProps = {
        removeBtnRow: true,
        scrollViewProps: { contentContainerStyle: { flexGrow: 1 } }
    }

    return (
        <Container>
            <ProgressSteps
                activeStep={activeStep}
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
                <ProgressStep label={translate('type')} {...progressStepProps}>
                    <>
                        <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('chooseMuscleGroup')}</Text>
                        <MultiSelect
                            passedStyle={{ borderBottomLeftRadius: activeDropdown === 'muscleGroups' ? 0 : 10, borderBottomRightRadius: activeDropdown === 'muscleGroups' ? 0 : 10 }}
                            data={localizedMuscleGroups}
                            placeholder={activeDropdown === 'muscleGroups' ? '...' : translate('chooseMuscleGroup') + '...'}
                            value={muscleGroupsSelected}
                            {...dropdownHandlers('muscleGroups')}
                            onChange={setMuscleGroupsSelected}
                        />
                        <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('chooseExerciseType')}</Text>
                        <SegmentedButton
                            option1='reps_based'
                            option2='time_based'
                            option1Label={translate('repsBased')}
                            option2Label={translate('timeBased')}
                            selectedOption={type}
                            onOptionChange={setType}
                        />
                        {navigationButtons(null, goToDetails, translate('next'))}
                    </>
                </ProgressStep>
                <ProgressStep label={translate('details')} {...progressStepProps}>
                    <>
                        {type === 'reps_based' ? (
                            <>
                                <View style={styles.row}>
                                    <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('setsAmount')}</Text>
                                    <Dropdown
                                        passedStyle={dropdownStyle('sets')}
                                        data={setsAmounts}
                                        placeholder='...'
                                        value={setsAmount}
                                        {...dropdownHandlers('sets')}
                                        onChange={(item) => onDropdownChange(setSetsAmount, item.value)}
                                    />
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('repsAmount')}</Text>
                                    <Dropdown
                                        passedStyle={dropdownStyle('reps')}
                                        data={repsAmounts}
                                        placeholder='...'
                                        value={repsAmount}
                                        {...dropdownHandlers('reps')}
                                        onChange={(item) => onDropdownChange(setRepsAmount, item.value)}
                                    />
                                </View>
                            </>
                        ) : (
                            <View style={styles.row}>
                                <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('time')}</Text>
                                <Dropdown
                                    passedStyle={dropdownStyle('time')}
                                    data={times}
                                    placeholder='...'
                                    value={time}
                                    {...dropdownHandlers('time')}
                                    onChange={(item) => onDropdownChange(setTime, item.value)}
                                />
                            </View>
                        )}
                        <View style={styles.row}>
                            <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('weightOptional')}</Text>
                            <Dropdown
                                passedStyle={dropdownStyle('weight')}
                                data={settings.units === 'metric' ? kgWeights : lbsWeights}
                                placeholder='...'
                                value={weight}
                                {...dropdownHandlers('weight')}
                                onChange={(item) => onDropdownChange(setWeight, item.value)}
                            />
                        </View>
                        {navigationButtons(0, goToName, translate('next'))}
                    </>
                </ProgressStep>
                <ProgressStep label={translate('name')} {...progressStepProps}>
                    <>
                        <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('nameYourExercise')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={translate('exerciseNameExample')}
                            placeholderTextColor={theme.textSecondary}
                            maxLength={50}
                            onChangeText={setName}
                            value={name}
                        />
                        <Text style={[styles.text, { color: theme.textPrimary }]}>{translate('noteOptional')}</Text>
                        <TextInput
                            style={[styles.input, styles.noteInput]}
                            placeholder={translate('notePlaceholder')}
                            placeholderTextColor={theme.textSecondary}
                            maxLength={100}
                            multiline={true}
                            onChangeText={setNote}
                            value={note}
                        />
                        <Text style={styles.characterCount}>{note.length}/100 {translate('characters')}</Text>
                        {navigationButtons(1, saveExercise, translate('save'), isSaving)}
                    </>
                </ProgressStep>
            </ProgressSteps>
            <Modal
                isVisible={isModalVisible}
                text={translate('fillAllFields')}
                twoButtons={false}
                buttonOneText={translate('ok')}
                buttonOneOnPress={() => setIsModalVisible(false)}
            />
        </Container>
    )
}