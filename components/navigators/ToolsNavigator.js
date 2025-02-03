import { createStackNavigator } from '@react-navigation/stack';

import BMICalculator from '../../screens/tools/BMICalculator';
import BMIHelp from '../../screens/tools/BMIHelp';
import Calculator from '../../screens/tools/Calculator';
import Timer from '../../screens/tools/Timer';
import ToolsScreen from '../../screens/navbar/ToolsScreen';
import UnitsConverter from '../../screens/tools/UnitsConverter';

import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function ToolsNavigator() {
    const { theme } = useTheme();

    const customOptions = {
        headerTintColor: theme.textHeader,
        headerTitleStyle: {
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.textHeader
        },
        headerStyle: {
            backgroundColor: theme.primary,
            elevation: 0
        }
    }

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