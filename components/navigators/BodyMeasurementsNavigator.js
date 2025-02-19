import { createStackNavigator } from '@react-navigation/stack';

import BodyMeasurementsCreator from '../../screens/tools/BodyMeasurementsCreator';
import BodyMeasurementsScreen from '../../screens/navbar/BodyMeasurementsScreen';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function BodyMeasurementsNavigator() {
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
                name='BodyMeasurementsScreen'
                component={BodyMeasurementsScreen}
                options={{
                    ...customOptions,
                    headerTitle: translate('bodyMeasurementsScreenHeader')
                }}
            />
            <Stack.Screen
                name='BodyMeasurementsCreator'
                component={BodyMeasurementsCreator}
                options={{
                    ...customOptions,
                    headerTitle: translate('bodyMeasurementsCreatorHeader')
                }}
            />
        </Stack.Navigator>
    )
}