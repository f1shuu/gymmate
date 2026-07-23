import { Text, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import Colors from '../../Colors';

import { useSettings } from '../../helpers/SettingsProvider';

export default function CalculatorButton({ type, value, onPress }) {
    const { theme } = useSettings();

    const styles = {
        button: {
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
            borderRadius: 10
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 36,
        }
    }

    const getStyle = () => {
        switch (type) {
            case 'delete':
                return [styles.text, { color: Colors.red }];
            case 'symbols':
                return [styles.text, { color: Colors.green }];
            case 'numbers':
                return [styles.text, { color: theme.primary }];
            default:
                return styles.numbers;
        }
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
            {type === 'backspace' ? (
                <Icon name='backspace' size={40} color={theme.primary} />
            ) : (
                <Text style={getStyle()}>{value}</Text>
            )}
        </TouchableOpacity>
    )
}
