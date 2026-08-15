import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_ID_KEY = 'inactivityReminderNotificationId';
const CHANNEL_ID = 'inactivity-reminders';
const INACTIVITY_DAYS = 5;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const cancelInactivityReminder = async () => {
    const notificationId = await AsyncStorage.getItem(NOTIFICATION_ID_KEY);
    if (notificationId) await Notifications.cancelScheduledNotificationAsync(notificationId);
    await AsyncStorage.removeItem(NOTIFICATION_ID_KEY);
}

const requestPermission = async (channelName) => {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
            name: channelName,
            importance: Notifications.AndroidImportance.DEFAULT,
            sound: 'default',
            vibrationPattern: [0, 250, 250, 250]
        })
    }

    let permissions = await Notifications.getPermissionsAsync();
    if (permissions.status !== 'granted') {
        permissions = await Notifications.requestPermissionsAsync({
            ios: { allowAlert: true, allowBadge: false, allowSound: true }
        })
    }
    return permissions.status === 'granted';
}

export const scheduleInactivityReminder = async ({ channelName, lastWorkoutAt, title, bodyTemplate }) => {
    if (!await requestPermission(channelName)) return false;

    const previousId = await AsyncStorage.getItem(NOTIFICATION_ID_KEY);
    const baseline = new Date(lastWorkoutAt || Date.now());
    const safeBaseline = Number.isNaN(baseline.getTime()) ? new Date() : baseline;
    const desiredDate = new Date(safeBaseline.getTime() + INACTIVITY_DAYS * DAY_IN_MS);
    const triggerDate = desiredDate.getTime() > Date.now() + 60_000 ? desiredDate : new Date(Date.now() + DAY_IN_MS);
    const daysSinceWorkout = Math.max(
        INACTIVITY_DAYS,
        Math.floor((triggerDate.getTime() - safeBaseline.getTime()) / DAY_IN_MS)
    )
    const body = bodyTemplate.replace('{count}', String(daysSinceWorkout));

    const notificationId = await Notifications.scheduleNotificationAsync({
        content: { title, body, sound: 'default' },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: triggerDate,
            channelId: CHANNEL_ID
        }
    })

    if (previousId) await Notifications.cancelScheduledNotificationAsync(previousId);
    await AsyncStorage.setItem(NOTIFICATION_ID_KEY, notificationId);
    return true;
}