import { Text, Image, Dimensions } from 'react-native';

import Container from '../../components/Container';
import { useTheme } from '../../providers/ThemeProvider';

const { width } = Dimensions.get('window');

export default function Calculator() {
    const { theme, toggleTheme } = useTheme();

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
            <Text style={styles.mainText}>BMI (Body Mass Index - indeks masy ciała) to miara używana do oceny stosunku masy ciała (w kg) do wzrostu (w m).
                Pozwala na przybliżoną ocenę zdrowia, lecz nie należy jej traktować jako precyzyjnej danej, a jedynie jako przybliżenie -
                nie uwzględnia ona bowiem rozkładu tkanki tłuszczowej i mięśniowej oraz kilku innych kluczowych czynników.
            </Text>
            <Image
                source={require('../../assets/images/tools/bmi/graph.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Wykres BMI dla zakresu masy ciała od 45 do 135&nbsp;kg oraz zakresu wzrostu od 1,4 m do 2 m
            </Text>
        </Container>
    )
}
