import { Text, View, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

export default function Setting({ active, name, icon, color, onPress, type, parameter, style }) {
    const { settings, updateSettings } = useSettings();
    const { theme } = useTheme();

    const styles = {
        widget: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.background,
            paddingHorizontal: 20,
            height: 65,
            borderRadius: 15
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 16,
            alignSelf: 'center',
            marginLeft: 16
        }
    }

    const toggleSetting = (newValue) => {
        updateSettings(parameter, newValue);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    return (
        <TouchableOpacity onPress={type === 'toggle' ? () => toggleSetting(!settings[parameter]) : (active ? onPress : () => { })} style={[styles.widget, style]} activeOpacity={0.8} >
            <View style={{ flexDirection: 'row' }}>
                <Icon name={icon} size={30} color={active ? color : theme.tertiary} />
                <Text style={[styles.text, { color: active ? color : theme.tertiary }]}>{name}</Text>
            </View>
            {type === 'toggle' ? (
                <Switch
                    trackColor={{ false: theme.tertiary, true: theme.tertiary }}
                    thumbColor={settings[parameter] ? theme.primary : theme.textHeader}
                    onValueChange={toggleSetting}
                    value={settings[parameter]}
                />
            ) : type === 'navigate' ? (
                <Icon name='keyboard-arrow-right' size={24} color={active ? color : theme.tertiary} />
            ) : type === 'check' ? (
                <Icon name='check' size={32} color={Colors.green} />
            ) : null}
        </TouchableOpacity>
    )
}
