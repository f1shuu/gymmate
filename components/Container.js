import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../providers/ThemeProvider';

export default function Container({ gradient, children }) {
    const { theme } = useTheme();

    const styles = {
        container: {
            flex: 1,
            padding: 15,
            paddingBottom: 30,
            backgroundColor: theme.secondary
        }
    }

    return <View style={styles.container}>
        {gradient && gradient > 0 ? (<LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: gradient }}
        />) : null}
        {children}
    </View>
}
