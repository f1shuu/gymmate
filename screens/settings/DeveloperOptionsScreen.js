import { View, Text } from 'react-native';

import Colors from '../../Colors';
import Container from '../../components/Container';

import { useSettings } from '../../helpers/SettingsProvider';

export default function LanguageSelectionScreen() {
    const { settings } = useSettings();

    const styles = {
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 14,
            color: Colors.white
        }
    }

    return (
        <Container>
            {Object.keys(settings).map((key) => (
                <View key={key} style={styles.row}>
                    <Text style={styles.text}>{key}</Text>
                    <Text style={styles.text}>{JSON.stringify(settings[key])}</Text>
                </View>
            ))}
        </Container>
    )
}
