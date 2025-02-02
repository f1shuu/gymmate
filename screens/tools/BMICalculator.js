import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Container from '../../components/Container';
import Button from '../../components/buttons/Button';
import { useTheme } from '../../providers/ThemeProvider';

export default function BMICalculator() {
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [bmiResult, setBMIResult] = useState('Tutaj pojawi się wynik');

    const { theme, toggleTheme } = useTheme();

    const [textColor, setTextColor] = useState(theme.textSecondary);


    const navigation = useNavigation();

    const handleClear = () => {
        setHeight();
        setWeight();
        setTextColor(theme.textSecondary);
        setBMIResult('Tutaj pojawi się wynik');
    }

    const handleCalculateBMI = () => {
        if (!(height) || !(weight)) {
            setTextColor(theme.textSecondary);
            setBMIResult('Najpierw uzupełnij wszystkie pola.');
            return;
        } else if (isNaN(height.replace(',', '.')) || isNaN(weight.replace(',', '.')) || height.replace(',', '.') <= 0 || height.replace(',', '.') <= 0) {
            setTextColor(theme.textSecondary);
            setBMIResult('Wprowadzono niepoprawne dane.');
            return;
        } else {
            let result;
            const bmi = weight.replace(',', '.') / ((height.replace(',', '.') / 100) ** 2);
            if (bmi < 18.5) result = 'niedowagę';
            else if (bmi >= 18.5 && bmi <= 25) result = 'prawidłową masę ciała';
            else if (bmi > 25 && bmi <= 30) result = 'nadwagę';
            else if (bmi > 30 && bmi <= 35) result = 'otyłość';
            else result = 'otyłość kliniczną';
            setTextColor(theme.textPrimary);
            setBMIResult(`Twoje BMI wynosi ${bmi.toFixed(2)} i oznacza ${result}.`);
        }
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
        },
        help: {
            fontFamily: 'Nexa',
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 15
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10
        }
    }

    return (
        <Container>
            <View style={styles.resultArea}>
                <Text style={[styles.result, { color: textColor }]}>{bmiResult}</Text>
            </View>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='Wzrost [cm]'
                placeholderTextColor={theme.textSecondary}
                maxLength={6}
                fontSize={16}
                color={theme.textPrimary}
                onChangeText={(text) => setHeight(text)}
                value={height} >
            </TextInput>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='Masa ciała [kg]'
                placeholderTextColor={theme.textSecondary}
                maxLength={6}
                fontSize={16}
                color={theme.textPrimary}
                onChangeText={(text) => setWeight(text)}
                value={weight} >
            </TextInput>
            <TouchableOpacity onPress={() => navigation.navigate('BMIHelp')}>
                <Text style={styles.help}>Czym jest wskaźnik BMI?</Text>
            </TouchableOpacity>
            <View style={styles.row}>
                <Button onPress={() => handleCalculateBMI()} text='Oblicz' />
                <Button onPress={() => handleClear()} text='Wyczyść' type='delete' />
            </View>
        </Container>
    )
}
