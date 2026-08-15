import { Text, View, ScrollView } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { spotifyPlaylists } from '../../constants/spotifyPlaylists';
import { spotifyPodcasts } from '../../constants/spotifyPodcasts';

import AchievementsWidget from '../../components/widgets/AchievementsWidget';
import Container from '../../components/Container';
import HomeScreenWidget from '../../components/widgets/HomeScreenWidget';
import SpotifyRecommendationWidget from '../../components/widgets/SpotifyRecommendationWidget';
import TrainingCalendarWidget from '../../components/widgets/TrainingCalendarWidget';

import DataController from '../../helpers/dataController';
import { getTrainingTotals } from '../../helpers/trainingCalendar';
import { useSettings } from '../../helpers/SettingsProvider';

export default function HomeScreen() {
    const { theme, translate } = useSettings();
    const [trainingHistory, setTrainingHistory] = useState([]);
    const { trainingsTotal, liftedKgsTotal } = getTrainingTotals(trainingHistory);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            DataController.readDataSet('trainingHistory').then(history => {
                if (isActive) setTrainingHistory(history);
            })
            return () => { isActive = false; };
        }, [])
    )

    const styles = {
        sectionName: {
            fontFamily: 'Nexa',
            fontSize: 14,
            color: theme.textSecondary,
            marginLeft: 15,
            marginVertical: 15
        },
        section: {
            height: 150,
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
}

    return (
        <Container>
            <ScrollView>
                <Text style={styles.sectionName}>{translate('quickStart')}</Text>
                <View style={{ gap: 10 }}>
                    <HomeScreenWidget width={'100%'} textRequired={'startTraining'} graphics={require('../../assets/images/home/training.png')} screen={'TrainingsScreen'} navigator={'TrainingsNavigator'} />
                    <HomeScreenWidget width={'100%'} textRequired={'bodyMeasurementsScreenHeader'} graphics={require('../../assets/images/home/bodyMeasurements.png')} screen={'BodyMeasurementsScreen'} navigator={'BodyMeasurementsNavigator'} />
                </View>

                <Text style={styles.sectionName}>{translate('statistics')}</Text>
                <TrainingCalendarWidget />

                <View style={styles.section}>
                    <HomeScreenWidget width={'48.5%'} textRequired={'trainingsTotal'} textOptional={trainingsTotal} graphics={'dumbbell'} />
                    <HomeScreenWidget width={'48.5%'} textRequired={'liftedKgsTotal'} textOptional={liftedKgsTotal} graphics={'weight-hanging'} />
                </View>

                <Text style={styles.sectionName}>{translate('achievements')}</Text>
                <AchievementsWidget />

                <Text style={styles.sectionName}>{translate('recommendations')}</Text>
                <View style={styles.section}>
                    <SpotifyRecommendationWidget
                        items={spotifyPlaylists}
                        period='day'
                        titleKey='dailyPlaylist'
                    />
                    <SpotifyRecommendationWidget
                        items={spotifyPodcasts}
                        period='week'
                        titleKey='weeklyPodcast'
                    />
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
            </ScrollView>
        </Container>
    )
}