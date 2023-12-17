import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddBodyMeasurement() {
    const [category, setCategory] = useState('Wybierz kategorię...');
    const [value, setValue] = useState(null);
    const [unit, setUnit] = useState('cm');
    const [isFocus, setIsFocus] = useState(false);

    const navigation = useNavigation();

    const categories = [
        { value: 'Masa ciała' },
        { value: 'Obwód talii' },
        { value: 'Obwód klatki piersiowej' },
        { value: 'Obwód bicepsa' },
    ];

    const handleTextChange = (text) => {
        setValue(text);
    };

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        return (`${day}.${month}.${year} r.`);
    }

    const saveMeasurement = async (category, value, unit) => {
        try {
            const existingData = await AsyncStorage.getItem('data');
            const measurements = existingData ? JSON.parse(existingData) : [];
            const date = getFormattedDate();
            const categoryIndex = measurements.findIndex(entry => entry.category === category);

            if (categoryIndex !== -1) measurements[categoryIndex].data.push({ value, unit, date });
            else measurements.push({ category, data: [{ value, unit, date }] });
            await AsyncStorage.setItem('data', JSON.stringify(measurements, null, 2));
            navigation.navigate('BodyMeasurementsScreen');
        } catch (error) {
            console.error('Error saving measurement: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Wartość pomiaru</Text>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    maxLength={3}
                    keyboardType='numeric'
                    onChangeText={handleTextChange}
                />
                <TextInput
                    style={[styles.input, { width: '20%' }]}
                    value={unit}
                    editable={false}
                />
            </View>
            <Text style={styles.text}>Kategoria pomiaru</Text>
            <View style={styles.row}>
                <Dropdown
                    style={[styles.dropdown, { width: '95%' }]}
                    placeholderStyle={{ color: '#376DEC' }}
                    selectedTextStyle={{ color: '#376DEC' }}
                    data={categories}
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    placeholder={!isFocus ? category : '...'}
                    value={category}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        if (item.value === 'Masa ciała') setUnit('kg')
                        else setUnit('cm')
                        setCategory(item.value);
                        setIsFocus(false);
                    }}
                />
            </View>
            <Text style={styles.reminder}>Data dodania pomiaru zostanie zapisana automatycznie.</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => saveMeasurement(category, value, unit)} style={styles.saveButton}>
                    <LinearGradient colors={['#6430D2', '#376DEC']} style={styles.saveButton}>
                        <Text style={styles.buttonText}>Zapisz</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10
    },
    text: {
        fontFamily: 'msb',
        color: '#376DEC',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: 10
    },
    input: {
        fontFamily: 'msr',
        color: '#376DEC',
        width: '70%',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#E1E1E1',
        borderColor: '#376DEC',
        borderWidth: 1.5,
        borderRadius: 15
    },
    dropdown: {
        backgroundColor: '#E1E1E1',
        width: '20%',
        height: 60,
        borderColor: '#376DEC',
        paddingHorizontal: 10,
        borderColor: '#376DEC',
        borderWidth: 1.5,
        borderRadius: 15
    },
    reminder: {
        fontFamily: 'msr',
        fontSize: 12,
        color: '#BBB',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    button: {
        alignItems: 'center',
    },
    saveButton: {
        width: 150,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 10,
        elevation: 10
    },
    buttonText: {
        fontFamily: 'msb',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});