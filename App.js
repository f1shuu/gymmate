import { View } from 'react-native';
import { useEffect, useState } from 'react';
import useFonts from './hooks/useFonts';

import NavigationBar from './components/navigators/NavigationBar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      await useFonts({
        'msb': require('./assets/fonts/Mona-Sans-Bold.ttf'),
        'msr': require('./assets/fonts/Mona-Sans-Regular.ttf'),
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    loadFonts();
  }, []);

  return (
    <>
      {isLoading ? (
        <View />
      ) : (
        <NavigationBar />
      )}
    </>
  );
}
