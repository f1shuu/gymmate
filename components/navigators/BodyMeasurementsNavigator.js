import { createStackNavigator } from '@react-navigation/stack';

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
                    headerTitle: 'Dodaj nowy pomiar',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#141414',
                        elevation: 0
                    }
                }} />
        </Stack.Navigator>
    );
}
