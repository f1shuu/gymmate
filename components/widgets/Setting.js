import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';

export default Setting = ({ active, name, icon, color, onPress, style }) => {
    return (
        <TouchableOpacity onPress={active ? onPress : () => { }} style={[styles.widget, style]} activeOpacity={active ? 0.8 : 0.8}>
            <Icon name={icon} size={30} color={active ? color : Colors.secondary} />
            <Text style={[styles.text, { color: (active ? color : Colors.secondary) }]}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    widget: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        padding: 20,
        borderRadius: 15
    },
    text: {
        fontFamily: 'Nexa',
        fontSize: 18,
        alignSelf: 'center',
        marginLeft: 16
    }
}