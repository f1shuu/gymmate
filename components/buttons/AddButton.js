import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import Colors from '../../Colors';

import { useSettings } from '../../helpers/SettingsProvider';

export default function AddButton({ onPress }) {
    const { theme } = useSettings();

    const navigation = useNavigation();

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

    return (
        <TouchableOpacity onPress={() => navigation.navigate(onPress)} style={styles.addButton} activeOpacity={0.8}>
            <Icon name='add' size={40} color={theme.textHeader} />
        </TouchableOpacity>
    )
}
