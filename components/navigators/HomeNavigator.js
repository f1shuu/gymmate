import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/navbar/HomeScreen';
import Map from '../../screens/tools/Map';

import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function HomeNavigator() {
    const { theme } = useTheme();

    const customOptions = {
        headerTintColor: theme.textHeader,
        headerTitle: 'Siłownie w pobliżu',
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
                name='Map'
                component={Map}
                options={{ ...customOptions }} />
        </Stack.Navigator>
    )
}