import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../../Colors';
import ExercisesScreen from '../../screens/navbar/ExercisesScreen';
import ExerciseCreator from '../../screens/tools/ExerciseCreator';

const Stack = createStackNavigator();

const customOptions = {
    headerTintColor: Colors.white,
    headerTitle: 'Dodawanie nowego ćwiczenia',
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

export default function ExercisesNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='ExercisesScreen'
                component={ExercisesScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='ExerciseCreator'
                component={ExerciseCreator}
                options={{ ...customOptions }} />
        </Stack.Navigator>
    )
}