import { Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ExercisesNavigator from './ExercisesNavigator';
import BodyMeasurementsNavigator from './BodyMeasurementsNavigator';
import HomeNavigator from './HomeNavigator';
import SettingsNavigator from './SettingsNavigator';
import ToolsNavigator from './ToolsNavigator';
import ProfileAvatar from '../ProfileAvatar';

import { useSettings } from '../../helpers/SettingsProvider';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    const { settings, theme, translate } = useSettings();

    const customOptions = {
        headerTitleStyle: {
            fontFamily: 'Nexa',
            fontSize: 24,
            color: theme.textHeader,
            marginTop: 10
        },
        headerStyle: {
            backgroundColor: theme.primary,
            height: 100,
            elevation: 0
        },
        tabBarStyle: {
            backgroundColor: theme.secondary,
            height: 80,
            paddingTop: 5,
            paddingHorizontal: 20,
            elevation: 0,
            borderTopWidth: 1,
            borderTopColor: theme.background
        }
    }

    const styles = {
        headerText: {
            fontFamily: 'Nexa',
            fontSize: 24,
            color: theme.textHeader,
            marginTop: 10,
            marginLeft: 20
        },
        navbarText: {
            fontFamily: 'Nexa',
            fontSize: 10,
            marginTop: 5
        },
        avatar: {
            marginTop: 10,
            marginRight: 20
        }
    }

    return (
        <Tab.Navigator initialRouteName='HomeNavigator' screenOptions={{ animationEnabled: false }}>
            <Tab.Screen
                name='ExercisesNavigator'
                component={ExercisesNavigator}
                options={() => ({
                    ...customOptions,
                    title: translate('exercisesScreenHeader'),
                    tabBarIcon: ({ focused }) => (
                        <Icon name='dumbbell' size={25} color={focused ? theme.primary : theme.tertiary} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={[styles.navbarText, { color: focused ? theme.primary : theme.tertiary }]}>{translate('exercisesScreenHeader')}</Text>
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
                    tabBarButton: () => null
                })
                }
            />
            <Tab.Screen
                name='HomeNavigator'
                component={HomeNavigator}
                options={({ navigation }) => ({
                    ...customOptions,
                    headerStyle: {
                        backgroundColor: theme.primary,
                        height: 100,
                        elevation: 0
                    },
                    title: '',
                    headerLeft: () => (
                        <Text style={styles.headerText}>{translate('greeting') + (settings.firstName ? settings.firstName : translate('guest'))}</Text>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('SettingsNavigator', { screen: 'NameScreen' })}>
                            <ProfileAvatar size={34} style={styles.avatar} />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Icon name='home' size={30} color={focused ? theme.primary : theme.tertiary} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={[styles.navbarText, { color: focused ? theme.primary : theme.tertiary }]}>{translate('start')}</Text>
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
                    tabBarButton: () => null
                })
                }
            />
            <Tab.Screen
                name='SettingsNavigator'
                component={SettingsNavigator}
                options={() => ({
                    ...customOptions,
                    title: translate('settingsScreenHeader'),
                    tabBarIcon: ({ focused }) => (
                        <Icon name='cog' size={25} color={focused ? theme.primary : theme.tertiary} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={[styles.navbarText, { color: focused ? theme.primary : theme.tertiary }]}>{translate('settings')}</Text>
                    )
                })
                }
            />
        </Tab.Navigator>
    )
}