import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Calculator() {
    return (
        <View style={styles.container} >
            <Text style={styles.mainText}>BMI (Body Mass Index - indeks masy ciała) to miara używana do oceny stosunku masy ciała (w kg) do wzrostu (w m).
                Pozwala na przybliżoną ocenę zdrowia, lecz nie należy jej traktować jako precyzyjnej danej, a jedynie jako przybliżenie -
                nie uwzględnia ona bowiem rozkładu tkanki tłuszczowej i mięśniowej oraz kilku innych kluczowych czynników.
            </Text>
            <Image
                source={require('../../assets/tools/bmi/graph.png')}
                style={styles.image}
            />
            <Text style={styles.minorText}>Wykres BMI dla zakresu masy ciała od 45 do 135 kg oraz zakresu wzrostu od 1,4 m do 2 m
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    image: {
        width: width * 0.9,
        height: (width * (814 / 1130)) * 0.9,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 10
    },
    mainText: {
        fontFamily: 'msb',
        width: '90%',
        color: '#376DEC',
        margin: 20,
        textAlign: 'justify'
    },
    minorText: {
        fontFamily: 'msr',
        color: '#BBB',
        fontSize: 8,
        textAlign: 'center'
    }
});