import { createStackNavigator } from '@react-navigation/stack';

import BodyMeasurementsNavigator from './BodyMeasurementsNavigator';
import HomeScreen from '../../screens/navbar/HomeScreen';
import ToolsNavigator from './ToolsNavigator';
import TrainingsNavigator from './TrainingsNavigator';

const Stack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='BodyMeasurementsNavigator'
                component={BodyMeasurementsNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ToolsNavigator'
                component={ToolsNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='TrainingsNavigator'
                component={TrainingsNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}