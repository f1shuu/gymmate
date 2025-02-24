import { Text, TouchableOpacity } from 'react-native';

import Colors from '../../Colors';

import { useSettings } from '../../helpers/SettingsProvider';

export default function Button({ onPress, text, type }) {
    const { theme } = useSettings();

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
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: (type == 'delete' ? Colors.red : theme.primary) }]} activeOpacity={0.8}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}
