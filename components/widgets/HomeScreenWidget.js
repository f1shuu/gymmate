import { Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSettings } from '../../helpers/SettingsProvider';

export default function HomeScreenWidget({ width, textRequired, textOptional, graphics, screen, navigator }) {
    const { theme, translate } = useSettings();

    const navigation = useNavigation();
    const isStatistic = textOptional !== undefined;

    const styles = {
        largeWidget: {
            width: '100%',
            borderRadius: 10,
            height: 150
        },
        gradient: {
            width: '100%',
            height: '100%'
        },
        absoluteText: {
            fontFamily: 'Nexa',
            fontSize: 20,
            color: theme.textPrimary,
            position: 'absolute',
            bottom: 20
        },
        widget: {
            height: 150,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
            justifyContent: 'space-around',
            padding: 15
        },
        text: {
            fontFamily: 'Nexa',
            color: theme.textPrimary,
            textAlign: 'center'
        }
    }

    return (width === '100%' ? (
        <TouchableOpacity onPress={() => navigation.navigate(navigator, { screen: screen })} style={styles.largeWidget} activeOpacity={0.8}>
            <ImageBackground source={graphics} imageStyle={{ borderRadius: 10 }} style={{ alignItems: 'center' }} resizeMode='cover'>
                <LinearGradient
                    colors={['transparent', theme.background]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={[styles.gradient, { borderRadius: 10 }]}
                />
                <Text style={styles.absoluteText}>
                    {translate(textRequired)}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity onPress={isStatistic ? () => { } : () => navigation.navigate(navigator, { screen: screen })} style={[styles.widget, { width: width }]} activeOpacity={isStatistic ? 1 : 0.8}>
            <Icon name={graphics} size={isStatistic ? 40 : 60} color={isStatistic ? theme.primary : theme.tertiary} />
            {isStatistic ? <Text style={[styles.text, { fontSize: 24 }]}>{textOptional}</Text> : null}
            <Text style={[styles.text, isStatistic ? { fontSize: 12 } : { fontSize: 16 }]}>{translate(textRequired)}</Text>
        </TouchableOpacity>
    )
    )
}