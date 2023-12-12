import { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import useFonts from './hooks/useFonts';
import NavigationBar from './components/navigators/NavigationBar';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await useFonts();
      await SplashScreen.hideAsync();
      setIsReady(true);
    };
    loadFonts();
  }, []);
  if (!isReady) return <View />;
  return <NavigationBar />;
}
