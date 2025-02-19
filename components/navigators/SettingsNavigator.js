import { createStackNavigator } from '@react-navigation/stack';

import DataDeletionScreen from '../../screens/settings/DataDeletionScreen';
import LanguageSelectionScreen from '../../screens/settings/LanguageSelectionScreen';
import SettingsScreen from '../../screens/navbar/SettingsScreen';
import ThemeSelectionScreen from '../../screens/settings/ThemeSelectionScreen';
import UnitsSelectionScreen from '../../screens/settings/UnitsSelectionScreen';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function SettingsNavigator() {
    const { translate } = useSettings();
    const { theme } = useTheme();

    const customOptions = {
        headerTintColor: theme.textHeader,
        headerStyle: {
            backgroundColor: theme.primary,
            elevation: 0
        },
        headerTitleStyle: {
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.textHeader
        }
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='DataDeletionScreen'
                component={DataDeletionScreen}
                options={{
                    headerTitle: translate('deleteData'),
                    ...customOptions
                }} />
            <Stack.Screen
                name='ThemeSelectionScreen'
                component={ThemeSelectionScreen}
                options={{
                    headerTitle: translate('chooseTheme'),
                    ...customOptions
                }} />
            <Stack.Screen
                name='UnitsSelectionScreen'
                component={UnitsSelectionScreen}
                options={{
                    headerTitle: translate('chooseUnits'),
                    ...customOptions
                }} />
            <Stack.Screen
                name='LanguageSelectionScreen'
                component={LanguageSelectionScreen}
                options={{
                    headerTitle: translate('chooseLanguage'),
                    ...customOptions
                }} />
        </Stack.Navigator>
    )
}