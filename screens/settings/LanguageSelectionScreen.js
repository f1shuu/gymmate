import { View } from 'react-native';
import * as Haptics from 'expo-haptics';

import Container from '../../components/Container';
import Setting from '../../components/widgets/Setting';

import { useSettings } from '../../helpers/SettingsProvider';

export default function LanguageSelectionScreen() {
    const { settings, theme, updateSettings } = useSettings();

    const changeLanguage = (newValue) => {
        updateSettings({ 'language': newValue });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    return (
        <Container>
            <View style={{ gap: 5 }}>
                <Setting active={true} name='🇵🇱 Polski' color={theme.textPrimary} onPress={() => changeLanguage('pl')} type={settings.language === 'pl' ? 'check' : null} style={{ paddingLeft: -10 }} />
                <Setting active={true} name='🇬🇧 English' color={theme.textPrimary} onPress={() => changeLanguage('en')} type={settings.language === 'en' ? 'check' : null} style={{ paddingLeft: -10 }} />
                <Setting active={true} name='🇪🇸 Español' color={theme.textPrimary} onPress={() => changeLanguage('es')} type={settings.language === 'es' ? 'check' : null} style={{ paddingLeft: -10 }} />
            </View>
        </Container>
    )
}