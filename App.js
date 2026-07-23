import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Loader from './Loader';

import { SettingsProvider } from './helpers/SettingsProvider';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider>
        <Loader />
      </SettingsProvider>
    </GestureHandlerRootView>
  )
}