import { Image } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import ExercisesScreen from '../../screens/navbar/ExercisesScreen';
import BodyMeasurementsNavigator from './BodyMeasurementsNavigator';
import HomeScreen from '../../screens/navbar/HomeScreen';
import ToolsNavigator from './ToolsNavigator';
import SettingsScreen from '../../screens/navbar/SettingsScreen';

const Tab = createBottomTabNavigator();

const customOptions = {
    headerTitleStyle: {
        fontFamily: 'Mona-Sans Bold',
        color: 'white',
        fontSize: 22
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
    },
    tabBarLabel: '',
}

const getIconName = (routeName, focused) => {
    let iconName;

    switch (routeName) {
        case 'Ćwiczenia':
            iconName = focused ? require('../../assets/navbar/exercises-active.png') : require('../../assets/navbar/exercises-inactive.png');
            break;
        case 'Metryczka':
            iconName = focused ? require('../../assets/navbar/body-measurements-active.png') : require('../../assets/navbar/body-measurements-inactive.png');
            break;
        case 'Trening':
            iconName = focused ? require('../../assets/navbar/training-active.png') : require('../../assets/navbar/training-inactive.png');
            break;
        case 'Narzędzia':
            iconName = focused ? require('../../assets/navbar/tools-active.png') : require('../../assets/navbar/tools-inactive.png');
            break;
        case 'Ustawienia':
            iconName = focused ? require('../../assets/navbar/settings-active.png') : require('../../assets/navbar/settings-inactive.png');
            break;
    }

    return iconName;
}

export default function NavigationBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Trening" screenOptions={{ cardStyle: { backgroundColor: '#141414' } }}>
                <Tab.Screen
                    name="Ćwiczenia"
                    component={ExercisesScreen}
                    options={({ route }) => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Metryczka"
                    component={BodyMeasurementsNavigator}
                    options={({ route }) => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Trening"
                    component={HomeScreen}
                    options={({ route }) => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 55,
                                height: 55,
                                marginBottom: 15
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Narzędzia"
                    component={ToolsNavigator}
                    options={({ route }) => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name="Ustawienia"
                    component={SettingsScreen}
                    options={({ route }) => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5
                            }} />
                        )
                    })
                    }
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}