import { Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Setting from '../../components/widgets/Setting';

import { useTheme } from '../../providers/ThemeProvider';

export default function SettingsScreen() {
    const { theme } = useTheme();

    const navigation = useNavigation();

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
            color: theme.textHeader,
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
            color: theme.textSecondary,
            marginLeft: 10,
            marginBottom: 10
        }
    }

    return (
        <Container gradient={0.5}>
            <ScrollView>
                <View style={styles.avatar}>
                    <Icon name={'account-circle'} size={100} color={theme.textHeader} style={styles.icon} />
                </View>
                <Text style={styles.name}>Filip Szulżycki</Text>
                <Text style={[styles.name, { fontSize: 16 }]}>@f1shu</Text>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>Ustawienia</Text>
                    <Setting active={false} name='Powiadomienia' icon={'notifications'} color={theme.textPrimary} onPress={() => { }} isToggle={true} />
                    <Setting active={true} name='Dźwięk' icon={'volume-up'} color={theme.textPrimary} onPress={() => { }} isToggle={true} parameter='isSoundOn' />
                    <Setting active={true} name='Wibracje' icon={'vibration'} color={theme.textPrimary} onPress={() => { }} isToggle={true} parameter='isHapticsOn' />
                    <Setting active={false} name='Treningi' icon={'workspace-premium'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                    <Setting active={false} name='Eksport i migracja danych' icon={'loop'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>Personalizacja</Text>
                    <Setting active={true} name='Motyw' icon={'palette'} color={theme.textPrimary} isToggle={false} onPress={() => navigation.navigate('ThemeSelectionScreen')} />
                    <Setting active={false} name='Język' icon={'translate'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                    <Setting active={false} name='Jednostki' icon={'swap-horiz'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>Pomoc</Text>
                    <Setting active={false} name='Informacje o aplikacji' icon={'info'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                    <Setting active={false} name='Oceń aplikację' icon={'star'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                    <Setting active={false} name='Polityka prywatności' icon={'text-snippet'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                    <Setting active={false} name='Zasady i warunki' icon={'menu-book'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                    <Setting active={false} name='Kontakt' icon={'mail'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                    <Setting active={false} name='Dziennik zmian' icon={'list-alt'} color={theme.textPrimary} isToggle={false} onPress={() => { }} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>Strefa ryzyka</Text>
                    <Setting active={true} name='Usuwanie danych' icon={'delete'} color={Colors.red} isToggle={false} onPress={() => navigation.navigate('DataDeletionScreen')} />
                </View>
            </ScrollView>
        </Container>
    )
}
