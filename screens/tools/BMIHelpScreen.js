import { Text, Image, Dimensions } from 'react-native';

import Container from '../../components/Container';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const { width } = Dimensions.get('window');

export default function Calculator() {
    const { translate } = useSettings();
    const { theme } = useTheme();

    const styles = {
        mainText: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary,
            width: '90%',
            margin: 20,
            textAlign: 'justify'
        },
        image: {
            alignSelf: 'center',
            width: width * 0.9,
            height: (width * (814 / 1130)) * 0.9,
            resizeMode: 'contain',
            borderRadius: 15,
            marginBottom: 10
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 12,
            color: theme.textSecondary,
            textAlign: 'center',
            marginHorizontal: 5
        }
    }

    return (
        <Container>
            <Text style={styles.mainText}>{translate('bmiInfo')}</Text>
            <Image
                source={require('../../assets/images/tools/bmi/graph.png')}
                style={styles.image}
            />
            <Text style={styles.text}>{translate('bmiChart')}</Text>
        </Container>
    )
}
