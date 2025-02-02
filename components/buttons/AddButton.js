import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';
import { useTheme } from '../../providers/ThemeProvider';

export default function AddButton({ onPress }) {
    const { theme, toggleTheme } = useTheme();

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(onPress)} style={styles.addButton}>
            <Icon name='add' size={40} color={theme.textHeader} />
        </TouchableOpacity>
    )
}

const styles = {
    addButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        right: 20,
        width: 65,
        height: 65,
        backgroundColor: Colors.green,
        borderRadius: 50
    }
}