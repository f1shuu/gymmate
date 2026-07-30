import { createStackNavigator } from '@react-navigation/stack';

import BMICalculatorScreen from '../../screens/tools/BMICalculatorScreen';
import BMIHelpScreen from '../../screens/tools/BMIHelpScreen';
import CalculatorScreen from '../../screens/tools/CalculatorScreen';
import StopwatchScreen from '../../screens/tools/StopwatchScreen';
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
            height: 80,
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
                name='TimerScreen'
                component={TimerScreen}
                options={{
                    headerTitle: translate('timer'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='StopwatchScreen'
                component={StopwatchScreen}
                options={{
                    headerTitle: translate('stopwatch'),
                    ...customOptions
                }}
            />
        </Stack.Navigator>
    )
}