import { createStackNavigator } from '@react-navigation/stack';

import AddBodyMeasurement from '../../screens/tools/AddBodyMeasurement';
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
                name='AddBodyMeasurement'
                component={AddBodyMeasurement}
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