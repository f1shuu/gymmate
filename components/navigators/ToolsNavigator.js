import { createStackNavigator } from '@react-navigation/stack';

import ToolsScreen from '../../screens/navbar/ToolsScreen';
import BMICalculator from '../../screens/tools/BMICalculator';
import Calculator from '../../screens/tools/Calculator';
import UnitsConverter from '../../screens/tools/UnitsConverter';

const Stack = createStackNavigator();

export default function ToolsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='ToolsScreen'
                component={ToolsScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='BMICalculator'
                component={BMICalculator}
                options={{
                    headerTitle: 'Kalkulator BMI',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#141414',
                        elevation: 0
                    }
                }} />
            <Stack.Screen
                name='Calculator'
                component={Calculator}
                options={{
                    headerTitle: 'Kalkulator',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#141414',
                        elevation: 0
                    }
                }} />
            <Stack.Screen
                name='UnitsConverter'
                component={UnitsConverter}
                options={{
                    headerTitle: 'Konwerter jednostek',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#141414',
                        elevation: 0
                    }
                }} />
        </Stack.Navigator>
    );
}
