import { Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../providers/ThemeProvider';

export default function Tool({ name, url, onPress }) {
    const navigation = useNavigation();

    const { theme } = useTheme();

    const styles = {
        widget: {
            flex: 1,
            flexDirection: 'row',
            borderRadius: 15,
            backgroundColor: theme.background,
            marginBottom: 20,
            padding: 10
        },
        image: {
            alignSelf: 'center',
            width: 100,
            height: 100,
            margin: 10
        },
        text: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 20,
            color: theme.textPrimary,
            textAlign: 'center',
            alignSelf: 'center',
            margin: 10
        }
    }

    return (
        <TouchableOpacity onPress={() => { navigation.navigate(onPress) }} style={styles.widget} activeOpacity={0.8}>
            <Image source={url} style={styles.image} resizeMode='cover' />
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}
