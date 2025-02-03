import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '../../screens/navbar/SettingsScreen';
import DataDeletionScreen from '../../screens/settings/DataDeletionScreen';
import ThemeSelectionScreen from '../../screens/settings/ThemeSelectionScreen';

import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function SettingsNavigator() {
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
                    headerTitle: 'Usuń dane',
                    ...customOptions
                }} />
            <Stack.Screen
                name='ThemeSelectionScreen'
                component={ThemeSelectionScreen}
                options={{
                    headerTitle: 'Wybierz motyw',
                    ...customOptions
                }} />
        </Stack.Navigator>
    )
}