import { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from "expo-localization";

import * as themes from '../Themes';
import { translations } from '../constants/translations';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [theme, setTheme] = useState(themes.GymMate);

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
    }

    const loadSettings = async () => {
        const savedSettings = await AsyncStorage.getItem('settings');
        const savedTheme = await AsyncStorage.getItem('theme');
        const parsedSettings = savedSettings ? JSON.parse(savedSettings) : {};
        const loadedSettings = { ...defaultSettings, ...parsedSettings };
        if (!translations[loadedSettings.language]) loadedSettings.language = 'en';
        const themeName = savedTheme || loadedSettings.theme;

        setSettings(loadedSettings);
        if (themes[themeName]) setTheme(themes[themeName]);
    }

    const updateSettings = async (newSettings) => {
        const updatedSettings = { ...(settings || defaultSettings), ...newSettings };
        setSettings(updatedSettings);
        try {
            await AsyncStorage.setItem('settings', JSON.stringify(updatedSettings));
        } catch (error) {
            console.error(error);
        }
    }

    const restoreDefault = async () => {
        await AsyncStorage.multiRemove(['settings', 'theme']);
        setSettings(defaultSettings);
        setTheme(themes.GymMate);
    }

    const translate = (key) => translations[settings?.language]?.[key] || translations.en[key] || key;

    const changeTheme = async (themeName) => {
        if (themes[themeName]) {
            setTheme(themes[themeName]);
            try {
                await AsyncStorage.setItem('theme', themeName);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <SettingsContext.Provider value={{ settings, theme, changeTheme, loadSettings, restoreDefault, translate, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext);
