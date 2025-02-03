import { Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../../providers/ThemeProvider';

export default function SetTimerButton({ active, time, onPress }) {
    const { theme } = useTheme();

    const styles = {
        presetInactive: {
            width: 90,
            height: 90,
            backgroundColor: theme.background,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10
        },
        presetActive: {
            borderWidth: 2,
            borderColor: theme.primary
        },
        presetTextInactive: {
            fontFamily: 'Nexa',
            fontSize: 20,
            color: theme.textPrimary
        }
    }

    return (
        <TouchableOpacity style={[styles.presetInactive, active && styles.presetActive]} onPress={onPress}>
            <Text style={[styles.presetTextInactive, active && { color: theme.primary }]}>{time}</Text>
        </TouchableOpacity>
    )
}
