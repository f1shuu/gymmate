import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

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
        let formattedHeight = height.replace(',', '.'), formattedWeight = weight.replace(',', '.');
        if (isNaN(formattedHeight) || isNaN(formattedWeight) || formattedHeight === '' || formattedWeight === '') {
            console.log('wzrost: ' + formattedHeight + ' masa: ' + formattedWeight)
            setBMIResult('Najpierw uzupełnij wszystkie pola.');
            return;
        } else if (formattedHeight <= 0 || formattedWeight <= 0) {
            setBMIResult('Wprowadzono niepoprawne dane.');
            return;
        } else {
            let result;
            const bmi = formattedWeight / ((formattedHeight / 100) ** 2);
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
                keyboardType='numeric'
                placeholder={'Wiek'}
                placeholderTextColor={'#AAA'}
                maxLength={3}
                cursorColor='#386DEC'
                fontSize={16}
                color='#376DEC'
                onChangeText={(text) => setAge(text)}
                value={age} >
            </TextInput>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder={'Wzrost [cm]'}
                placeholderTextColor={'#AAA'}
                maxLength={6}
                cursorColor='#386DEC'
                fontSize={16}
                color='#376DEC'
                onChangeText={(text) => setHeight(text)}
                value={height} >
            </TextInput>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder={'Masa ciała [kg]'}
                placeholderTextColor={'#AAA'}
                maxLength={6}
                cursorColor='#386DEC'
                fontSize={16}
                color='#376DEC'
                onChangeText={(text) => setWeight(text)}
                value={weight} >
            </TextInput>
            <TouchableOpacity onPress={navigateToHelp}>
                <Text style={styles.help}>Czym jest wskaźnik BMI?</Text>
            </TouchableOpacity>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => handleCalculateBMI()} style={styles.button}>
                    <LinearGradient
                        colors={['#6430D2', '#376DEC']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Oblicz</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClear()} style={styles.button}>
                    <LinearGradient
                        colors={['#6430D2', '#376DEC']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Wyczyść</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        flex: 1
    },
    result: {
        fontFamily: 'msb',
        color: '#376DEC',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5
    },
    input: {
        fontFamily: 'msr',
        color: '#376DEC',
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '95%',
        backgroundColor: '#E1E1E1',
        borderColor: '#376DEC',
        borderWidth: 1.5,
        borderRadius: 15,
        marginTop: 10,
        marginHorizontal: 10,
        elevation: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    button: {
        width: 150,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 10,
        elevation: 10
    },
    text: {
        color: 'white',
        fontFamily: 'msb',
        fontSize: 16,
    },
    help: {
        fontFamily: 'msr',
        color: '#BBB',
        textAlign: 'center',
        marginTop: 15
    }
})