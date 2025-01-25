import { Image } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../../Colors';
import ExercisesNavigator from './ExercisesNavigator';
import BodyMeasurementsNavigator from './BodyMeasurementsNavigator';
import HomeNavigator from './HomeNavigator';
import ToolsNavigator from './ToolsNavigator';
import SettingsScreen from '../../screens/navbar/SettingsScreen';

const Tab = createBottomTabNavigator();

const MyDarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Colors.background
    }
}

const customOptions = {
    headerTitleStyle: {
        fontFamily: 'Nexa',
        fontSize: 22,
        color: Colors.white
    },
    headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 0
    },
    tabBarStyle: {
        backgroundColor: Colors.primary,
        height: 60,
        paddingTop: 20,
        marginTop: -20,
        borderTopWidth: 0
    },
    tabBarLabel: ''
}

const getIconName = (routeName, focused) => {
    let iconName;

    switch (routeName) {
        case 'Ćwiczenia':
            iconName = focused ? require('../../assets/images/navbar/exercises-active.png') : require('../../assets/images/navbar/exercises-inactive.png');
            break;
        case 'Metryczka':
            iconName = focused ? require('../../assets/images/navbar/body-measurements-active.png') : require('../../assets/images/navbar/body-measurements-inactive.png');
            break;
        case 'Rozpocznij trening':
            iconName = focused ? require('../../assets/images/navbar/home-active.png') : require('../../assets/images/navbar/home-inactive.png');
            break;
        case 'Narzędzia':
            iconName = focused ? require('../../assets/images/navbar/tools-active.png') : require('../../assets/images/navbar/tools-inactive.png');
            break;
        case 'Ustawienia':
            iconName = focused ? require('../../assets/images/navbar/settings-active.png') : require('../../assets/images/navbar/settings-inactive.png');
            break;
    }

    return iconName;
}

export default function NavigationBar() {
    return (
        <NavigationContainer theme={MyDarkTheme}>
            <Tab.Navigator initialRouteName='Rozpocznij trening' screenOptions={{ cardStyle: { backgroundColor: Colors.background } }}>
                <Tab.Screen
                    name='Ćwiczenia'
                    component={ExercisesNavigator}
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
                    name='Metryczka'
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
                    name='Rozpocznij trening'
                    component={HomeNavigator}
                    options={({ route }) => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Image source={getIconName(route.name, focused)} style={{
                                width: 35,
                                height: 35,
                                marginBottom: 5
                            }} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name='Narzędzia'
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
                    name='Ustawienia'
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
    )
}