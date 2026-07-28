import { Text, TouchableOpacity } from 'react-native';

import Colors from '../../Colors';

import { useSettings } from '../../helpers/SettingsProvider';

export default function Button({ onPress, text, type }) {
    const { theme } = useSettings();

    const styles = {
        button: {
            flex: 1,
            minWidth: 150,
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flex: type === 'small' ? 0 : 1,
            alignSelf: type === 'small' ? 'center' : 'stretch',
            backgroundColor: type === 'delete' ? Colors.red : theme.primary,
            marginTop: type === 'small' ? 15 : 0
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
        <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}