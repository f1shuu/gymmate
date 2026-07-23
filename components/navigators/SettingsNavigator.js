import { createStackNavigator } from '@react-navigation/stack';

import ChangelogScreen from '../../screens/settings/ChangelogScreen';
import ContactScreen from '../../screens/settings/ContactScreen';
import DataDeletionScreen from '../../screens/settings/DataDeletionScreen';
import LanguageSelectionScreen from '../../screens/settings/LanguageSelectionScreen';
import NameScreen from '../../screens/settings/NameScreen';
import SettingsScreen from '../../screens/navbar/SettingsScreen';
import ThemeSelectionScreen from '../../screens/settings/ThemeSelectionScreen';
import TrainingsSettingsScreen from '../../screens/settings/TrainingsSettingsScreen';
import UnitsSelectionScreen from '../../screens/settings/UnitsSelectionScreen';

import { useSettings } from '../../helpers/SettingsProvider';

const Stack = createStackNavigator();

export default function SettingsNavigator() {
    const { theme, translate } = useSettings();

    const customOptions = {
        headerTintColor: theme.textHeader,
        headerStyle: {
            backgroundColor: theme.primary,
            elevation: 0
        },
        headerTitleStyle: {
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.textHeader
        }
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ChangelogScreen'
                component={ChangelogScreen}
                options={{
                    headerTitle: translate('changelog'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='ContactScreen'
                component={ContactScreen}
                options={{
                    headerTitle: translate('contact'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='DataDeletionScreen'
                component={DataDeletionScreen}
                options={{
                    headerTitle: translate('deleteData'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='LanguageSelectionScreen'
                component={LanguageSelectionScreen}
                options={{
                    headerTitle: translate('chooseLanguage'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='NameScreen'
                component={NameScreen}
                options={{
                    headerTitle: translate('editYourData'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='ThemeSelectionScreen'
                component={ThemeSelectionScreen}
                options={{
                    headerTitle: translate('chooseTheme'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='TrainingsSettingsScreen'
                component={TrainingsSettingsScreen}
                options={{
                    headerTitle: translate('trainingsScreenHeader'),
                    ...customOptions
                }}
            />
            <Stack.Screen
                name='UnitsSelectionScreen'
                component={UnitsSelectionScreen}
                options={{
                    headerTitle: translate('chooseUnits'),
                    ...customOptions
                }}
            />
        </Stack.Navigator>
    )
}