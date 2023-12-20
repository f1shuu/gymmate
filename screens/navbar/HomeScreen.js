import { View, Image, Text, StyleSheet } from 'react-native';

const now = new Date();
const currentHour = now.getHours();

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {currentHour >= 4 && currentHour <= 17 ? (
                    <Text style={styles.text}>Dzień dobry, Filip</Text>
                ) : (
                    <Text style={styles.text}>Dobry wieczór, Filip</Text>
                )}
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.summary}>
                <Text style={styles.title}>W tym miesiącu trenowałeś:</Text>
                <View style={styles.rowContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.numberText}>0</Text>
                        <Text style={styles.timesText}>razy</Text>
                    </View>
                    <Image source={require('../../assets/navbar/body-measurements-active.png')} style={styles.smallImage} />
                </View>
            </View>
            <Image source={require('../../assets/background.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        flex: 1
    },
    row: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 15,
        paddingVertical: 10,
        marginTop: 20,
        marginHorizontal: 20,
        elevation: 10
    },
    text: {
        fontFamily: 'msb',
        color: '#376DEC',
        fontSize: 24,
        padding: 12
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    summary: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
        marginTop: 20,
        marginHorizontal: 20,
        elevation: 10
    },
    title: {
        fontFamily: 'msb',
        color: '#376DEC',
        fontSize: 22,
        marginBottom: 10,
        textAlign: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    numberText: {
        fontFamily: 'msb',
        color: '#376DEC',
        fontSize: 64,
        marginVertical: 20,
        marginLeft: 20
    },
    timesText: {
        fontFamily: 'msr',
        color: '#376DEC',
        fontSize: 16,
        marginLeft: 10,
        marginTop: 65
    },
    smallImage: {
        width: 100,
        height: 100
    },
    image: {
        zIndex: -1,
        width: 400,
        height: 400,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: -90,
        right: -90,
    },
})