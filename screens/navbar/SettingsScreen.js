import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Setting from '../../components/widgets/Setting';

import { useSettings } from '../../helpers/SettingsProvider';

export default function SettingsScreen() {
    const { settings, restoreDefault, theme, translate } = useSettings();

    const navigation = useNavigation();

    const styles = {
        avatar: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        },
        row: {
            flexDirection: 'row',
            gap: 6,
            justifyContent: 'center',
            alignItems: 'center'
        },
        name: {
            fontFamily: 'Nexa',
            fontSize: 28,
            color: theme.textHeader,
            textAlign: 'center',
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
                    <Icon name={'account-circle'} size={100} color={theme.textHeader} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.name}>
                        {settings.firstName ? (settings.lastName ? settings.firstName + ' ' + settings.lastName : settings.firstName) : (settings.lastName ? settings.lastName : translate('guest'))}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('NameScreen')}>
                        <Icon name={'edit-square'} size={16} color={theme.tertiary} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.name, { fontSize: 16 }]}>
                    {settings.nickname ? '@' + settings.nickname : null}
                </Text>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('settings')}</Text>
                    {/* <Setting active={false} name={translate('notifications')} icon={'notifications'} color={theme.textPrimary} onPress={() => { }} type='toggle' /> */}
                    <Setting active={true} name={translate('sound')} icon={'volume-up'} color={theme.textPrimary} onPress={() => { }} type='toggle' parameter='isSoundOn' />
                    <Setting active={true} name={translate('vibrations')} icon={'vibration'} color={theme.textPrimary} onPress={() => { }} type='toggle' parameter='isHapticsOn' />
                    {/* <Setting active={false} name={translate('trainingsScreenHeader')} icon={'workspace-premium'} color={theme.textPrimary} type='navigate' onPress={() => { }} /> */}
                    {/* <Setting active={false} name={translate('exportAndDataMigration')} icon={'loop'} color={theme.textPrimary} type='navigate' onPress={() => { }} /> */}
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('personalization')}</Text>
                    <Setting active={true} name={translate('theme')} icon={'palette'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('ThemeSelectionScreen')} />
                    <Setting active={true} name={translate('language')} icon={'translate'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('LanguageSelectionScreen')} />
                    <Setting active={true} name={translate('units')} icon={'swap-horiz'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('UnitsSelectionScreen')} />
                </View>
                {/* <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('help')}</Text>
                    <Setting active={false} name={translate('appInfo')} icon={'info'} color={theme.textPrimary} type='navigate' onPress={() => { }} />
                    <Setting active={false} name={translate('rateApp')} icon={'star'} color={theme.textPrimary} type='navigate' onPress={() => { }} />
                    <Setting active={false} name={translate('privacyPolicy')} icon={'text-snippet'} color={theme.textPrimary} type='navigate' onPress={() => { }} />
                    <Setting active={false} name={translate('termsAndConditions')} icon={'menu-book'} color={theme.textPrimary} type='navigate' onPress={() => { }} />
                    <Setting active={false} name={translate('contact')} icon={'mail'} color={theme.textPrimary} type='navigate' onPress={() => { }} />
                    <Setting active={false} name={translate('changelog')} icon={'list-alt'} color={theme.textPrimary} type='navigate' onPress={() => { }} />
                </View> */}
                <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('dangerZone')}</Text>
                    <Setting active={true} name={translate('dataDeletion')} icon={'delete'} color={Colors.red} type='navigate' onPress={() => navigation.navigate('DataDeletionScreen')} />
                    <Setting active={true} name={translate('restoreDefaultSettings')} icon={'restart-alt'} color={Colors.red} type='navigate' onPress={() => restoreDefault()} />
                    <Setting active={true} name={translate('developerOptions')} icon={'code'} color={Colors.red} type='navigate' onPress={() => navigation.navigate('DeveloperOptionsScreen')} />
                </View>
            </ScrollView>
        </Container>
    )
}
