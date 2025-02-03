import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';

import { useTheme } from '../../providers/ThemeProvider';

export default function CalculatorButton({ type, value, onPress }) {
    const { theme } = useTheme();

    const styles = {
        button: {
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
            borderRadius: 15
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
        <TouchableOpacity style={styles.button} onPress={onPress}>
            {type === 'backspace' ? (
                <Icon name='backspace' size={40} color={theme.primary} />
            ) : (
                <Text style={getStyle()}>{value}</Text>
            )}
        </TouchableOpacity>
    )
}
