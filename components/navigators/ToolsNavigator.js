import { createStackNavigator } from '@react-navigation/stack';

import BMICalculator from '../../screens/tools/BMICalculator';
import BMIHelp from '../../screens/tools/BMIHelp';
import Calculator from '../../screens/tools/Calculator';
import Timer from '../../screens/tools/Timer';
import ToolsScreen from '../../screens/navbar/ToolsScreen';
import UnitsConverter from '../../screens/tools/UnitsConverter';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function ToolsNavigator() {
    const { translate } = useSettings();
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
                    headerTitle: translate('timerHeader'),
                    ...customOptions
                }} />
            <Stack.Screen
                name='BMICalculator'
                component={BMICalculator}
                options={{
                    headerTitle: translate('bmiCalculatorHeader'),
                    ...customOptions
                }} />
            <Stack.Screen
                name='Calculator'
                component={Calculator}
                options={{
                    headerTitle: translate('calculatorHeader'),
                    ...customOptions
                }} />
            <Stack.Screen
                name='UnitsConverter'
                component={UnitsConverter}
                options={{
                    headerTitle: translate('unitsConverterHeader'),
                    ...customOptions
                }} />
            <Stack.Screen
                name='BMIHelp'
                component={BMIHelp}
                options={{
                    headerTitle: translate('bmiHelpHeader'),
                    ...customOptions
                }} />
        </Stack.Navigator>
    )
}