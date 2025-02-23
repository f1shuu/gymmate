import { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from "expo-localization";

import { translations } from '../constants/translations';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        firstLaunch: true,
        isHapticsOn: true,
        isSoundOn: true,
        units: 'metric',
        language: Localization.getLocales()[0].languageCode,
        firstName: '',
        lastName: '',
        nickname: ''
    })

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSettings = await AsyncStorage.getItem('settings');
                if (savedSettings) setSettings(JSON.parse(savedSettings));
            } catch (error) {
                console.error(error);
            }
        }
        loadSettings();
    }, [])

    const updateSettings = async (newSettings) => {
        setSettings({ ...settings, ...newSettings });
        try {
            await AsyncStorage.setItem('settings', JSON.stringify({ ...settings, ...newSettings }));
        } catch (error) {
            console.error(error);
        }
    }

    const translate = (key) => translations[settings.language][key] || key;

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, translate }}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext);
