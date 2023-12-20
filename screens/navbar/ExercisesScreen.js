import { View, Text, Image, StyleSheet } from 'react-native';

export default function ExercisesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.emptyText}>Nie masz jeszcze żadnych ćwiczeń. Użyj przycisku w prawym dolnym rogu ekranu, aby dodać swój pierwszy.</Text>
            <Image source={require('../../assets/background.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        flex: 1
    },
    emptyText: {
        fontFamily: 'msb',
        color: '#D9D9D9',
        fontSize: 32,
        textAlign: 'center',
        paddingTop: 50,
        paddingHorizontal: 25
    },
    image: {
        zIndex: -1,
        width: 400,
        height: 400,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: -90,
        right: -90,
    }
})