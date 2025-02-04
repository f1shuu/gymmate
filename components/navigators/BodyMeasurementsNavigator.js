import { createStackNavigator } from '@react-navigation/stack';

import BodyMeasurementsCreator from '../../screens/tools/BodyMeasurementsCreator';
import BodyMeasurementsScreen from '../../screens/navbar/BodyMeasurementsScreen';

import { useTheme } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

export default function BodyMeasurementsNavigator() {
    const { theme } = useTheme();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='BodyMeasurementsScreen'
                component={BodyMeasurementsScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='BodyMeasurementsCreator'
                component={BodyMeasurementsCreator}
                options={{
                    headerTintColor: theme.textHeader,
                    headerTitle: 'Dodawanie nowego pomiaru',
                    headerStyle: {
                        backgroundColor: theme.primary,
                        elevation: 0
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nexa',
                        fontSize: 18,
                        color: theme.textHeader
                    }
                }} />
        </Stack.Navigator>
    )
}