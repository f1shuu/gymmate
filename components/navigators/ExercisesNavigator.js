import { createStackNavigator } from '@react-navigation/stack';

import ExercisesScreen from '../../screens/navbar/ExercisesScreen';
import ExerciseCreator from '../../screens/tools/ExerciseCreator';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function ExercisesNavigator() {
    const { translate } = useSettings();
    const { theme } = useTheme();

    const customOptions = {
        headerTintColor: theme.textHeader,
        headerTitle: translate('exercisesNavigatorHeader'),
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
                name='ExercisesScreen'
                component={ExercisesScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='ExerciseCreator'
                component={ExerciseCreator}
                options={{ ...customOptions }} />
        </Stack.Navigator>
    )
}