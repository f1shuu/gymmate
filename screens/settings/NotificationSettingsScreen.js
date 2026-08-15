import { Text, View, ScrollView, TouchableOpacity, Alert, Platform, Switch } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '@expo/vector-icons/MaterialIcons';

import Container from '../../components/Container';
import Modal from '../../components/Modal';

import { cancelInactivityReminder, scheduleInactivityReminder } from '../../helpers/inactivityReminders';
import { cancelTrainingReminders, scheduleTrainingReminders } from '../../helpers/trainingReminders';
import DataController from '../../helpers/dataController';
import { useSettings } from '../../helpers/SettingsProvider';

const DAYS = [
    { value: 1, key: 'mondayShort' },
    { value: 2, key: 'tuesdayShort' },
    { value: 3, key: 'wednesdayShort' },
    { value: 4, key: 'thursdayShort' },
    { value: 5, key: 'fridayShort' },
    { value: 6, key: 'saturdayShort' },
    { value: 7, key: 'sundayShort' }
]

const createTime = (hour, minute) => {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
}

export default function NotificationSettingsScreen() {
    const { settings, theme, translate, updateSettings } = useSettings();
    const [enabled, setEnabled] = useState(settings.trainingRemindersEnabled ?? false);
    const [achievementPushEnabled, setAchievementPushEnabled] = useState(settings.achievementPushNotificationsEnabled !== false);
    const [inactivityEnabled, setInactivityEnabled] = useState(settings.inactivityRemindersEnabled ?? false);
    const [selectedDays, setSelectedDays] = useState(settings.trainingReminderDays ?? []);
    const [time, setTime] = useState(createTime(
        settings.trainingReminderHour ?? 18,
        settings.trainingReminderMinute ?? 0
    ))
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);

    const toggleDay = (day) => {
        setSelectedDays(currentDays => currentDays.includes(day) ? currentDays.filter(item => item !== day) : [...currentDays, day].sort((a, b) => a - b)
        )
    }

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (event.type !== 'dismissed' && selectedTime) setTime(selectedTime);
    }

    const configureInactivityReminder = async () => {
        if (!inactivityEnabled) {
            await cancelInactivityReminder();
            return true;
        }

        const history = await DataController.readDataSet('trainingHistory');
        const lastWorkout = [...history].filter(record => record.category === 'training_completed').sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))[0];
        return scheduleInactivityReminder({
            channelName: translate('inactivityReminders'),
            lastWorkoutAt: lastWorkout?.createdAt,
            title: translate('inactivityReminderTitle'),
            bodyTemplate: translate('inactivityReminderBody')
        })
    }

    const saveReminders = async () => {
        if (enabled && selectedDays.length === 0) {
            Alert.alert(translate('error'), translate('selectReminderDay'));
            return;
        }

        setIsSaving(true);
        try {
            if (enabled) {
                const permissionGranted = await scheduleTrainingReminders({
                    channelName: translate('trainingReminders'),
                    days: selectedDays,
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                    title: translate('trainingReminderTitle'),
                    body: translate('trainingReminderBody')
                })
                if (!permissionGranted) {
                    Alert.alert(translate('error'), translate('notificationPermissionDenied'));
                    return;
                }
            } else {
                await cancelTrainingReminders();
            }

            if (!await configureInactivityReminder()) {
                Alert.alert(translate('error'), translate('notificationPermissionDenied'));
                return;
            }

            const settingsSaved = await updateSettings({
                achievementPushNotificationsEnabled: achievementPushEnabled,
                inactivityRemindersEnabled: inactivityEnabled,
                trainingRemindersEnabled: enabled,
                trainingReminderDays: selectedDays,
                trainingReminderHour: time.getHours(),
                trainingReminderMinute: time.getMinutes()
            })

            if (settingsSaved) setIsConfirmationModalVisible(true);
        } catch (error) {
            console.error(error);
            Alert.alert(translate('error'), translate('reminderSaveError'));
        } finally {
            setIsSaving(false);
        }
    }

    const formattedTime = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;

    const styles = {
        card: {
            backgroundColor: theme.background,
            borderRadius: 10,
            padding: 18,
            marginBottom: 16
        },
        toggleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        title: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.textPrimary,
            marginRight: 12
        },
        description: {
            fontFamily: 'Nexa',
            fontSize: 13,
            lineHeight: 20,
            color: theme.textSecondary,
            marginTop: 10
        },
        sectionTitle: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary,
            marginBottom: 12
        },
        days: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8
        },
        day: {
            minWidth: 52,
            height: 42,
            borderRadius: 21,
            borderWidth: 1,
            borderColor: theme.tertiary,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12
        },
        selectedDay: {
            backgroundColor: theme.primary,
            borderColor: theme.primary
        },
        dayText: {
            fontFamily: 'Nexa',
            fontSize: 13,
            color: theme.textSecondary
        },
        timeButton: {
            height: 64,
            borderRadius: 10,
            backgroundColor: theme.background,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginBottom: 16
        },
        time: {
            fontFamily: 'Nexa',
            fontSize: 24,
            color: theme.textPrimary
        },
        saveButton: {
            minHeight: 54,
            borderRadius: 10,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isSaving ? 0.6 : 1
        },
        saveText: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textHeader
        }
    }

    const notificationToggle = (titleKey, descriptionKey, value, onValueChange) => (
        <View style={styles.card}>
            <View style={styles.toggleRow}>
                <Text style={styles.title}>{translate(titleKey)}</Text>
                <Switch
                    trackColor={{ false: theme.tertiary, true: theme.tertiary }}
                    thumbColor={value ? theme.primary : theme.textHeader}
                    value={value}
                    onValueChange={onValueChange}
                />
            </View>
            <Text style={styles.description}>{translate(descriptionKey)}</Text>
        </View>
    )

    return (
        <Container>
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                {notificationToggle('trainingReminders', 'trainingRemindersDescription', enabled, setEnabled)}

                <View style={[styles.card, { opacity: enabled ? 1 : 0.45 }]} pointerEvents={enabled ? 'auto' : 'none'}>
                    <Text style={styles.sectionTitle}>{translate('reminderDays')}</Text>
                    <View style={styles.days}>
                        {DAYS.map(day => {
                            const selected = selectedDays.includes(day.value);
                            return (
                                <TouchableOpacity
                                    key={day.value}
                                    style={[styles.day, selected && styles.selectedDay]}
                                    activeOpacity={0.8}
                                    onPress={() => toggleDay(day.value)}
                                >
                                    <Text style={[styles.dayText, selected && { color: theme.textHeader }]}>{translate(day.key)}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { opacity: enabled ? 1 : 0.45 }]}>{translate('reminderTime')}</Text>
                <TouchableOpacity
                    style={[styles.timeButton, { opacity: enabled ? 1 : 0.45 }]}
                    activeOpacity={0.8}
                    disabled={!enabled}
                    onPress={() => setShowTimePicker(true)}
                >
                    <Text style={styles.time}>{formattedTime}</Text>
                    <Icon name='schedule' size={28} color={theme.textPrimary} />
                </TouchableOpacity>

                {showTimePicker ? (
                    <DateTimePicker
                        value={time}
                        mode='time'
                        display={Platform.OS === 'ios' ? 'compact' : 'default'}
                        is24Hour={true}
                        onChange={handleTimeChange}
                    />
                ) : null}

                {notificationToggle(
                    'achievementNotifications',
                    'achievementNotificationsDescription',
                    achievementPushEnabled,
                    setAchievementPushEnabled
                )}
                {notificationToggle(
                    'inactivityReminders',
                    'inactivityRemindersDescription',
                    inactivityEnabled,
                    setInactivityEnabled
                )}

                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.8}
                    disabled={isSaving}
                    onPress={saveReminders}
                >
                    <Text style={styles.saveText}>{isSaving ? translate('saving') : translate('save')}</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                isVisible={isConfirmationModalVisible}
                text={translate('reminderSaved')}
                twoButtons={false}
                buttonOneText={translate('ok')}
                buttonOneOnPress={() => setIsConfirmationModalVisible(false)}
            />
        </Container>
    )
}