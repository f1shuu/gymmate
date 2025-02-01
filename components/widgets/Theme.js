import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../../providers/ThemeProvider';

export default function Theme({ name, primaryColor, secondaryColor, textColor, onPress }) {
    const { theme, toggleTheme } = useTheme();

    const styles = {
        tile: {
            width: '30%',
            alignItems: "center",
            justifyContent: "center",
            height: 180,
            margin: 5,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.tertiary
        },
        gradient: {
            width: '100%',
            height: '100%',
            borderRadius: 15,
            justifyContent: 'flex-end',
            alignItems: 'center'
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: textColor,
            marginBottom: 10
        }
    }

    return (
        <TouchableOpacity style={styles.tile} onPress={onPress}>
            <LinearGradient
                colors={[primaryColor, secondaryColor]}
                start={{ x: 0.5, y: 0 }}
                style={styles.gradient}
                end={{ x: 0.5, y: 0.75 }}
            >
                <Text style={styles.text}>{name}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}
