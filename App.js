import * as Font from 'expo-font';
import { View } from 'react-native';
import { useEffect, useState } from 'react';

import Colors from './Colors';
import NavigationBar from './components/navigators/NavigationBar';
import { ThemeProvider } from './providers/ThemeProvider';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Nexa': require('./assets/fonts/Nexa-Heavy.ttf')
      })
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    }
    loadFonts();
  }, [])

  return (
    <>
      {isLoading ? (
        <View />
      ) : (
        <ThemeProvider>
          <View style={{ flex: 1, backgroundColor: Colors.black }}>
            <NavigationBar />
          </View>
        </ThemeProvider>
      )}
    </>
  )
}