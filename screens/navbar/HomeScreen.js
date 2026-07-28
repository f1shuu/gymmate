import { Text, View, ImageBackground, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreenWidget from '../../components/widgets/HomeScreenWidget';

import { useSettings } from '../../helpers/SettingsProvider';

export default function HomeScreen() {
    const { settings, theme, translate } = useSettings();

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
            marginVertical: 15
        },
        section: {
            height: 150,
            backgroundColor: theme.secondary,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
            <View style={{ height: 270 }}>
                <ImageBackground source={require('../../assets/images/home/start.png')}>
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
                    <HomeScreenWidget width={'48.5%'} textRequired={'trainingsTotal'} textOptional={settings.trainingsTotal} graphics={'dumbbell'} />
                    <HomeScreenWidget width={'48.5%'} textRequired={'liftedKgsTotal'} textOptional={settings.liftedKgsTotal} graphics={'weight-hanging'} />
                </View>
                <Text style={styles.sectionName}>{translate('quickStart')}</Text>
                <View style={styles.section}>
                    <HomeScreenWidget width={'100%'} textRequired={'startTraining'} graphics={require('../../assets/images/home/training.png')} screen={'TrainingsScreen'} navigator={'TrainingsNavigator'} />
                </View>
                <View style={styles.section}>
                    <HomeScreenWidget width={'100%'} textRequired={'bodyMeasurementsScreenHeader'} graphics={require('../../assets/images/home/bodyMeasurements.png')} screen={'BodyMeasurementsScreen'} navigator={'BodyMeasurementsNavigator'} />
                </View>
                <Text style={styles.sectionName}>{translate('toolsScreenHeader')}</Text>
                <View style={[styles.section, { marginBottom: 10 }]}>
                    <HomeScreenWidget width={'48.5%'} textRequired={'timer'} graphics={'clock'} screen={'TimerScreen'} navigator={'ToolsNavigator'} />
                    <HomeScreenWidget width={'48.5%'} textRequired={'bmiCalculator'} graphics={'weight'} screen={'BMICalculatorScreen'} navigator={'ToolsNavigator'} />
                </View>
                <View style={styles.section}>
                    <HomeScreenWidget width={'48.5%'} textRequired={'calculator'} graphics={'calculator'} screen={'CalculatorScreen'} navigator={'ToolsNavigator'} />
                    <HomeScreenWidget width={'48.5%'} textRequired={'stopwatch'} graphics={'stopwatch'} screen={'StopwatchScreen'} navigator={'ToolsNavigator'} />
                </View>
            </View>
        </ScrollView>
    )
}