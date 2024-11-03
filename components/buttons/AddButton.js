import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../Colors';

export default function AddButton({ onPress }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(onPress)} style={styles.addButton}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    )
}

const styles = {
    addButton: {
        width: 80,
        height: 80,
        backgroundColor: Colors.button,
        borderRadius: 50,
        marginTop: 'auto',
        marginLeft: 'auto'
    },
    text: {
        color: Colors.white,
        textAlign: 'center',
        lineHeight: 80,
        fontSize: 64
    }
}