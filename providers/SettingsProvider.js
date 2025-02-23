import { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from "expo-localization";

import { translations } from '../constants/translations';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);

    const defaultSettings = {
        firstLaunch: true,
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
        else setSettings(JSON.parse(savedSettings));
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

    return (
        <SettingsContext.Provider value={{ settings, loadSettings, restoreDefault, translate, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext);
