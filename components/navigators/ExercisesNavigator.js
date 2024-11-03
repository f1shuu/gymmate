import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../../Colors';
import ExercisesScreen from '../../screens/navbar/ExercisesScreen';
import ExerciseNameScreen from '../../screens/tools/exercises/ExerciseNameScreen';
import ExerciseDetailsScreen1 from '../../screens/tools/exercises/ExerciseDetailsScreen1';
import ExerciseDetailsScreen2 from '../../screens/tools/exercises/ExerciseDetailsScreen2';

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
                name='ExerciseNameScreen'
                component={ExerciseNameScreen}
                options={{ ...customOptions }} />
            <Stack.Screen
                name='ExerciseDetailsScreen1'
                component={ExerciseDetailsScreen1}
                options={{ ...customOptions }} />
            <Stack.Screen
                name='ExerciseDetailsScreen2'
                component={ExerciseDetailsScreen2}
                options={{ ...customOptions }} />
        </Stack.Navigator>
    )
}