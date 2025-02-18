import { createStackNavigator } from '@react-navigation/stack';

import TrainingsCreator from '../../screens/tools/TrainingsCreator';
import TrainingsScreen from '../../screens/navbar/TrainingsScreen';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function TrainingsNavigator() {
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
                name='TrainingsCreator'
                component={TrainingsCreator}
                options={{
                    headerTitle: translate('trainingsCreatorHeader'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='TrainingsScreen'
                component={TrainingsScreen}
                options={{
                    headerTitle: translate('trainingsScreenHeader'),
                    ...customOptions
                }}
            />
        </Stack.Navigator>
    )
}