import { Text, Image, Dimensions } from 'react-native';

import Container from '../../components/Container';

import { useSettings } from '../../helpers/SettingsProvider';

const { width } = Dimensions.get('window');

export default function Calculator() {
    const { theme, translate } = useSettings();

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
            borderRadius: 10,
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
