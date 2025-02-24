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
        language: Localization.getLocales()[0].languageCode,
        firstName: null,
        lastName: null,
        nickname: null
    }

    const loadSettings = async () => {
        const savedSettings = await AsyncStorage.getItem('settings');

        if (!savedSettings) setSettings(defaultSettings);
        else {
            setSettings(JSON.parse(savedSettings));
            if (themes[theme]) setTheme(themes[theme]);
        }
    }

    const updateSettings = async (newSettings) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        try {
            await AsyncStorage.setItem('settings', JSON.stringify(updatedSettings));
        } catch (error) {
            console.error(error);
        }
    }

    const restoreDefault = async () => {
        await AsyncStorage.removeItem('settings');
        setSettings(defaultSettings);
    }

    const translate = (key) => translations[settings.language][key] || key;

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
