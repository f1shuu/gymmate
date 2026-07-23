import { createStackNavigator } from '@react-navigation/stack';

import BMICalculatorScreen from '../../screens/tools/BMICalculatorScreen';
import BMIHelpScreen from '../../screens/tools/BMIHelpScreen';
import CalculatorScreen from '../../screens/tools/CalculatorScreen';
import MapScreen from '../../screens/tools/MapScreen';
import TimerScreen from '../../screens/tools/TimerScreen';

import { useSettings } from '../../helpers/SettingsProvider';

const Stack = createStackNavigator();

export default function ToolsNavigator() {
    const { theme, translate } = useSettings();

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
                name='BMICalculatorScreen'
                component={BMICalculatorScreen}
                options={{
                    headerTitle: translate('bmiCalculator'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='BMIHelpScreen'
                component={BMIHelpScreen}
                options={{
                    headerTitle: translate('bmiHelp'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='CalculatorScreen'
                component={CalculatorScreen}
                options={{
                    headerTitle: translate('calculator'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                    headerTitle: translate('gymsNearby'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='TimerScreen'
                component={TimerScreen}
                options={{
                    headerTitle: translate('timer'),
                    ...customOptions
                }}
            />
        </Stack.Navigator>
    )
}