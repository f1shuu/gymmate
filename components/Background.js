import { Text, View } from 'react-native';

import { useSettings } from '../providers/SettingsProvider';
import { useTheme } from '../providers/ThemeProvider';

export default function Background({ text, content, type }) {
    const { settings, translate } = useSettings();
    const { theme } = useTheme();

    const styles = {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 24,
            color: theme.textPrimary,
            textAlign: 'center',
            paddingHorizontal: 25,
            paddingBottom: 100
        }
    }

    return (
        <View style={styles.container}>
            {text ? (<Text style={styles.text}>{translate('background1')}{content}{translate('background2')}{settings.language === 'pl' ? (type === 'masculine' ? 'swój pierwszy.' : 'swoje pierwsze.') : ''}</Text>) : null}
        </View>
    )
}

