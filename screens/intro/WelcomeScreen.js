import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

import appConfig from '../../app.config';
import Colors from '../../Colors';
import { useSettings } from '../../helpers/SettingsProvider';

export default function WelcomeScreen() {
    const { theme, translate, updateSettings } = useSettings();

    const navigation = useNavigation();

    const styles = {
        backgroundImage: {
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end'
        },
        logo: {
            position: 'absolute',
            top: 75,
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 20,
        },
        text: {
            fontFamily: 'Nexa',
            color: Colors.white
        },
        gradient: {
            width: '100%',
            height: '40%'
        },
        button: {
            position: 'absolute',
            bottom: 35,
            width: '75%',
            height: 60,
            backgroundColor: theme.primary,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
        }
    }

    const proceed = () => {
        updateSettings({ 'firstLaunch': false });
        navigation.navigate('NavigationBar', { screen: 'HomeNavigator' });
    }

    return (
        <>
            <ImageBackground source={require('../../assets/images/intro/welcome.png')} style={styles.backgroundImage}>
                <View style={styles.logo}>
                    <Icon name='dumbbell' size={65} color={Colors.white} />
                    <Text style={[styles.text, { fontSize: 36 }]}>{appConfig.expo.name}</Text>
                </View>
                <LinearGradient
                    colors={['transparent', Colors.black]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.7 }}
                    style={styles.gradient}
                />
                <TouchableOpacity onPress={() => proceed()} style={styles.button} activeOpacity={0.8}>
                    <Text style={[styles.text, { fontSize: 20 }]}>{translate('begin')}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </>
    )
}
