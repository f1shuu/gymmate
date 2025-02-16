import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ExercisesNavigator from './ExercisesNavigator';
import BodyMeasurementsNavigator from './BodyMeasurementsNavigator';
import HomeNavigator from './HomeNavigator';
import SettingsNavigator from './SettingsNavigator';
import ToolsNavigator from './ToolsNavigator';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    const { translate } = useSettings();
    const { theme } = useTheme();

    const MyDarkTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme.background
        }
    }

    const customOptions = {
        headerTitleStyle: {
            fontFamily: 'Nexa',
            fontSize: 22,
            color: theme.textHeader
        },
        headerStyle: {
            backgroundColor: theme.primary,
            height: 70,
            elevation: 0
        },
        tabBarStyle: {
            backgroundColor: theme.secondary,
            elevation: 0,
            borderTopWidth: 0,
            marginTop: -15
        },
        tabBarLabel: ''
    }

    return (
        <NavigationContainer theme={MyDarkTheme}>
            <Tab.Navigator initialRouteName='HomeNavigator' screenOptions={{ animationEnabled: false }}>
                <Tab.Screen
                    name='ExercisesNavigator'
                    component={ExercisesNavigator}
                    options={() => ({
                        ...customOptions,
                        title: translate('exercisesScreenHeader'),
                        tabBarIcon: ({ focused }) => (
                            <Icon name="dumbbell" size={25} color={focused ? theme.primary : theme.tertiary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name='BodyMeasurementsNavigator'
                    component={BodyMeasurementsNavigator}
                    options={() => ({
                        ...customOptions,
                        title: translate('bodyMeasurementsScreenHeader'),
                        tabBarIcon: ({ focused }) => (
                            <Icon name="ruler-horizontal" size={25} color={focused ? theme.primary : theme.tertiary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name='HomeNavigator'
                    component={HomeNavigator}
                    options={() => ({
                        ...customOptions,
                        title: translate('homeScreenHeader'),
                        tabBarIcon: ({ focused }) => (
                            <Icon name="home" size={35} color={focused ? theme.primary : theme.tertiary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name='ToolsNavigator'
                    component={ToolsNavigator}
                    options={() => ({
                        ...customOptions,
                        title: translate('toolsScreenHeader'),
                        tabBarIcon: ({ focused }) => (
                            <Icon name="calculator" size={25} color={focused ? theme.primary : theme.tertiary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name='SettingsNavigator'
                    component={SettingsNavigator}
                    options={() => ({
                        ...customOptions,
                        title: translate('settings'),
                        tabBarIcon: ({ focused }) => (
                            <Icon name="cog" size={25} color={focused ? theme.primary : theme.tertiary} />
                        )
                    })
                    }
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}