import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

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
                    headerTintColor: 'white',
                    headerTitle: 'Dodaj nowy pomiar',
                    headerTitleStyle: {
                        fontFamily: 'msb',
                        color: 'white',
                        fontSize: 18
                    },
                    headerBackground: () => (
                        <LinearGradient
                            colors={['#6430D2', '#376DEC']}
                            style={{ flex: 1 }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: '#F6F6F6',
                        height: 60,
                        paddingTop: 20
                    }
                }} />
        </Stack.Navigator>
    );
}
