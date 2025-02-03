import { Text, TouchableOpacity } from 'react-native';

import Colors from '../../Colors';

import { useTheme } from '../../providers/ThemeProvider';

export default function Button({ onPress, text, type }) {
    const { theme } = useTheme();

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
            color: theme.textHeader,
            textAlign: 'center',
            textAlignVertical: 'center'
        }
    }

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: (type == 'delete' ? Colors.red : theme.primary) }]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}
