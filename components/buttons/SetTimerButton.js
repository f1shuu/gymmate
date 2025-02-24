import { Text, TouchableOpacity } from 'react-native';

import { useSettings } from '../../helpers/SettingsProvider';

export default function SetTimerButton({ active, time, onPress }) {
    const { theme } = useSettings();

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
        <TouchableOpacity onPress={onPress} style={[styles.presetInactive, active && styles.presetActive]} activeOpacity={0.8}>
            <Text style={[styles.presetTextInactive, active && { color: theme.primary }]}>{time}</Text>
        </TouchableOpacity>
    )
}
