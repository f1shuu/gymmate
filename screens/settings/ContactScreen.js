import { Text, View, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import Container from '../../components/Container';

import { useSettings } from '../../helpers/SettingsProvider';

const emailAddress = 'contact@f1shu.dev';

export default function ContactScreen() {
    const { theme, translate } = useSettings();

    const styles = {
        content: {
            flexGrow: 1,
            paddingTop: 12,
            paddingBottom: 24,
            gap: 16
        },
        hero: {
            backgroundColor: theme.background,
            borderRadius: 18,
            paddingHorizontal: 24,
            paddingVertical: 30,
            alignItems: 'center'
        },
        iconCircle: {
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 18
        },
        title: {
            fontFamily: 'Nexa',
            fontSize: 24,
            lineHeight: 30,
            color: theme.textHeader,
            textAlign: 'center'
        },
        description: {
            fontFamily: 'Nexa',
            fontSize: 16,
            lineHeight: 24,
            color: theme.textHeader,
            textAlign: 'center',
            marginTop: 14,
            opacity: 0.9
        },
        emailCard: {
            minHeight: 86,
            borderRadius: 16,
            backgroundColor: theme.background,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            gap: 14
        },
        emailIcon: {
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: theme.secondary,
            alignItems: 'center',
            justifyContent: 'center'
        },
        emailText: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary
        },
        footer: {
            flex: 1,
            minHeight: 130,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 10
        },
        thankYou: {
            fontFamily: 'Nexa',
            fontSize: 16,
            lineHeight: 24,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 10
        }
    }

    const openEmail = async () => {
        try {
            await Linking.openURL('mailto:' + emailAddress);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container gradient={0.65}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <View style={styles.iconCircle}>
                        <Icon name='forum' size={38} color={theme.textHeader} />
                    </View>
                    <Text style={styles.title}>{translate('contactSectionHeader')}</Text>
                    <Text style={styles.description}>{translate('contactSectionContent')}</Text>
                </View>

                <TouchableOpacity style={styles.emailCard} activeOpacity={0.8} onPress={openEmail}>
                    <View style={styles.emailIcon}>
                        <Icon name='alternate-email' size={26} color={theme.primary} />
                    </View>
                    <Text style={styles.emailText}>Email: {emailAddress}</Text>
                    <Icon name='arrow-forward-ios' size={18} color={theme.tertiary} />
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.thankYou}>{translate('contactSectionThankYouForUsing')}</Text>
                </View>
            </ScrollView>
        </Container>
    )
}
