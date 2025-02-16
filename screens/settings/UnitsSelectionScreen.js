import { View } from 'react-native';
import * as Haptics from 'expo-haptics';

import Container from '../../components/Container';
import Setting from '../../components/widgets/Setting';
import * as themes from '../../Themes';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const data = Object.keys(themes);

export default function UnitsSelectionScreen() {
    const { settings, updateSettings } = useSettings();
    const { theme } = useTheme();

    const changeUnits = (newValue) => {
        updateSettings('units', newValue);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    return (
        <Container>
            <View style={{ gap: 5 }}>
                <Setting active={true} name='kg, cm' color={theme.textPrimary} onPress={() => changeUnits('metric')} type={settings.units === 'metric' ? 'check' : null} style={{ paddingLeft: -10 }} />
                <Setting active={true} name='lbs, ft' color={theme.textPrimary} onPress={() => changeUnits('imperial')} type={settings.units === 'imperial' ? 'check' : null} style={{ paddingLeft: -10 }} />
            </View>
        </Container>
    )
}
