import { View, StyleSheet } from 'react-native';

import { useSettings } from '../helpers/SettingsProvider';

export default function Container({ gradient, isMainScreen, children }) {
    const { theme } = useSettings();

    const styles = {
        container: {
            flex: 1,
            padding: 15,
            backgroundColor: theme.secondary
        }
    }

    return <View style={styles.container}>
        {children}
    </View>
}