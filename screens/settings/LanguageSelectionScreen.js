import { View } from 'react-native';
import * as Haptics from 'expo-haptics';

import Container from '../../components/Container';
import Setting from '../../components/widgets/Setting';
import * as themes from '../../Themes';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const data = Object.keys(themes);

export default function LanguageSelectionScreen() {
    const { settings, updateSettings } = useSettings();
    const { theme } = useTheme();

    const changeLanguage = (newValue) => {
        updateSettings('language', newValue);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    return (
        <Container>
            <View style={{ gap: 5 }}>
                <Setting active={true} name='Polski' color={theme.textPrimary} onPress={() => changeLanguage('pl')} type={settings.language === 'pl' ? 'check' : ''} style={{ paddingLeft: -10 }} />
                <Setting active={true} name='English' color={theme.textPrimary} onPress={() => changeLanguage('en')} type={settings.language === 'en' ? 'check' : ''} style={{ paddingLeft: -10 }} />
            </View>
        </Container>
    )
}