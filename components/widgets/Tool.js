import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default Tool = ({ name, url, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.widget, { margin: 10 }]} activeOpacity={0.8}>
            <LinearGradient
                colors={['#6430D2', '#376DEC']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.widget}
            >
                <Image source={url} style={styles.image} resizeMode='cover'/>
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
        alignSelf: 'center',
        width: 125,
        height: 125,
        margin: 10
    },
    text: {
        fontFamily: 'msb',
        color: 'white',
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 24,
        margin: 10
    }
});