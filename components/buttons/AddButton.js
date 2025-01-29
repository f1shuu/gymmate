import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';

export default function AddButton({ onPress }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(onPress)} style={styles.addButton}>
            <Icon name='add' size={40} color={Colors.white} />
        </TouchableOpacity>
    )
}

const styles = {
    addButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 40,
        right: 20,
        width: 65,
        height: 65,
        backgroundColor: Colors.green,
        borderRadius: 50
    }
}