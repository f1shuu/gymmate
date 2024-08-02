import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Tool from '../../components/widgets/Tool';

export default function ToolsScreen() {
    const navigation = useNavigation();

    const navigateToTimer = () => {
        navigation.navigate('Timer');
    }

    const navigateToBMICalculator = () => {
        navigation.navigate('BMICalculator');
    }

    const navigateToCalculator = () => {
        navigation.navigate('Calculator');
    }

    const navigateToUnitsConverter = () => {
        navigation.navigate('UnitsConverter');
    }

    return (
        <View style={styles.container}>
            <Tool name='Timer' url={require('../../assets/tools/timer.png')} onPress={navigateToTimer} />
            <Tool name='Kalkulator BMI' url={require('../../assets/tools/bmi.png')} onPress={navigateToBMICalculator} />
            <Tool name='Kalkulator matematyczny' url={require('../../assets/tools/calculator.png')} onPress={navigateToCalculator} />
            <Tool name='Konwerter jednostek' url={require('../../assets/tools/units-converter.png')} onPress={navigateToUnitsConverter} />
            <Image source={require('../../assets/background.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'
    },
    image: {
        zIndex: -1,
        width: 400,
        height: 400,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: -90,
        right: -90,
    }
});