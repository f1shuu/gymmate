import { useState, useContext, createContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import { cancelInactivityReminder } from './inactivityReminders';
import { cancelTrainingReminders } from './trainingReminders';
import { deleteProfileImage } from './profileImage';
import { translations } from '../constants/translations';

import * as themes from '../Themes';

const SettingsContext = createContext();
const ONBOARDING_STORAGE_KEY = 'onboardingVersion';
const CURRENT_ONBOARDING_VERSION = '1';

const showSettingsError = () => {
    Alert.alert(
        'Błąd ustawień / Settings error',
        'Nie udało się odczytać lub zapisać ustawień. Aplikacja użyje bezpiecznych wartości domyślnych. / Settings could not be read or saved. The app will use safe defaults.'
    )
}

export const SettingsProvider = ({ children }) => {
    const defaultSettings = {
        theme: 'GymMate',
        isHapticsOn: true,
        isSoundOn: true,
        units: 'metric',
        language: Localization.getLocales()[0]?.languageCode === 'pl' ? 'pl' : 'en',
        firstName: null,
        lastName: null,
        nickname: null,
        profileImageUri: null,
        achievementPushNotificationsEnabled: true,
        inactivityRemindersEnabled: false,
        trainingRemindersEnabled: false,
        trainingReminderDays: [],
        trainingReminderHour: 18,
        trainingReminderMinute: 0
    };

    const [settings, setSettings] = useState(null);
    const [theme, setTheme] = useState(themes.GymMate);
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
    const [isTrainingActive, setIsTrainingActive] = useState(false);

    const loadSettings = async () => {
        try {
            const [savedSettings, savedTheme, savedOnboardingVersion] = await Promise.all([
                AsyncStorage.getItem('settings'),
                AsyncStorage.getItem('theme'),
                AsyncStorage.getItem(ONBOARDING_STORAGE_KEY)
            ])

            let parsedSettings = {};
            if (savedSettings) {
                try {
                    parsedSettings = JSON.parse(savedSettings);
                    if (!parsedSettings || typeof parsedSettings !== 'object' || Array.isArray(parsedSettings)) throw new Error('Stored settings are not an object');
                } catch (error) {
                    console.error(error);
                    await AsyncStorage.setItem('settings:corrupted-backup', savedSettings);
                    await AsyncStorage.removeItem('settings');
                    showSettingsError();
                }
            }

            const hasLegacyTrainingStats = Object.prototype.hasOwnProperty.call(parsedSettings, 'trainingsTotal') || Object.prototype.hasOwnProperty.call(parsedSettings, 'liftedKgsTotal') || Object.prototype.hasOwnProperty.call(parsedSettings, 'longestStreak');
            delete parsedSettings.trainingsTotal;
            delete parsedSettings.liftedKgsTotal;
            delete parsedSettings.longestStreak;
            const loadedSettings = { ...defaultSettings, ...parsedSettings };
            if (!translations[loadedSettings.language]) loadedSettings.language = 'en';
            if (hasLegacyTrainingStats) await AsyncStorage.setItem('settings', JSON.stringify(loadedSettings));
            const themeName = themes[savedTheme] ? savedTheme : loadedSettings.theme;

            setSettings(loadedSettings);
            setTheme(themes[themeName] || themes.GymMate);
            setShouldShowOnboarding(savedOnboardingVersion !== CURRENT_ONBOARDING_VERSION);
        } catch (error) {
            console.error(error);
            setSettings(defaultSettings);
            setTheme(themes.GymMate);
            setShouldShowOnboarding(true);
            showSettingsError();
        }
    }

    const updateSettings = async (newSettings) => {
        const updatedSettings = { ...(settings || defaultSettings), ...newSettings };
        try {
            await AsyncStorage.setItem('settings', JSON.stringify(updatedSettings));
            setSettings(updatedSettings);
            return true;
        } catch (error) {
            console.error(error);
            showSettingsError();
            return false;
        }
    }

    const restoreDefault = async () => {
        try {
            const cleanupResults = await Promise.allSettled([
                cancelTrainingReminders(),
                cancelInactivityReminder(),
                deleteProfileImage(settings?.profileImageUri)
            ])
            cleanupResults.filter(result => result.status === 'rejected').forEach(result => console.error(result.reason));

            await AsyncStorage.multiRemove(['settings', 'theme']);
            setSettings(defaultSettings);
            setTheme(themes.GymMate);
        } catch (error) {
            console.error(error);
            showSettingsError();
        }
    }

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, CURRENT_ONBOARDING_VERSION);
            setShouldShowOnboarding(false);
            return true;
        } catch (error) {
            console.error(error);
            showSettingsError();
            return false;
        }
    }

    const restartOnboarding = async () => {
        try {
            await AsyncStorage.removeItem(ONBOARDING_STORAGE_KEY);
            setShouldShowOnboarding(true);
            return true;
        } catch (error) {
            console.error(error);
            showSettingsError();
            return false;
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
        <SettingsContext.Provider value={{ settings, theme, changeTheme, completeOnboarding, loadSettings, restartOnboarding, restoreDefault, shouldShowOnboarding, translate, updateSettings, isTrainingActive, setIsTrainingActive }}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext);