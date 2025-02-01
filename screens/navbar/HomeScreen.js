import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../../components/Container';
import { useTheme } from '../../providers/ThemeProvider';

export default function HomeScreen() {
    const { theme, toggleTheme } = useTheme();

    const navigation = useNavigation();

    const styles = {
        widget: {
            height: '25%',
            backgroundColor: theme.background,
            borderRadius: 15
        },
        map: {
            width: '100%',
            height: '65%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        },
        marker: {
            position: 'absolute',
            top: '8%',
            left: '15.5%',
            width: 75,
            height: 75
        },
        textbox: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 20,
            color: theme.textPrimary
        }
    }

    return (
        <Container gradient={0.75}>
            <TouchableOpacity onPress={() => { navigation.navigate('Map') }} style={styles.widget} activeOpacity={0.8}>
                <Image source={require('../../assets/images/map.png')} style={styles.map} resizeMode='cover' />
                <Image source={require('../../assets/images/gymMarker.png')} style={styles.marker} />
                <View style={styles.textbox}>
                    <Text style={styles.text}>Znajdź siłownie w pobliżu</Text>
                </View>
            </TouchableOpacity>
        </Container>
    )
}
