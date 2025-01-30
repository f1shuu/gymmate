import { Text, View, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';

export default Setting = ({ active, name, icon, color, onPress, toggle, isEnabled, toggleSwitch, style }) => {
    return (
        <TouchableOpacity onPress={active ? onPress : () => { }} style={[styles.widget, style]} activeOpacity={active ? 0.8 : 0.8}>
            <View style={{ flexDirection: 'row' }}>
                <Icon name={icon} size={30} color={active ? color : Colors.secondary} />
                <Text style={[styles.text, { color: (active ? color : Colors.secondary) }]}>{name}</Text>
            </View>
            {toggle ? (
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            ) : (
                <Icon name='keyboard-arrow-right' size={24} color={active ? color : Colors.secondary} />
            )}
        </TouchableOpacity>
    )
}

const styles = {
    widget: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.background,
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