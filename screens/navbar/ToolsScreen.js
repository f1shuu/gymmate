import { View, TouchableOpacity } from 'react-native';
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
        <View style={{ backgroundColor: '#171717', flex: 1 }}>
            <TouchableOpacity onPress={ navigateToBMICalculator }>
                <Tool name='Kalkulator BMI' icon={require('../../assets/tools/bmi.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ navigateToCalculator }>
                <Tool name='Kalkulator matematyczny' icon={require('../../assets/tools/calculator.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ navigateToUnitsConverter }>
                <Tool name='Konwerter jednostek' icon={require('../../assets/tools/units-converter.png')} />
            </TouchableOpacity>
        </View>
    );
}
