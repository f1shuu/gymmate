import { Text, TouchableOpacity } from 'react-native';

import Colors from '../../Colors';

export default function SetTimerButton({ active, time, onPress }) {
    return (
        <TouchableOpacity style={[styles.presetInactive, active && styles.presetActive]} onPress={onPress}>
            <Text style={[styles.presetTextInactive, active && styles.presetTextActive]}>{time}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    presetInactive: {
        width: 90,
        height: 90,
        backgroundColor: Colors.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    presetActive: {
        backgroundColor: Colors.primary,
        borderWidth: 2,
        borderColor: Colors.button
    },
    presetTextInactive: {
        fontFamily: 'Nexa',
        fontSize: 20,
        color: Colors.white
    },
    presetTextActive: {
        fontFamily: 'Nexa',
        fontSize: 20,
        color: Colors.white
    }
}