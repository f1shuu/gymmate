import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../../Colors';
import HomeScreen from '../../screens/navbar/HomeScreen';
import Map from '../../screens/tools/Map';

const Stack = createStackNavigator();

const customOptions = {
    headerTintColor: Colors.white,
    headerTitle: 'Siłownie w pobliżu',
    headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 0
    },
    headerTitleStyle: {
        fontFamily: 'Nexa',
        fontSize: 18,
        color: Colors.white
    }
}

export default function HomeNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='Map'
                component={Map}
                options={{ ...customOptions }} />
        </Stack.Navigator>
    )
}