import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../../Colors';
import SettingsScreen from '../../screens/navbar/SettingsScreen';
import DataDeletionScreen from '../../screens/settings/DataDeletionScreen';

const Stack = createStackNavigator();

const customOptions = {
    headerTintColor: Colors.white,
    headerTitle: 'Usuwanie danych',
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

export default function SettingsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='DataDeletionScreen'
                component={DataDeletionScreen}
                options={{ ...customOptions }} />
        </Stack.Navigator>
    )
}