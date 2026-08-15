import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const CHANNEL_ID = 'achievement-unlocks';

export const sendAchievementNotification = async ({ channelName, title, body }) => {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
            name: channelName,
            importance: Notifications.AndroidImportance.DEFAULT,
            sound: 'default',
            vibrationPattern: [0, 250, 150, 250]
        })
    }

    let permissions = await Notifications.getPermissionsAsync();
    if (permissions.status !== 'granted') {
        permissions = await Notifications.requestPermissionsAsync({
            ios: { allowAlert: true, allowBadge: false, allowSound: true }
        })
    }
    if (permissions.status !== 'granted') return false;

    await Notifications.scheduleNotificationAsync({
        content: { title, body, sound: 'default' },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 1,
            channelId: CHANNEL_ID
        }
    })
    return true;
}