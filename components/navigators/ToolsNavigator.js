import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import ToolsScreen from '../../screens/navbar/ToolsScreen';
import BMICalculator from '../../screens/tools/BMICalculator';
import Calculator from '../../screens/tools/Calculator';
import UnitsConverter from '../../screens/tools/UnitsConverter';
import BMIHelp from '../../screens/tools/BMIHelp';

const Stack = createStackNavigator();

const customOptions = {
    headerTintColor: 'white',
    headerTitleStyle: {
        fontFamily: 'msb',
        color: 'white',
        fontSize: 18
    },
    headerBackground: () => (
        <LinearGradient
            colors={['#6430D2', '#376DEC']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        />
    ),
    headerStyle: {
        elevation: 10
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
    );
}
