import { Text, View, ImageBackground, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useSettings } from '../../helpers/SettingsProvider';

import HomeScreenWidget from '../../components/widgets/HomeScreenWidget';

export default function HomeScreen() {
    const { theme, translate } = useSettings();

    const styles = {
        scrollview: {
            flexGrow: 1,
            backgroundColor: theme.secondary,
            paddingBottom: 30
        },
        gradient: {
            width: '100%',
            height: '100%'
        },
        container: {
            flex: 1,
            marginTop: -30,
            paddingHorizontal: 15,
            backgroundColor: theme.secondary
        },
        sectionName: {
            fontFamily: 'Nexa',
            fontSize: 14,
            color: theme.textSecondary,
            marginLeft: 15,
            marginBottom: 15
        },
        section: {
            height: 150,
            backgroundColor: theme.secondary,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
            <View style={{ height: 300 }}>
                <ImageBackground source={require('../../assets/images/home/start.png')} >
                    <LinearGradient
                        colors={[theme.primary, 'transparent', 'transparent', theme.secondary]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 0.85 }}
                        style={styles.gradient}
                    />
                </ImageBackground>
            </View>
            <View style={styles.container}>
                <Text style={styles.sectionName}>{translate('statistics')}</Text>
                <View style={styles.section}>
                    <HomeScreenWidget width={'30%'} textRequired={'longestStreak'} textOptional={'2 dni'} graphics={'fire'} />
                    <HomeScreenWidget width={'30%'} textRequired={'trainingsTotal'} textOptional={'69'} graphics={'dumbbell'} />
                    <HomeScreenWidget width={'30%'} textRequired={'liftedKgsTotal'} textOptional={'2137'} graphics={'weight-hanging'} />
                </View>
                <Text style={styles.sectionName}>{translate('quickStart')}</Text>
                <View style={styles.section}>
                    <HomeScreenWidget width={'100%'} textRequired={'startATraining'} graphics={require('../../assets/images/home/training.png')} screen={'TrainingsScreen'} navigator={'TrainingsNavigator'} />
                </View>
                <View style={styles.section}>
                    <HomeScreenWidget width={'100%'} textRequired={'bodyMeasurementsScreenHeader'} graphics={require('../../assets/images/home/bodyMeasurements.png')} screen={'BodyMeasurementsScreen'} navigator={'BodyMeasurementsNavigator'} />
                </View>
                <Text style={styles.sectionName}>{translate('toolsScreenHeader')}</Text>
                <View style={[styles.section, { marginBottom: 10 }]}>
                    <HomeScreenWidget width={'49%'} textRequired={'timer'} graphics={'clock'} screen={'TimerScreen'} navigator={'ToolsNavigator'} />
                    <HomeScreenWidget width={'49%'} textRequired={'bmiCalculator'} graphics={'weight'} screen={'BMICalculatorScreen'} navigator={'ToolsNavigator'} />
                </View>
                <View style={styles.section}>
                    <HomeScreenWidget width={'49%'} textRequired={'calculator'} graphics={'calculator'} screen={'CalculatorScreen'} navigator={'ToolsNavigator'} />
                    <HomeScreenWidget width={'49%'} textRequired={'gymsNearby'} graphics={'map-marker-alt'} screen={'MapScreen'} navigator={'ToolsNavigator'} />
                </View>
            </View>
        </ScrollView>
    )
}
