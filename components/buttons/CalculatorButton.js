import { Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';

export default function CalculatorButton({ type, value, onPress }) {
    const getStyle = () => {
        switch (type) {
            case 'delete':
                return styles.delete;
            case 'symbols':
                return styles.symbols;
            case 'numbers':
                return styles.numbers;
            default:
                return styles.numbers;
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            {type === 'backspace' ? (
                <Icon name='backspace' size={40} color={Colors.primary} />
            ) : (
                <Text style={getStyle()}>{value}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = {
    button: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 15
    },
    delete: {
        fontFamily: 'Nexa',
        fontSize: 36,
        color: Colors.red
    },
    symbols: {
        fontFamily: 'Nexa',
        fontSize: 36,
        color: Colors.green
    },
    numbers: {
        fontFamily: 'Nexa',
        fontSize: 36,
        color: Colors.primary
    }
}