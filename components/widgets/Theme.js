import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/MaterialIcons';

import Colors from '../../Colors';

export default function Theme({ name, primaryColor, secondaryColor, textColor, selected, onPress }) {
    const styles = {
        tile: {
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
            height: 180,
            margin: 5,
            borderRadius: 10
        },
        gradient: {
            width: '100%',
            height: '100%',
            borderRadius: 10,
            justifyContent: 'flex-end',
            alignItems: 'center'
        },
        checkmark: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: textColor,
            marginBottom: 10
        }
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.tile} activeOpacity={0.8}>
            <LinearGradient
                colors={[primaryColor, secondaryColor]}
                start={{ x: 0.5, y: 0 }}
                style={styles.gradient}
                end={{ x: 0.5, y: 0.75 }}
            >
                {selected ? (
                    <View style={styles.checkmark} pointerEvents='none'>
                        <Icon name='check-circle' size={46} color={Colors.green} />
                    </View>
                ) : null}
                <Text style={styles.text}>{name}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}