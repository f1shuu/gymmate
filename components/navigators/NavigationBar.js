import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FE5Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from '../../Colors';
import ExercisesNavigator from './ExercisesNavigator';
import BodyMeasurementsNavigator from './BodyMeasurementsNavigator';
import HomeNavigator from './HomeNavigator';
import ToolsNavigator from './ToolsNavigator';
import SettingsNavigator from './SettingsNavigator';

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
        elevation: 0,
        height: 90
    },
    tabBarStyle: {
        backgroundColor: Colors.black,
        height: 60,
        marginTop: -25,
        borderTopWidth: 0
    },
    tabBarLabel: ''
}

export default function NavigationBar() {
    return (
        <NavigationContainer theme={MyDarkTheme}>
            <Tab.Navigator initialRouteName='Rozpocznij trening' screenOptions={{ cardStyle: { backgroundColor: Colors.background } }}>
                <Tab.Screen
                    name='Ćwiczenia'
                    component={ExercisesNavigator}
                    options={() => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <FE5Icon name="dumbbell" size={25} color={focused ? Colors.primary : Colors.secondary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name='Metryczka'
                    component={BodyMeasurementsNavigator}
                    options={() => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <FE5Icon name="ruler-horizontal" size={25} color={focused ? Colors.primary : Colors.secondary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name='Rozpocznij trening'
                    component={HomeNavigator}
                    options={() => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <FE5Icon name="home" size={35} color={focused ? Colors.primary : Colors.secondary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name='Narzędzia'
                    component={ToolsNavigator}
                    options={() => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <FE5Icon name="calculator" size={25} color={focused ? Colors.primary : Colors.secondary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name='Ustawienia'
                    component={SettingsNavigator}
                    options={() => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <FE5Icon name="cog" size={25} color={focused ? Colors.primary : Colors.secondary} />
                        )
                    })
                    }
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}