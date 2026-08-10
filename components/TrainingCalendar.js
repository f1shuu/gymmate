import { Text, View } from 'react-native';

import { getMonthCalendar, toLocalDateKey } from '../helpers/trainingCalendar';
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

export default function TrainingCalendar({ compact = false, markedDates, month }) {
    const { theme, translate } = useSettings();
    const cells = getMonthCalendar(month);
    const todayKey = toLocalDateKey(new Date());

    const styles = {
        weekdays: {
            flexDirection: 'row',
            marginBottom: compact ? 2 : 6
        },
        weekday: {
            width: '14.2857%',
            fontFamily: 'Nexa',
            fontSize: compact ? 9 : 11,
            color: theme.textSecondary,
            textAlign: 'center'
        },
        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        cell: {
            width: '14.2857%',
            height: compact ? 25 : 38,
            alignItems: 'center',
            justifyContent: 'center'
        },
        day: {
            width: compact ? 22 : 32,
            height: compact ? 22 : 32,
            borderRadius: compact ? 11 : 16,
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
            fontSize: compact ? 10 : 13,
            color: theme.textPrimary
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
            <View style={styles.grid}>
                {cells.map((date, index) => {
                    if (!date) return <View key={`empty-${index}`} style={styles.cell} />;

                    const dateKey = toLocalDateKey(date);
                    const isMarked = markedDates.has(dateKey);
                    return (
                        <View key={dateKey} style={styles.cell}>
                            <View style={[
                                styles.day,
                                dateKey === todayKey && styles.today,
                                isMarked && styles.marked
                            ]}>
                                <Text style={[styles.dayText, isMarked && styles.markedText]}>{date.getDate()}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}