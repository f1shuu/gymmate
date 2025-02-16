import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/navbar/HomeScreen';
import MapScreen from '../../screens/tools/MapScreen';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function HomeNavigator() {
    const { translate } = useSettings();
    const { theme } = useTheme();

    const customOptions = {
        headerTintColor: theme.textHeader,
        headerTitle: translate('homeNavigatorHeader'),
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
                name='HomeScreen'
                component={HomeScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{ ...customOptions }} />
        </Stack.Navigator>
    )
}