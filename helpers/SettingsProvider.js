import { Alert } from 'react-native';
import { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import * as themes from '../Themes';
import { translations } from '../constants/translations';

const SettingsContext = createContext();

const showSettingsError = () => {
    Alert.alert(
        'Błąd ustawień / Settings error',
        'Nie udało się odczytać lub zapisać ustawień. Aplikacja użyje bezpiecznych wartości domyślnych. / Settings could not be read or saved. The app will use safe defaults.'
    )
}

export const SettingsProvider = ({ children }) => {
    const defaultSettings = {
        firstLaunch: true,
        theme: 'GymMate',
        isHapticsOn: true,
        isSoundOn: true,
        units: 'metric',
        language: Localization.getLocales()[0]?.languageCode === 'pl' ? 'pl' : 'en',
        firstName: null,
        lastName: null,
        nickname: null,
        longestStreak: 0,
        trainingsTotal: 0,
        liftedKgsTotal: 0
    };

    const [settings, setSettings] = useState(null);
    const [theme, setTheme] = useState(themes.GymMate);

    const loadSettings = async () => {
        try {
            const [savedSettings, savedTheme] = await Promise.all([
                AsyncStorage.getItem('settings'),
                AsyncStorage.getItem('theme')
            ])

            let parsedSettings = {};
            if (savedSettings) {
                try {
                    parsedSettings = JSON.parse(savedSettings);
                    if (!parsedSettings || typeof parsedSettings !== 'object' || Array.isArray(parsedSettings)) {
                        throw new Error('Stored settings are not an object');
                    }
                } catch (error) {
                    console.error(error);
                    await AsyncStorage.setItem('settings:corrupted-backup', savedSettings);
                    await AsyncStorage.removeItem('settings');
                    showSettingsError();
                }
            }

            const loadedSettings = { ...defaultSettings, ...parsedSettings };
            if (!translations[loadedSettings.language]) loadedSettings.language = 'en';
            const themeName = themes[savedTheme] ? savedTheme : loadedSettings.theme;

            setSettings(loadedSettings);
            setTheme(themes[themeName] || themes.GymMate);
        } catch (error) {
            console.error(error);
            setSettings(defaultSettings);
            setTheme(themes.GymMate);
            showSettingsError();
        }
    }

    const updateSettings = async (newSettings) => {
        const updatedSettings = { ...(settings || defaultSettings), ...newSettings };
        try {
            await AsyncStorage.setItem('settings', JSON.stringify(updatedSettings));
            setSettings(updatedSettings);
        } catch (error) {
            console.error(error);
            showSettingsError();
        }
    }

    const restoreDefault = async () => {
        try {
            await AsyncStorage.multiRemove(['settings', 'theme']);
            setSettings(defaultSettings);
            setTheme(themes.GymMate);
        } catch (error) {
            console.error(error);
            showSettingsError();
        }
    }

    const translate = (key) => translations[settings?.language]?.[key] || translations.en[key] || key;

    const changeTheme = async (themeName) => {
        if (!themes[themeName]) return;

        try {
            await AsyncStorage.setItem('theme', themeName);
            setTheme(themes[themeName]);
        } catch (error) {
            console.error(error);
            showSettingsError();
        }
    }

    return (
        <SettingsContext.Provider value={{ settings, theme, changeTheme, loadSettings, restoreDefault, translate, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext);
