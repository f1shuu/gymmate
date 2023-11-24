import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import BodyMeasurementsScreen from '../screens/BodyMeasurementsScreen';
import ToolsScreen from '../screens/ToolsScreen';

const Tab = createBottomTabNavigator();

const getIconName = (routeName, focused) => {
    let iconName;

    switch (routeName) {
        case 'Ćwiczenia':
            iconName = focused ? require('../assets/navbar/exercises-active.png') : require('../assets/navbar/exercises-inactive.png');
            break;
        case 'Metryczka':
            iconName = focused ? require('../assets/navbar/body-measurements-active.png') : require('../assets/navbar/body-measurements-inactive.png');
            break;
        case 'Trening':
            iconName = focused ? require('../assets/navbar/training-active.png') : require('../assets/navbar/training-inactive.png');
            break;
        case 'Narzędzia':
            iconName = focused ? require('../assets/navbar/tools-active.png') : require('../assets/navbar/tools-inactive.png');
            break;
        case 'Ustawienia':
            iconName = focused ? require('../assets/navbar/settings-active.png') : require('../assets/navbar/settings-inactive.png');
            break;
    }

    return iconName;
}

export default function NavigationBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Ćwiczenia"
                    component={ExercisesScreen}
                    options={({ route }) => ({
                        headerStyle: { backgroundColor: '#376DEC' },
                        tabBarStyle: {
                            backgroundColor: '#212121',
                            height: 60
                        },
                        tabBarLabel: 'Ćwiczenia',
                        tabBarLabelStyle: { marginBottom: 5 },
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 25,
                                height: 25,
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Metryczka"
                    component={BodyMeasurementsScreen}
                    options={({ route }) => ({
                        headerStyle: { backgroundColor: '#376DEC' },
                        tabBarStyle: {
                            backgroundColor: '#212121',
                            height: 60
                        },
                        tabBarLabel: 'Metryczka',
                        tabBarLabelStyle: { marginBottom: 5 },
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 25,
                                height: 25,
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Trening"
                    component={HomeScreen}
                    options={({ route }) => ({
                        headerStyle: { backgroundColor: '#376DEC' },
                        tabBarStyle: {
                            backgroundColor: '#212121',
                            height: 60
                        },
                        tabBarLabel: 'Trening',
                        tabBarLabelStyle: { marginBottom: 5 },
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 45,
                                height: 45,
                                marginBottom: 15
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Narzędzia"
                    component={ToolsScreen}
                    options={({ route }) => ({
                        headerStyle: { backgroundColor: '#376DEC' },
                        tabBarStyle: {
                            backgroundColor: '#212121',
                            height: 60
                        },
                        tabBarLabel: 'Narzędzia',
                        tabBarLabelStyle: { marginBottom: 5 },
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 25,
                                height: 25,
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Ustawienia"
                    component={SettingsScreen}
                    options={({ route }) => ({
                        headerStyle: { backgroundColor: '#376DEC' },
                        tabBarStyle: {
                            backgroundColor: '#212121',
                            height: 60
                        },
                        tabBarLabel: 'Ustawienia',
                        tabBarLabelStyle: { marginBottom: 5 },
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 25,
                                height: 25,
                            }} />
                        )
                    })
                    }
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}