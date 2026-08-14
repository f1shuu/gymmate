import { Text, View, TouchableOpacity } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import Colors from '../../Colors';

import TrainingCalendar from '../TrainingCalendar';

import DataController from '../../helpers/dataController';
import {
    addMonths,
    compareMonths,
    getCurrentWeeklyStreak,
    getLocalizedMonthTitle,
    getMonthTrainingData,
    getStreakWeekKeys,
    startOfMonth
} from '../../helpers/trainingCalendar';
import { useSettings } from '../../helpers/SettingsProvider';

const MONTH_RANGE = 12;

export default function TrainingCalendarWidget() {
    const { settings, theme, translate } = useSettings();
    const currentMonth = useMemo(() => startOfMonth(), []);
    const minimumMonth = useMemo(() => addMonths(currentMonth, -MONTH_RANGE), [currentMonth]);
    const maximumMonth = useMemo(() => addMonths(currentMonth, MONTH_RANGE), [currentMonth]);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [history, setHistory] = useState([]);
    const { count, markedDates } = getMonthTrainingData(history, selectedMonth);
    const streakWeekKeys = getStreakWeekKeys(history);
    const weeklyStreak = getCurrentWeeklyStreak(history);
    const streakText = translate('weeklyStreak').replace('{count}', weeklyStreak);
    const canGoBack = compareMonths(selectedMonth, minimumMonth) > 0;
    const canGoForward = compareMonths(selectedMonth, maximumMonth) < 0;

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            DataController.readDataSet('trainingHistory').then(data => {
                if (isActive) setHistory(data);
            })
            return () => { isActive = false; };
        }, [])
    )

    const styles = {
        widget: {
            minHeight: 285,
            borderRadius: 10,
            backgroundColor: theme.background,
            padding: 15,
            marginBottom: 10
        },
        header: {
            marginBottom: 10
        },
        title: {
            fontFamily: 'Nexa',
            fontSize: 17,
            color: theme.textPrimary,
            marginBottom: 8
        },
        monthNavigation: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        arrow: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: theme.secondary,
            alignItems: 'center',
            justifyContent: 'center'
        },
        month: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 12,
            color: theme.textSecondary,
            textAlign: 'center',
            paddingHorizontal: 4
        },
        summary: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 11,
            gap: 10
        },
        monthlyCount: {
            flex: 1,
            backgroundColor: theme.secondary,
            fontFamily: 'Nexa',
            fontSize: 11,
            color: theme.textSecondary,
            textAlign: 'center',
            borderRadius: 10,
            marginRight: 2.5,
            paddingVertical: 7.5
        },
        count: {
            fontSize: 11,
            color: theme.primary
        },
        streak: {
            flex: 1,
            backgroundColor: theme.secondary,
            fontFamily: 'Nexa',
            fontSize: 11,
            textAlign: 'center',
            borderRadius: 10,
            marginLeft: 2.5,
            paddingVertical: 7.5
        },
        activeStreak: {
            color: Colors.orange
        },
        inactiveStreak: {
            color: theme.textSecondary
        }
    }

    return (
        <View style={styles.widget} accessibilityLabel={translate('trainingCalendar')}>
            <View style={styles.header}>
                <Text style={styles.title}>{translate('trainingCalendar')}</Text>
                <View style={styles.monthNavigation}>
                    <TouchableOpacity
                        style={[styles.arrow, { opacity: canGoBack ? 1 : 0.35 }]}
                        activeOpacity={0.8}
                        disabled={!canGoBack}
                        accessibilityRole='button'
                        accessibilityLabel={translate('previousMonth')}
                        onPress={() => setSelectedMonth(month => addMonths(month, -1))}
                    >
                        <Icon name='chevron-left' size={22} color={theme.textSecondary} />
                    </TouchableOpacity>
                    <Text style={styles.month} numberOfLines={1}>
                        {getLocalizedMonthTitle(selectedMonth, settings.language)}
                    </Text>
                    <TouchableOpacity
                        style={[styles.arrow, { opacity: canGoForward ? 1 : 0.35 }]}
                        activeOpacity={0.8}
                        disabled={!canGoForward}
                        accessibilityRole='button'
                        accessibilityLabel={translate('nextMonth')}
                        onPress={() => setSelectedMonth(month => addMonths(month, 1))}
                    >
                        <Icon name='chevron-right' size={22} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>
            </View>
            <TrainingCalendar
                markedDates={markedDates}
                month={selectedMonth}
                streakWeekKeys={streakWeekKeys}
            />
            <View style={styles.summary}>
                <Text style={styles.monthlyCount}>
                    <Text style={styles.count}>{count}</Text> {translate('trainingsThisMonth')}
                </Text>
                <Text style={[
                    styles.streak,
                    weeklyStreak > 0 ? styles.activeStreak : styles.inactiveStreak
                ]}>
                    {streakText}{weeklyStreak > 0 ? ' 🔥' : ''}
                </Text>
            </View>
        </View>
    )
}