import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';
import Colors from '../../Colors';
import Container from '../../components/Container';
import Setting from '../../components/widgets/Setting';

export default function SettingsScreen() {
    const navigation = useNavigation();

    return (
        <Container>
            <Background text={false} />
            <View style={styles.avatar}>
                <Icon name={'account-circle'} size={100} color={Colors.white} style={styles.icon} />
            </View>
            <Text style={[styles.text, { fontSize: 28 }]}>Gość</Text>
            <Text style={[styles.text, { marginBottom: 30 }]}>@gosc</Text>
            <View style={styles.container}>
                <Setting active={false} name='Ustawienia aplikacji' icon={'settings'} color={Colors.white} onPress='' />
                <Setting active={false} name='Język' icon={'language'} color={Colors.white} onPress='' />
                <Setting active={false} name='Personalizacja' icon={'tune'} color={Colors.white} nPress='' />
                <Setting active={true} name='Usuwanie danych' icon={'delete'} color={Colors.delete} onPress={() => navigation.navigate('DataDeletionScreen')} />
                <Setting active={false} name='Informacje o aplikacji' icon={'info'} color={Colors.white} onPress='' />
            </View>
        </Container>
    )
}

const styles = {
    avatar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    text: {
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    container: {
        gap: 10,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 20
    }
}