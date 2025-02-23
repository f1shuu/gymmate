import Loader from './Loader';

import { SettingsProvider } from './providers/SettingsProvider';
import { ThemeProvider } from './providers/ThemeProvider';

export default function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <Loader />
      </ThemeProvider>
    </SettingsProvider>
  )
}