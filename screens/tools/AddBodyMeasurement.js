import { Text, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Background from '../../components/Background';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import Button from '../../components/buttons/Button';

export default function AddBodyMeasurement() {
    const [category, setCategory] = useState('Wybierz kategorię...');
    const [value, setValue] = useState(null);
    const [unit, setUnit] = useState('cm');
    const [isFocus, setIsFocus] = useState(false);

    const navigation = useNavigation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const categories = [
        { value: 'Masa ciała' },
        { value: 'Obwód talii' },
        { value: 'Obwód klatki piersiowej' },
        { value: 'Obwód bicepsa' }
    ]

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return (`${day}.${month}.${year} r.`);
    }

    const saveMeasurement = async (category, value, unit) => {
        if (category === 'Wybierz kategorię...' || !value) {
            handleModal();
        } else {
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
        }
    }

    return (
        <Container>
            <Background text={false} />
            <Text style={styles.text}>Kategoria pomiaru</Text>
            <Dropdown
                passedStyle={{ borderBottomLeftRadius: isFocus ? 0 : 15, borderBottomRightRadius: isFocus ? 0 : 15 }}
                data={categories}
                placeholder={isFocus ? '...' : category}
                value={category}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    if (item.value === 'Masa ciała') setUnit('kg');
                    else setUnit('cm');
                    setCategory(item.value);
                    setIsFocus(false);
                }}
            />
            <Text style={styles.text}>Wartość pomiaru w centymetrach</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={Colors.secondary}
                maxLength={3}
                placeholder='Wpisz wartość...'
                keyboardType='numeric'
                onChangeText={(text) => setValue(text)}
            />
            <Text style={styles.reminder}>Data dodania pomiaru zostanie zapisana automatycznie.</Text>
            <Button onPress={() => saveMeasurement(category, value, unit)} text='Zapisz' />
            <Modal isVisible={isModalVisible} text='Najpierw uzupełnij wszystkie pola.' twoButtons={false} buttonOneText='OK' buttonOneOnPress={() => handleModal()} />
        </Container>
    )
}

const styles = ({
    text: {
        fontFamily: 'Nexa',
        fontSize: 18,
        color: Colors.white,
        marginVertical: 10
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
    reminder: {
        fontFamily: 'Nexa',
        fontSize: 12,
        color: Colors.secondary,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10
    }
})