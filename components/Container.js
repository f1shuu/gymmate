import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../Colors';

export default function Container({ gradient, gradientLength, children }) {
    return <View style={styles.container}>
        {gradient ? (<LinearGradient
            colors={[Colors.primary, Colors.black]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: gradientLength }}
        />) : null}
        {children}
    </View>
}

const styles = {
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.black
    }
}