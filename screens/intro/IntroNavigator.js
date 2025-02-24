import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import NavigationBar from '../../components/navigators/NavigationBar';
import WelcomeScreen from './WelcomeScreen';

import { useSettings } from '../../helpers/SettingsProvider';

const Stack = createStackNavigator();

export default function IntroNavigator() {
    const { settings, theme } = useSettings();

    const MyDarkTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme.background
        }
    }

    return (
        <NavigationContainer theme={MyDarkTheme}>
            <Stack.Navigator>
                {settings.firstLaunch && (
                    <Stack.Screen
                        name='WelcomeScreen'
                        component={WelcomeScreen}
                        options={{ headerShown: false }}
                    />
                )}
                <Stack.Screen
                    name='NavigationBar'
                    component={NavigationBar}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}