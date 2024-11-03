import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Button from '../../components/buttons/Button';

export default function BMICalculator() {
    const navigation = useNavigation();

    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [bmiResult, setBMIResult] = useState('Tutaj pojawi się wynik');
    const [textColor, setTextColor] = useState(Colors.secondary);

    const handleClear = () => {
        setHeight();
        setWeight();
        setTextColor(Colors.secondary);
        setBMIResult('Tutaj pojawi się wynik');
    }

    const handleCalculateBMI = () => {
        let formattedHeight = height.replace(',', '.'), formattedWeight = weight.replace(',', '.');
        if (isNaN(formattedHeight) || isNaN(formattedWeight) || formattedHeight === '' || formattedWeight === '') {
            console.log('wzrost: ' + formattedHeight + ' masa: ' + formattedWeight);
            setBMIResult('Najpierw uzupełnij wszystkie pola.');
            return;
        } else if (formattedHeight <= 0 || formattedWeight <= 0) {
            setBMIResult('Wprowadzono niepoprawne dane.');
            return;
        } else {
            let result;
            const bmi = formattedWeight / ((formattedHeight / 100) ** 2);
            if (bmi < 18.5) {
                result = 'niedowagę';
            } else if (bmi >= 18.5 && bmi <= 25) {
                result = 'prawidłową masę ciała';
            } else if (bmi > 25 && bmi <= 30) {
                result = 'nadwagę';
            } else if (bmi > 30 && bmi <= 35) {
                result = 'otyłość';
            } else result = 'otyłość kliniczną';
            setTextColor(Colors.white);
            setBMIResult(`Twoje BMI wynosi ${bmi.toFixed(2)} i oznacza ${result}.`);
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
                placeholderTextColor={Colors.secondary}
                maxLength={6}
                fontSize={16}
                color={Colors.white}
                onChangeText={(text) => setHeight(text)}
                value={height} >
            </TextInput>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='Masa ciała [kg]'
                placeholderTextColor={Colors.secondary}
                maxLength={6}
                fontSize={16}
                color={Colors.white}
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

const styles = ({
    resultArea: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    result: {
        fontFamily: 'Nexa',
        fontSize: 20,
        color: Colors.secondary,
        textAlign: 'center'
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
    },
    help: {
        fontFamily: 'Nexa',
        color: Colors.secondary,
        textAlign: 'center',
        marginTop: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    }
})