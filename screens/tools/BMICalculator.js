import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function BMICalculator() {
    const navigation = useNavigation();

    const navigateToHelp = () => {
        navigation.navigate('BMIHelp');
    }

    const [age, setAge] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [bmiResult, setBMIResult] = useState();

    const handleCalculateBMI = () => {
        if (isNaN(height) || isNaN(weight) || height === '' || weight === '') {
            setBMIResult('Najpierw uzupełnij wszystkie pola');
            return;
        } else if (height <= 0 || weight <= 0) {
            setBMIResult('Wprowadzono niepoprawne dane');
            return;
        } else {
            let result;
            const bmi = weight / ((height / 100) ** 2);
            if (bmi < 18.5) {
                result = 'niedowagę'
            } else if (bmi >= 18.5 && bmi <= 25) {
                result = 'prawidłową masę ciała'
            } else if (bmi > 25 && bmi <= 30) {
                result = 'nadwagę'
            } else if (bmi > 30 && bmi <= 35) {
                result = 'otyłość'
            } else result = 'otyłość kliniczną'

            setBMIResult(`Twoje BMI wynosi ${bmi.toFixed(2)} i oznacza ${result}.`);
        }
    }

    const handleClear = () => {
        setAge();
        setHeight();
        setWeight();
        setBMIResult();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.result}>{bmiResult}</Text>
            <TextInput
                style={styles.input}
                placeholder={'Wiek'}
                placeholderTextColor={'#BBBBBB'}
                maxLength={3}
                cursorColor='#386DEC'
                fontSize={16}
                onChangeText={(text) => setAge(text)}
                value={age} >
            </TextInput>
            <TextInput
                style={styles.input}
                placeholder={'Wzrost [cm]'}
                placeholderTextColor={'#BBBBBB'}
                maxLength={3}
                cursorColor='#386DEC'
                fontSize={16}
                onChangeText={(text) => setHeight(text)}
                value={height} >
            </TextInput>
            <TextInput
                style={styles.input}
                placeholder={'Masa ciała [kg]'}
                placeholderTextColor={'#BBBBBB'}
                maxLength={3}
                cursorColor='#386DEC'
                fontSize={16}
                onChangeText={(text) => setWeight(text)}
                value={weight} >
            </TextInput>
            <TouchableOpacity onPress={navigateToHelp}>
                <Text style={styles.help}>Czym jest wskaźnik BMI?</Text>
            </TouchableOpacity>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => handleCalculateBMI()}>
                    <View style={styles.calculateButton}>
                        <Text style={styles.text}>Oblicz</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClear()}>
                    <View style={styles.clearButton}>
                        <Text style={styles.text}>Wyczyść</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141414',
        flex: 1
    },
    result: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '95%',
        backgroundColor: '#2B2B2B',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    calculateButton: {
        width: 150,
        height: 60,
        backgroundColor: '#5AFF98',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10
    },
    clearButton: {
        width: 150,
        height: 60,
        backgroundColor: '#FD5056',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    help: {
        color: '#BBBBBB',
        textAlign: 'center',
        marginTop: 15
    }
})