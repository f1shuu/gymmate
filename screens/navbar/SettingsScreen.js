import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Setting from '../../components/widgets/Setting';

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Setting />
            <Text style={styles.text}>Wersja beta 0.6.4</Text>
            <Image source={require('../../assets/background.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    image: {
        zIndex: -1,
        width: 400,
        height: 400,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: -90,
        right: -90,
    },
    text: {
        color: 'white',
        textAlign: 'center',
    }
});
