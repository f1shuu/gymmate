import { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import IntroNavigator from './screens/intro/IntroNavigator';

import { AchievementProvider } from './helpers/AchievementProvider';
import { setupNotificationHandler } from './helpers/notifications';
import { useSettings } from './helpers/SettingsProvider';

SplashScreen.preventAutoHideAsync();

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const { loadSettings, theme } = useSettings();

    useEffect(() => {
        const loadAppResources = async () => {
            try {
                await Promise.all([
                    Font.loadAsync({ Nexa: require('./assets/fonts/Nexa-Heavy.ttf') }),
                    loadSettings(),
                    setupNotificationHandler(),
                    Asset.loadAsync([
                        require('./assets/images/intro/create-exercises.png'),
                        require('./assets/images/intro/plan-trainings.png'),
                        require('./assets/images/intro/use-tools.png')
                    ])
                ])
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
                await SplashScreen.hideAsync();
            }
        }
        loadAppResources();
    }, [])

    return (
        isLoading ? null : (
            <>
                <StatusBar barStyle={theme.statusBarTheme === 'dark' ? 'dark-content' : 'light-content'} />
                <View style={{ flex: 1, backgroundColor: theme.secondary }}>
                    <AchievementProvider>
                        <IntroNavigator />
                    </AchievementProvider>
                </View>
            </>
        )
    )
}