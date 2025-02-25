import { View, Text } from 'react-native';

import Container from '../../components/Container';

import { useSettings } from '../../helpers/SettingsProvider';

export default function ContactScreen() {
    const { theme, translate } = useSettings();

    const styles = {
        container: {
            gap: 15,
            padding: 10
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary,
            textAlign: 'justify'
        }
    }

    return (
        <Container>
            <View style={styles.container}>
                <Text style={[styles.text, { fontSize: 21 }]}>{translate('contactSectionHeader')}</Text>
                <Text style={styles.text}>{translate('contactSectionContent')}</Text>
                <Text style={styles.text}>📧 Email: gymmate.support@gmail.com</Text>
                <Text style={styles.text}>{translate('contactSectionThankYouForUsing')}</Text>
            </View>
        </Container>
    )
}
