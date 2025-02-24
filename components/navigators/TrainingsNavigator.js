import { createStackNavigator } from '@react-navigation/stack';

import TrainingsCreator from '../../screens/tools/TrainingsCreator';
import TrainingsScreen from '../../screens/navbar/TrainingsScreen';

import { useSettings } from '../../helpers/SettingsProvider';

const Stack = createStackNavigator();

export default function TrainingsNavigator() {
    const { theme, translate } = useSettings();

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
                name='TrainingsScreen'
                component={TrainingsScreen}
                options={{
                    headerTitle: translate('trainingsScreenHeader'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='TrainingsCreator'
                component={TrainingsCreator}
                options={{
                    headerTitle: translate('trainingsCreatorHeader'),
                    ...customOptions
                }}
            />
        </Stack.Navigator>
    )
}