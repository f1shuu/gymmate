import { Text, View, TouchableOpacity, Switch } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';

import { useSettings } from '../../helpers/SettingsProvider';

export default function Setting({ name, icon, color, onPress, type, parameter, style }) {
    const { settings, theme, updateSettings } = useSettings();

    const styles = {
        widget: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.background,
            paddingHorizontal: 20,
            height: 65,
            borderRadius: 10
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 16,
            alignSelf: 'center',
            marginLeft: 16
        }
    }

    const toggleSetting = (newValue) => {
        updateSettings({ [parameter]: newValue });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    return (
        <TouchableOpacity onPress={type === 'toggle' ? () => toggleSetting(!settings[parameter]) : onPress} style={[styles.widget, style]} activeOpacity={0.8} >
            <View style={{ flexDirection: 'row' }}>
                <Icon name={icon} size={30} color={color} />
                <Text style={[styles.text, { color }]}>{name}</Text>
            </View>
            {type === 'toggle' ? (
                <Switch
                    trackColor={{ false: theme.tertiary, true: theme.tertiary }}
                    thumbColor={settings[parameter] ? theme.primary : theme.textHeader}
                    onValueChange={toggleSetting}
                    value={settings[parameter]}
                />
            ) : type === 'navigate' ? (
                <Icon name='keyboard-arrow-right' size={24} color={color} />
            ) : type === 'check' ? (
                <Icon name='check' size={32} color={Colors.green} />
            ) : null}
        </TouchableOpacity>
    )
}
