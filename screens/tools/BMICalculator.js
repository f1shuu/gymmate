import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import Container from '../../components/Container';
import Button from '../../components/buttons/Button';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

export default function BMICalculator() {
    const [centimeters, setCentimeters] = useState();
    const [feet, setFeet] = useState();
    const [inches, setInches] = useState();
    const [weight, setWeight] = useState();

    const { settings, translate } = useSettings();
    const { theme } = useTheme();

    const [bmiResult, setBMIResult] = useState(translate('result'));

    const [textColor, setTextColor] = useState(theme.textSecondary);

    const navigation = useNavigation();

    const handleClear = () => {
        setCentimeters();
        setFeet();
        setInches();
        setWeight();
        setTextColor(theme.textSecondary);
        setBMIResult(translate('result'));
    }

    const calculateBMIForMetric = () => {
        if (!centimeters || !weight) {
            if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error);
            setTextColor(theme.textSecondary);
            setBMIResult(translate('fillAllFields'));
            return;
        } else if (isNaN(centimeters.replace(',', '.')) || isNaN(weight.replace(',', '.')) || centimeters.replace(',', '.') <= 0 || weight.replace(',', '.') <= 0) {
            setTextColor(theme.textSecondary);
            setBMIResult(translate('incorrectData'));
            return;
        } else {
            const bmi = weight.replace(',', '.') / ((centimeters.replace(',', '.') / 100) ** 2);
            setTextColor(theme.textPrimary);
            setBMIResult(translate('bmiResult') + bmi.toFixed(2) + translate('andMeans') + getBMIResult(bmi) + '.');
        }
    }

    const calculateBMIForImperial = () => {
        if (!feet || !inches || !weight) {
            if (settings.isHapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error);
            setTextColor(theme.textSecondary);
            setBMIResult(translate('fillAllFields'));
            return;
        } else if (isNaN(feet) || isNaN(inches) || isNaN(weight.replace(',', '.')) || feet <= 0 || inches < 0 || weight.replace(',', '.') <= 0) {
            setTextColor(theme.textSecondary);
            setBMIResult(translate('incorrectData'));
            return;
        } else {
            const bmi = (weight * 0.45359237).toFixed(2) / (((feet * 30.48 + inches * 2.54).toFixed(2) / 100) ** 2);
            setTextColor(theme.textPrimary);
            setBMIResult(translate('bmiResult') + bmi.toFixed(2) + translate('andMeans') + getBMIResult(bmi) + '.');
        }
    }

    const getBMIResult = (bmi) => {
        let result;
        if (bmi < 18.5) result = translate('underweight');
        else if (bmi >= 18.5 && bmi <= 25) result = translate('normalWeight');
        else if (bmi > 25 && bmi <= 30) result = translate('overweight');
        else if (bmi > 30 && bmi <= 35) result = translate('obesity');
        else result = translate('clinicalObesity');
        return result;
    }

    const styles = {
        resultArea: {
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10
        },
        result: {
            fontFamily: 'Nexa',
            fontSize: 20,
            color: theme.textSecondary,
            textAlign: 'center'
        },
        inputRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 25
        },
        input: {
            backgroundColor: theme.background,
            height: 60,
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary,
            borderRadius: 15,
            padding: 15,
            marginVertical: 10
        },
        help: {
            fontFamily: 'Nexa',
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 15
        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15
        }
    }

    return (
        <Container gradient={0.75}>
            <View style={styles.resultArea}>
                <Text style={[styles.result, { color: textColor }]}>{bmiResult}</Text>
            </View>
            {settings.units === 'metric' ? (
                <TextInput
                    style={[styles.input, { width: '100%' }]}
                    keyboardType='numeric'
                    placeholder={translate('height') + ' [cm]'}
                    placeholderTextColor={theme.textSecondary}
                    maxLength={6}
                    fontSize={16}
                    color={theme.textPrimary}
                    onChangeText={(text) => setCentimeters(text)}
                    value={centimeters} >
                </TextInput>
            ) : (
                <View style={styles.inputRow}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        keyboardType='numeric'
                        placeholder={translate('height') + ' [ft]'}
                        placeholderTextColor={theme.textSecondary}
                        maxLength={1}
                        fontSize={16}
                        color={theme.textPrimary}
                        onChangeText={(text) => setFeet(text)}
                        value={feet} >
                    </TextInput>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        keyboardType='numeric'
                        placeholder={translate('height') + ' [in]'}
                        placeholderTextColor={theme.textSecondary}
                        maxLength={2}
                        fontSize={16}
                        color={theme.textPrimary}
                        onChangeText={(text) => setInches(text)}
                        value={inches} >
                    </TextInput>
                </View>)}
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder={translate('bodyMass') + ` [${settings.units === 'metric' ? 'kg' : 'lbs'}]`}
                placeholderTextColor={theme.textSecondary}
                maxLength={6}
                fontSize={16}
                color={theme.textPrimary}
                onChangeText={(text) => setWeight(text)}
                value={weight} >
            </TextInput>
            <TouchableOpacity onPress={() => navigation.navigate('BMIHelp')}>
                <Text style={styles.help}>{translate('bmiHelp')}</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
                <Button onPress={settings.units === 'metric' ? () => calculateBMIForMetric() : () => calculateBMIForImperial()} text={translate('calculate')} />
                <Button onPress={() => handleClear()} text={translate('clear')} type={translate('delete')} />
            </View>
        </Container>
    )
}
