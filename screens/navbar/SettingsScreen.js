import { Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Setting from '../../components/widgets/Setting';

export default function SettingsScreen() {
    const navigation = useNavigation();

    return (
        <Container gradient={true} gradientLength={0.5}>
            <ScrollView>
                <View style={styles.avatar}>
                    <Icon name={'account-circle'} size={100} color={Colors.white} style={styles.icon} />
                </View>
                <Text style={styles.name}>Gość</Text>
                <Text style={[styles.name, { fontSize: 16 }]}>@gosc</Text>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>Ustawienia</Text>
                    <Setting active={false} name='Powiadomienia' icon={'notifications'} color={Colors.white} onPress='' toggle={true} />
                    <Setting active={false} name='Dźwięk' icon={'volume-up'} color={Colors.white} onPress='' toggle={true} />
                    <Setting active={false} name='Wibracje' icon={'vibration'} color={Colors.white} onPress='' toggle={true} />
                    <Setting active={false} name='Treningi' icon={'workspace-premium'} color={Colors.white} onPress='' />
                    <Setting active={false} name='Eksport i migracja danych' icon={'loop'} color={Colors.white} onPress='' />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>Personalizacja</Text>
                    <Setting active={false} name='Motyw' icon={'palette'} color={Colors.white} onPress='' />
                    <Setting active={false} name='Język' icon={'translate'} color={Colors.white} onPress='' />
                    <Setting active={false} name='Jednostki' icon={'swap-horiz'} color={Colors.white} onPress='' />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>Pomoc</Text>
                    <Setting active={false} name='Informacje o aplikacji' icon={'info'} color={Colors.white} onPress='' />
                    <Setting active={false} name='Oceń aplikację' icon={'star'} color={Colors.white} onPress='' />
                    <Setting active={false} name='Polityka prywatności' icon={'text-snippet'} color={Colors.white} onPress='' />
                    <Setting active={false} name='Zasady i warunki' icon={'menu-book'} color={Colors.white} onPress='' />
                    <Setting active={false} name='Kontakt' icon={'mail'} color={Colors.white} onPress='' />
                    <Setting active={false} name='Dziennik zmian' icon={'list-alt'} color={Colors.white} onPress='' />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>Strefa ryzyka</Text>
                    <Setting active={true} name='Usuwanie danych' icon={'delete'} color={Colors.red} onPress={() => navigation.navigate('DataDeletionScreen')} />
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = {
    avatar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    name: {
        fontFamily: 'Nexa',
        fontSize: 28,
        color: Colors.white,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    container: {
        gap: 5,
        marginTop: 20
    },
    sectionName: {
        fontFamily: 'Nexa',
        fontSize: 14,
        color: Colors.secondary,
        marginLeft: 10,
        marginBottom: 10
    }
}