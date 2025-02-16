import { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import NavigationBar from './components/navigators/NavigationBar';
import { SettingsProvider } from './providers/SettingsProvider';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAppResources = async () => {
      try {
        await Font.loadAsync({
          'Nexa': require('./assets/fonts/Nexa-Heavy.ttf')
        })
      } catch (error) {
        console.error(error)
      } finally {
        setTimeout(async () => {
          setIsLoading(false);
          await SplashScreen.hideAsync();
        }, 1000)
      }
    }
    loadAppResources();
  }, [])

  const AppContent = () => {
    const { theme } = useTheme();

    return (
      <>
        <StatusBar backgroundColor={theme.primary} />
        <View style={{ flex: 1 }}>
          <NavigationBar />
        </View>
      </>
    )
  }

  return (
    isLoading ? null : (
      <SettingsProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SettingsProvider>
    )
  )
}