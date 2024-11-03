import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../../Colors';
import BodyMeasurementsScreen from '../../screens/navbar/BodyMeasurementsScreen';
import AddBodyMeasurement from '../../screens/tools/AddBodyMeasurement';

const Stack = createStackNavigator();

export default function BodyMeasurementsNavigator() {
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
                    headerTintColor: Colors.white,
                    headerTitle: 'Dodawanie nowego pomiaru',
                    headerStyle: {
                        backgroundColor: Colors.primary,
                        elevation: 0
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nexa',
                        fontSize: 18,
                        color: Colors.white
                    }
                }} />
        </Stack.Navigator>
    )
}