import { isRunningInExpoGo } from 'expo';

// expo-notifications throws on Android Expo Go when the module loads
// (push token auto-registration side effect). Skip it entirely in Expo Go.
export const areNotificationsSupported = !isRunningInExpoGo();

let notificationsModule = null;

export const getNotifications = async () => {
    if (!areNotificationsSupported) return null;
    if (!notificationsModule) notificationsModule = await import('expo-notifications');
    return notificationsModule;
}

export const setupNotificationHandler = async () => {
    const Notifications = await getNotifications();
    if (!Notifications) return;

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false
        })
    })
}