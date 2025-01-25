import { Text } from 'react-native';
import { version as appVersion } from '../../package.json';

import Colors from '../../Colors';
import Setting from '../../components/widgets/Setting';
import Container from '../../components/Container';
import Background from '../../components/Background';

export default function SettingsScreen() {
    return (
        <Container>
            <Background text={false} />
            <Setting />
            <Text style={{ color: Colors.secondary, position: 'absolute', bottom: 20, alignSelf: 'center' }}>Wersja {appVersion}</Text>
        </Container>
    )
}