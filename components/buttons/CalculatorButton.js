import { Text, Image, TouchableOpacity } from 'react-native';

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
                <Image
                    source={require('../../assets/images/tools/calculator/backspace.png')}
                    style={{ width: 40, height: 40 }}
                />
            ) : (
                <Text style={getStyle()}>{value}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = {
    button: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 15
    },
    delete: {
        fontFamily: 'Nexa',
        fontSize: 36,
        color: Colors.delete
    },
    symbols: {
        fontFamily: 'Nexa',
        fontSize: 36,
        color: Colors.add
    },
    numbers: {
        fontFamily: 'Nexa',
        fontSize: 36,
        color: Colors.button
    }
}