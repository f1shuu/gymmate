import { Text, View } from 'react-native';

import Colors from '../Colors';

import { getMonthCalendar, getMonthWeekKeys, toLocalDateKey } from '../helpers/trainingCalendar';
import { useSettings } from '../helpers/SettingsProvider';

const WEEKDAY_KEYS = [
    'mondayShort',
    'tuesdayShort',
    'wednesdayShort',
    'thursdayShort',
    'fridayShort',
    'saturdayShort',
    'sundayShort'
]

export default function TrainingCalendar({ markedDates, month, streakWeekKeys = new Set() }) {
    const { theme, translate } = useSettings();
    const cells = getMonthCalendar(month);
    const weekKeys = getMonthWeekKeys(month);
    const weeks = Array.from({ length: 6 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
    const todayKey = toLocalDateKey(new Date());

    const styles = {
        weekdays: {
            flexDirection: 'row',
            marginBottom: 2
        },
        weekday: {
            width: '14.2857%',
            fontFamily: 'Nexa',
            fontSize: 9,
            color: theme.textSecondary,
            textAlign: 'center'
        },
        week: {
            height: 25,
            flexDirection: 'row',
            borderRadius: 6
        },
        streakWeek: {
            backgroundColor: Colors.orange,
            borderRadius: 6
        },
        cell: {
            width: '14.2857%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        day: {
            width: 22,
            height: 22,
            borderRadius: 11,
            alignItems: 'center',
            justifyContent: 'center'
        },
        today: {
            borderWidth: 1,
            borderColor: theme.tertiary
        },
        marked: {
            backgroundColor: theme.primary,
            borderColor: theme.primary
        },
        dayText: {
            fontFamily: 'Nexa',
            fontSize: 10,
            color: theme.textPrimary
        },
        streakDayText: {
            color: Colors.black
        },
        markedText: {
            color: theme.textHeader
        }
    }

    return (
        <View>
            <View style={styles.weekdays}>
                {WEEKDAY_KEYS.map(key => (
                    <Text key={key} style={styles.weekday}>{translate(key)}</Text>
                ))}
            </View>
            {weeks.map((week, weekIndex) => {
                const isStreakWeek = streakWeekKeys.has(weekKeys[weekIndex]);
                return (
                    <View
                        key={weekKeys[weekIndex]}
                        style={[styles.week, isStreakWeek && styles.streakWeek]}
                    >
                    {week.map((date, dayIndex) => {
                        if (!date) return <View key={`empty-${weekIndex}-${dayIndex}`} style={styles.cell} />;

                        const dateKey = toLocalDateKey(date);
                        const isMarked = markedDates.has(dateKey);
                        return (
                            <View key={dateKey} style={styles.cell}>
                                <View style={[
                                    styles.day,
                                    dateKey === todayKey && styles.today,
                                    isMarked && styles.marked
                                ]}>
                                    <Text style={[
                                        styles.dayText,
                                        isStreakWeek && !isMarked && styles.streakDayText,
                                        isMarked && styles.markedText
                                    ]}>{date.getDate()}</Text>
                                </View>
                            </View>
                        )
                    })}
                    </View>
                )
            })}
        </View>
    )
}