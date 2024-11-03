import { Text, TouchableOpacity } from 'react-native';

import Colors from '../../Colors';

export default function Button({ onPress, text, type }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: (type == 'delete' ? Colors.delete : Colors.button) }]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    button: {
        width: 150,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        alignSelf: 'center'
    },
    text: {
        fontFamily: 'Nexa',
        fontSize: 18,
        color: Colors.white,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
}