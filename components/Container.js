import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useSettings } from '../helpers/SettingsProvider';

export default function Container({ gradient, isMainScreen, children }) {
    const { theme } = useSettings();

    const styles = {
        container: {
            flex: 1,
            paddingVertical: isMainScreen ? 0 : 15,
            paddingHorizontal: 15,
            backgroundColor: theme.secondary
        }
    }

    return <View style={styles.container}>
        {gradient && gradient > 0 ? (
            <LinearGradient
                colors={[theme.primary, theme.secondary]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: gradient }}
            />) : null}
        {children}
    </View>
}