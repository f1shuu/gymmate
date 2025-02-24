import Loader from './Loader';

import { SettingsProvider } from './helpers/SettingsProvider';

export default function App() {
  return (
    <SettingsProvider>
      <Loader />
    </SettingsProvider>
  )
}