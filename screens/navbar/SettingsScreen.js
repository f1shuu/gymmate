import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Modal from '../../components/Modal';
import Setting from '../../components/widgets/Setting';

import { useSettings } from '../../helpers/SettingsProvider';

export default function SettingsScreen() {
    const [isRestoreModalVisible, setIsRestoreModalVisible] = useState(false);
    const { settings, restoreDefault, theme, translate } = useSettings();

    const navigation = useNavigation();

    const confirmRestore = async () => {
        await restoreDefault();
        setIsRestoreModalVisible(false);
    }

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
                    <Setting name={translate('sound')} icon={'volume-up'} color={theme.textPrimary} onPress={() => { }} type='toggle' parameter='isSoundOn' />
                    <Setting name={translate('vibrations')} icon={'vibration'} color={theme.textPrimary} onPress={() => { }} type='toggle' parameter='isHapticsOn' />
                    <Setting name={translate('trainingsScreenHeader')} icon={'workspace-premium'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('TrainingsSettingsScreen')} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('personalization')}</Text>
                    <Setting name={translate('theme')} icon={'palette'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('ThemeSelectionScreen')} />
                    <Setting name={translate('language')} icon={'translate'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('LanguageSelectionScreen')} />
                    <Setting name={translate('units')} icon={'swap-horiz'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('UnitsSelectionScreen')} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('help')}</Text>
                    <Setting name={translate('contact')} icon={'mail'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('ContactScreen')} />
                    <Setting name={translate('changelog')} icon={'list-alt'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('ChangelogScreen')} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('dangerZone')}</Text>
                    <Setting name={translate('dataDeletion')} icon={'delete'} color={Colors.red} type='navigate' onPress={() => navigation.navigate('DataDeletionScreen')} />
                    <Setting name={translate('restoreDefaultSettings')} icon={'restart-alt'} color={Colors.red} type='navigate' onPress={() => setIsRestoreModalVisible(true)} />
                </View>
            </ScrollView>
            <Modal
                isVisible={isRestoreModalVisible}
                text={translate('restoreDefaultConfirmation')}
                twoButtons={true}
                buttonOneText={translate('yes')}
                buttonOneOnPress={confirmRestore}
                buttonTwoText={translate('no')}
                buttonTwoOnPress={() => setIsRestoreModalVisible(false)}
            />
        </Container>
    )
}
