import { Text, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';
import DataController from '../../helpers/dataController';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

import { categories } from '../../constants/categories';

export default function BodyMeasurementsCreator() {
    const [category, setCategory] = useState(null);
    const [value, setValue] = useState(null);
    const [unit, setUnit] = useState('cm');
    const [isFocus, setIsFocus] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { settings, translate } = useSettings();
    const { theme } = useTheme();

    const navigation = useNavigation();

    const changeCategory = (item) => {
        if (item.value === translate('bodyMass')) {
            if (settings.units === 'metric') setUnit('kg');
            else setUnit('lbs')
        }
        else {
            if (settings.units === 'metric') setUnit('cm');
            else setUnit('in.');
        }
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
            <Text style={styles.text}>{translate('bodyMeasurementCategory')}</Text>
            <Dropdown
                passedStyle={{ borderBottomLeftRadius: isFocus ? 0 : 15, borderBottomRightRadius: isFocus ? 0 : 15 }}
                data={categories[settings.language]}
                placeholder={isFocus ? '...' : translate('chooseCategory') + '...'}
                value={category}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => changeCategory(item)}
            />
            <Text style={styles.text}>{translate('bodyMeasurementValue')}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.textSecondary}
                maxLength={6}
                placeholder={translate('enterValue') + '...'}
                keyboardType='numeric'
                onChangeText={(text) => setValue(text)}
            />
            <Text style={styles.reminder}>{translate('unitsReminder')}</Text>
            <Button onPress={category && value ? async () => await DataController.store('bodyMeasurements', null, null, category, navigation, 'BodyMeasurementsScreen', { value, unit }) : () => setIsModalVisible(() => !isModalVisible)} text={translate('save')} />
            <Modal
                isVisible={isModalVisible}
                text={translate('fillAllFields')}
                twoButtons={false}
                buttonOneText={translate('ok')}
                buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
            />
        </Container>
    )
}
