import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default Tool = ({ name, url, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.widget}>
            <Image source={url} style={styles.image} resizeMode='cover' />
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    widget: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#2B2B2B',
        borderRadius: 30,
        marginBottom: 10
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        alignSelf: 'center',
        margin: 10,
        borderRadius: 30,
    },
    text: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 24,
        margin: 10
    }
});