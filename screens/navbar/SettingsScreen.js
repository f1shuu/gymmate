import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import Colors from '../../Colors';

import Container from '../../components/Container';
import Modal from '../../components/Modal';
import ProfileAvatar from '../../components/ProfileAvatar';
import Setting from '../../components/widgets/Setting';

import { useSettings } from '../../helpers/SettingsProvider';

export default function SettingsScreen() {
    const [isRestoreModalVisible, setIsRestoreModalVisible] = useState(false);
    const { settings, restartOnboarding, restoreDefault, theme, translate } = useSettings();

    const navigation = useNavigation();

    const confirmRestore = async () => {
        await restoreDefault();
        setIsRestoreModalVisible(false);
    }

    const showOnboarding = async () => {
        let rootNavigation = navigation;
        while (rootNavigation.getParent()) rootNavigation = rootNavigation.getParent();

        if (!await restartOnboarding()) return;
        rootNavigation.reset({ index: 0, routes: [{ name: 'ExerciseOnboardingScreen' }] });
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
        <Container gradient={0.5} isMainScreen={true}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('NameScreen')} activeOpacity={0.8}>
                    <View style={styles.avatar}>
                        <ProfileAvatar size={100} />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.name}>
                            {settings.firstName ? (settings.lastName ? settings.firstName + ' ' + settings.lastName : settings.firstName) : (settings.lastName ? settings.lastName : translate('guest'))}
                        </Text>
                        <Icon name={'edit-square'} size={16} color={theme.tertiary} />
                    </View>
                    <Text style={[styles.name, { fontSize: 16 }]}>
                        {settings.nickname ? '@' + settings.nickname : null}
                    </Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('mainSettings')}</Text>
                    <Setting name={translate('notifications')} icon={'notifications'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('NotificationSettingsScreen')} />
                    <Setting name={translate('sound')} icon={'volume-up'} color={theme.textPrimary} onPress={() => { }} type='toggle' parameter='isSoundOn' />
                    <Setting name={translate('vibrations')} icon={'vibration'} color={theme.textPrimary} onPress={() => { }} type='toggle' parameter='isHapticsOn' />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('personalization')}</Text>
                    <Setting name={translate('theme')} icon={'palette'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('ThemeSelectionScreen')} />
                    <Setting name={translate('language')} icon={'translate'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('LanguageSelectionScreen')} />
                    <Setting name={translate('units')} icon={'swap-horiz'} color={theme.textPrimary} type='navigate' onPress={() => navigation.navigate('UnitsSelectionScreen')} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.sectionName}>{translate('help')}</Text>
                    <Setting name={translate('showOnboarding')} icon={'slideshow'} color={theme.textPrimary} type='navigate' onPress={showOnboarding} />
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