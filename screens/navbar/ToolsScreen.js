import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Tool from '../../components/widgets/Tool';

export default function ToolsScreen() {
    const navigation = useNavigation();

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
            <Tool name='Kalkulator BMI' url={require('../../assets/tools/bmi.png')} onPress={navigateToBMICalculator} />
            <Tool name='Kalkulator matematyczny' url={require('../../assets/tools/calculator.png')} onPress={navigateToCalculator} />
            <Tool name='Konwerter jednostek' url={require('../../assets/tools/units-converter.png')} onPress={navigateToUnitsConverter} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'
    }
});