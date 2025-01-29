import { Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../Colors';

export default Tool = ({ name, url, onPress }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => { navigation.navigate(onPress) }} style={styles.widget} activeOpacity={0.8}>
            <Image source={url} style={styles.image} resizeMode='cover' />
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    widget: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: Colors.background,
        marginBottom: 20,
        padding: 10
    },
    image: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        margin: 10
    },
    text: {
        flex: 1,
        fontFamily: 'Nexa',
        fontSize: 20,
        color: Colors.white,
        textAlign: 'center',
        alignSelf: 'center',
        margin: 10
    }
}