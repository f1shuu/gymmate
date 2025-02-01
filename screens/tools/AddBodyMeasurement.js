import { Text, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import { useTheme } from '../../providers/ThemeProvider';

import { categories } from '../../constants/categories';

export default function AddBodyMeasurement() {
    const [category, setCategory] = useState(null);
    const [value, setValue] = useState(null);
    const [unit, setUnit] = useState('cm');
    const [isFocus, setIsFocus] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { theme, toggleTheme } = useTheme();

    const navigation = useNavigation();

    const changeCategory = (item) => {
        if (item.value === 'Masa ciała') setUnit('kg');
        else setUnit('cm');
        setCategory(item.value);
        setIsFocus(false);
    }

    const styles = {
        text: {
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.textPrimary,
            marginVertical: 10
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
        reminder: {
            fontFamily: 'Nexa',
            fontSize: 12,
            color: theme.tertiary,
            textAlign: 'center',
            marginTop: 5,
            marginBottom: 10
        }
    }

    return (
        <Container>
            <Text style={styles.text}>Kategoria pomiaru</Text>
            <Dropdown
                passedStyle={{ borderBottomLeftRadius: isFocus ? 0 : 15, borderBottomRightRadius: isFocus ? 0 : 15 }}
                data={categories}
                placeholder={isFocus ? '...' : 'Wybierz kategorię...'}
                value={category}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => changeCategory(item)}
            />
            <Text style={styles.text}>Wartość pomiaru</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.textSecondary}
                maxLength={3}
                placeholder='Wpisz wartość...'
                keyboardType='numeric'
                onChangeText={(text) => setValue(text)}
            />
            <Text style={styles.reminder}>Jednostka wartości pomiaru zostanie dodana automatycznie.</Text>
            <Button onPress={category && value ? async () => await DataController.store('bodyMeasurements', null, null, category, navigation, 'BodyMeasurementsScreen', { value, unit }) : () => setIsModalVisible(() => !isModalVisible)} text='Zapisz' />
            <Modal
                isVisible={isModalVisible}
                text='Najpierw uzupełnij wszystkie pola.'
                twoButtons={false}
                buttonOneText='OK'
                buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
            />
        </Container>
    )
}
