import { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import IntroNavigator from './screens/intro/IntroNavigator';

import { useSettings } from './providers/SettingsProvider';
import { useTheme } from './providers/ThemeProvider';

SplashScreen.preventAutoHideAsync();

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const { loadSettings } = useSettings();
    const { theme } = useTheme();

    useEffect(() => {
        const loadAppResources = async () => {
            try {
                await Font.loadAsync({
                    'Nexa': require('./assets/fonts/Nexa-Heavy.ttf')
                })
                loadSettings();
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(async () => {
                    setIsLoading(false);
                    await SplashScreen.hideAsync();
                }, 1000)
            }
        }
        loadAppResources();
    }, [])

    return (
        isLoading ? null : (
            <>
                <StatusBar backgroundColor={theme.primary} />
                <View style={{ flex: 1 }}>
                    <IntroNavigator />
                </View>
            </>
        )
    )
}