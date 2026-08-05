import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import NavigationBar from '../../components/navigators/NavigationBar';
import ExerciseOnboardingScreen from './ExerciseOnboardingScreen';
import ToolsOnboardingScreen from './ToolsOnboardingScreen';
import TrainingOnboardingScreen from './TrainingOnboardingScreen';

import { useSettings } from '../../helpers/SettingsProvider';

const Stack = createStackNavigator();

export default function IntroNavigator() {
    const { shouldShowOnboarding, theme } = useSettings();

    const MyDarkTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme.secondary,
            card: theme.secondary,
            border: theme.secondary
        }
    }

    return (
        <NavigationContainer theme={MyDarkTheme}>
            <Stack.Navigator
                initialRouteName={shouldShowOnboarding ? 'ExerciseOnboardingScreen' : 'NavigationBar'}
                detachInactiveScreens={false}
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                    cardOverlayEnabled: false,
                    cardStyle: { backgroundColor: theme.secondary },
                    detachPreviousScreen: false,
                    gestureEnabled: false
                }}
            >
                <Stack.Screen name='ExerciseOnboardingScreen' component={ExerciseOnboardingScreen} />
                <Stack.Screen name='TrainingOnboardingScreen' component={TrainingOnboardingScreen} />
                <Stack.Screen name='ToolsOnboardingScreen' component={ToolsOnboardingScreen} />
                <Stack.Screen name='NavigationBar' component={NavigationBar} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}