import { Text, View, Animated } from 'react-native';
import { useState, useEffect, createContext, useCallback, useContext, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons/MaterialIcons';

import { achievements } from '../constants/achievements';
import DataController from './dataController';
import { getStreakWeekKeys, getTrainingTotals } from './trainingCalendar';
import { sendAchievementNotification } from './achievementNotifications';
import { useSettings } from './SettingsProvider';

const STORAGE_KEY = 'achievements';
const AchievementContext = createContext();

function AchievementBanner({ achievement, onHide }) {
    const { theme, translate } = useSettings();
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true })
        ]).start()

        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: -20, duration: 220, useNativeDriver: true })
            ]).start(onHide)
        }, 4200)

        return () => clearTimeout(timer);
    }, [achievement.id, onHide, opacity, translateY])

    const styles = {
        container: {
            position: 'absolute',
            top: 42,
            left: 14,
            right: 14,
            zIndex: 1000,
            elevation: 20,
            opacity,
            transform: [{ translateY }]
        },
        card: {
            minHeight: 84,
            borderRadius: 14,
            backgroundColor: theme.background,
            borderWidth: 1,
            borderColor: theme.primary,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 14
        },
        icon: {
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12
        },
        eyebrow: {
            fontFamily: 'Nexa',
            fontSize: 10,
            color: theme.primary,
            marginBottom: 3
        },
        name: {
            fontFamily: 'Nexa',
            fontSize: 15,
            color: theme.textPrimary
        },
        description: {
            fontFamily: 'Nexa',
            fontSize: 11,
            lineHeight: 16,
            color: theme.textSecondary,
            marginTop: 3
        }
    }

    return (
        <Animated.View style={styles.container} pointerEvents='none'>
            <View style={styles.card}>
                <View style={styles.icon}>
                    <Icon name={achievement.icon} size={26} color={theme.textHeader} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.eyebrow}>{translate('achievementUnlocked')}</Text>
                    <Text style={styles.name}>{translate(achievement.nameKey)}</Text>
                    <Text style={styles.description}>{translate(achievement.descriptionKey)}</Text>
                </View>
            </View>
        </Animated.View>
    )
}

export const AchievementProvider = ({ children }) => {
    const { settings, translate } = useSettings();
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [bannerQueue, setBannerQueue] = useState([]);
    const [activeBanner, setActiveBanner] = useState(null);
    const unlockedRef = useRef([]);
    const initializedRef = useRef(false);
    const evaluationLock = useRef(false);

    const evaluateAchievements = useCallback(async () => {
        if (!settings || evaluationLock.current) return [];
        evaluationLock.current = true;

        try {
            const [exercises, measurements, trainingHistory] = await Promise.all([
                DataController.readDataSet('exercises'),
                DataController.readDataSet('bodyMeasurements'),
                DataController.readDataSet('trainingHistory')
            ])
            const totals = getTrainingTotals(trainingHistory);
            const metrics = {
                exercisesCount: exercises.length,
                measurementsCount: measurements.length,
                streakWeeksCount: getStreakWeekKeys(trainingHistory).size,
                ...totals
            }
            const unlockedIds = new Set(unlockedRef.current.map(item => item.id));
            const unlockedAt = new Date().toISOString();
            const newlyUnlocked = achievements.filter(achievement => !unlockedIds.has(achievement.id) && achievement.isUnlocked(metrics)).map(achievement => ({ id: achievement.id, unlockedAt }))

            if (newlyUnlocked.length === 0) return [];

            const persistedRecords = newlyUnlocked.map(({ id, unlockedAt: timestamp }) => ({ id, unlockedAt: timestamp }));
            const updatedRecords = [...unlockedRef.current, ...persistedRecords];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
            unlockedRef.current = updatedRecords;
            setUnlockedAchievements(updatedRecords);

            const unlockedDefinitions = newlyUnlocked.map(record => achievements.find(achievement => achievement.id === record.id)).filter(Boolean);
            setBannerQueue(queue => [...queue, ...unlockedDefinitions]);

            if (settings.achievementPushNotificationsEnabled !== false) {
                Promise.allSettled(unlockedDefinitions.map(achievement => sendAchievementNotification({
                    channelName: translate('achievementNotifications'),
                    title: `${translate('achievementUnlocked')}: ${translate(achievement.nameKey)}`,
                    body: translate(achievement.descriptionKey)
                }))).then(results => results.filter(result => result.status === 'rejected').forEach(result => console.error(result.reason)))
            }

            return persistedRecords;
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            evaluationLock.current = false;
        }
    }, [settings, translate])

    useEffect(() => {
        if (!settings || initializedRef.current) return;
        initializedRef.current = true;

        const initialize = async () => {
            let storedAchievements = [];
            const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedValue) {
                try {
                    const parsedValue = JSON.parse(storedValue);
                    if (!Array.isArray(parsedValue)) throw new Error('Stored achievements are not an array');
                    const validRecords = parsedValue.filter(record => (
                        achievements.some(achievement => achievement.id === record?.id) && !Number.isNaN(new Date(record?.unlockedAt).getTime())
                    ))
                    storedAchievements = [...new Map(validRecords.map(record => [record.id, record])).values()]
                } catch (error) {
                    console.error(error);
                    await AsyncStorage.setItem(`${STORAGE_KEY}:corrupted-backup`, storedValue);
                    await AsyncStorage.removeItem(STORAGE_KEY);
                }
            }

            unlockedRef.current = storedAchievements;
            setUnlockedAchievements(storedAchievements);
            await evaluateAchievements();
        }

        initialize().catch(console.error).finally(() => setIsInitialized(true));
    }, [evaluateAchievements, settings])

    useEffect(() => {
        if (activeBanner || bannerQueue.length === 0) return;
        setActiveBanner(bannerQueue[0]);
        setBannerQueue(queue => queue.slice(1));
    }, [activeBanner, bannerQueue])

    const hideBanner = useCallback(() => setActiveBanner(null), []);

    const resetAchievements = useCallback(async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
        unlockedRef.current = [];
        setUnlockedAchievements([]);
        setBannerQueue([]);
        setActiveBanner(null);
    }, [])

    return (
        <AchievementContext.Provider value={{ evaluateAchievements, resetAchievements, unlockedAchievements }}>
            {isInitialized ? children : null}
            {activeBanner ? (
                <AchievementBanner achievement={activeBanner} onHide={hideBanner} />
            ) : null}
        </AchievementContext.Provider>
    )
}

export const useAchievements = () => useContext(AchievementContext);