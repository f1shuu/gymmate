import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default Tool = ({ name, url, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.widget, { margin: 10 }]}>
            <LinearGradient colors={['#6430D2', '#376DEC']} style={styles.widget} onPress={onPress} >
                <Image source={url} style={styles.image} resizeMode='cover' />
                <Text style={styles.text}>{name}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    widget: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 15,
        elevation: 10
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        alignSelf: 'center',
        margin: 10
    },
    text: {
        fontFamily: 'msb',
        color: 'white',
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20,
        margin: 10
    }
});