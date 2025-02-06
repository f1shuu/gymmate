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
            height: 60,
            elevation: 0,
            borderTopWidth: 0
        },
        tabBarLabel: ''
    }

    return (
        <NavigationContainer theme={MyDarkTheme}>
            <Tab.Navigator initialRouteName={translate('homeScreenHeader')} screenOptions={{ animationEnabled: false }}>
                <Tab.Screen
                    name={translate('exercisesScreenHeader')}
                    component={ExercisesNavigator}
                    options={() => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Icon name="dumbbell" size={25} color={focused ? theme.primary : theme.tertiary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name={translate('bodyMeasurementsScreenHeader')}
                    component={BodyMeasurementsNavigator}
                    options={() => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Icon name="ruler-horizontal" size={25} color={focused ? theme.primary : theme.tertiary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name={translate('homeScreenHeader')}
                    component={HomeNavigator}
                    options={() => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Icon name="home" size={35} color={focused ? theme.primary : theme.tertiary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name={translate('toolsScreenHeader')}
                    component={ToolsNavigator}
                    options={() => ({
                        ...customOptions,
                        tabBarIcon: ({ focused }) => (
                            <Icon name="calculator" size={25} color={focused ? theme.primary : theme.tertiary} />
                        )
                    })
                    }
                />
                <Tab.Screen
                    name={translate('settings')}
                    component={SettingsNavigator}
                    options={() => ({
                        ...customOptions,
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