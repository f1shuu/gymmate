import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../../Colors';
import ToolsScreen from '../../screens/navbar/ToolsScreen';
import Timer from '../../screens/tools/Timer';
import BMICalculator from '../../screens/tools/BMICalculator';
import Calculator from '../../screens/tools/Calculator';
import UnitsConverter from '../../screens/tools/UnitsConverter';
import BMIHelp from '../../screens/tools/BMIHelp';

const Stack = createStackNavigator();

const customOptions = {
    headerTintColor: Colors.white,
    headerTitleStyle: {
        fontFamily: 'Nexa',
        fontSize: 18,
        color: Colors.white
    },
    headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 0
    }
}

export default function ToolsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='ToolsScreen'
                component={ToolsScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='Timer'
                component={Timer}
                options={{
                    headerTitle: 'Minutnik',
                    ...customOptions
                }} />
            <Stack.Screen
                name='BMICalculator'
                component={BMICalculator}
                options={{
                    headerTitle: 'Kalkulator BMI',
                    ...customOptions
                }} />
            <Stack.Screen
                name='Calculator'
                component={Calculator}
                options={{
                    headerTitle: 'Kalkulator',
                    ...customOptions
                }} />
            <Stack.Screen
                name='UnitsConverter'
                component={UnitsConverter}
                options={{
                    headerTitle: 'Konwerter jednostek',
                    ...customOptions
                }} />
            <Stack.Screen
                name='BMIHelp'
                component={BMIHelp}
                options={{
                    headerTitle: 'Czym jest wskaźnik BMI?',
                    ...customOptions
                }} />
        </Stack.Navigator>
    )
}