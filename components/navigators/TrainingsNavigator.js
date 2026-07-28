import { createStackNavigator } from '@react-navigation/stack';

import ActiveTrainingScreen from '../../screens/tools/ActiveTrainingScreen';
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
            <Stack.Screen
                name='ActiveTrainingScreen'
                component={ActiveTrainingScreen}
                options={{
                    headerTitle: translate('activeTraining'),
                    ...customOptions
                }}
            />
        </Stack.Navigator>
    )
}