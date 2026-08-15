import { createStackNavigator } from '@react-navigation/stack';

import AchievementsScreen from '../../screens/tools/AchievementsScreen';
import BodyMeasurementsNavigator from './BodyMeasurementsNavigator';
import HomeScreen from '../../screens/navbar/HomeScreen';
import ToolsNavigator from './ToolsNavigator';
import TrainingsNavigator from './TrainingsNavigator';

import { useSettings } from '../../helpers/SettingsProvider';

const Stack = createStackNavigator();

export default function HomeNavigator() {
    const { theme, translate } = useSettings();
    const customOptions = {
        headerTintColor: theme.textHeader,
        headerStyle: {
            backgroundColor: theme.primary,
            height: 60,
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
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='AchievementsScreen'
                component={AchievementsScreen}
                options={{
                    headerTitle: translate('achievements'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='BodyMeasurementsNavigator'
                component={BodyMeasurementsNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ToolsNavigator'
                component={ToolsNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='TrainingsNavigator'
                component={TrainingsNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}