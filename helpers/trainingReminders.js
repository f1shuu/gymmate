import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_IDS_KEY = 'trainingReminderNotificationIds';
const CHANNEL_ID = 'training-reminders';

const readNotificationIds = async () => {
    const storedIds = await AsyncStorage.getItem(NOTIFICATION_IDS_KEY);
    if (!storedIds) return [];

    try {
        const parsedIds = JSON.parse(storedIds);
        return Array.isArray(parsedIds) ? parsedIds.filter(id => typeof id === 'string') : [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const cancelTrainingReminders = async () => {
    const notificationIds = await readNotificationIds();
    await Promise.all(notificationIds.map(id => Notifications.cancelScheduledNotificationAsync(id)));
    await AsyncStorage.removeItem(NOTIFICATION_IDS_KEY);
}

const requestNotificationPermission = async (channelName) => {
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

const toExpoWeekday = (day) => day === 7 ? 1 : day + 1;

export const scheduleTrainingReminders = async ({ channelName, days, hour, minute, title, body }) => {
    if (!await requestNotificationPermission(channelName)) return false;

    const previousNotificationIds = await readNotificationIds();
    const notificationIds = [];

    try {
        for (const day of days) {
            const id = await Notifications.scheduleNotificationAsync({
                content: { title, body, sound: 'default' },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
                    weekday: toExpoWeekday(day),
                    hour,
                    minute,
                    channelId: CHANNEL_ID
                }
            })
            notificationIds.push(id);
        }
        await Promise.all(previousNotificationIds.map(id => Notifications.cancelScheduledNotificationAsync(id)));
        await AsyncStorage.setItem(NOTIFICATION_IDS_KEY, JSON.stringify(notificationIds));
        return true;
    } catch (error) {
        await Promise.all(notificationIds.map(id => Notifications.cancelScheduledNotificationAsync(id)));
        throw error;
    }
}