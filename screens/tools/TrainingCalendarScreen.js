import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import Container from '../../components/Container';
import TrainingCalendar from '../../components/TrainingCalendar';

import {
    addMonths,
    compareMonths,
    getLocalizedMonthTitle,
    getMonthTrainingData,
    startOfMonth
} from '../../helpers/trainingCalendar';
import DataController from '../../helpers/dataController';
import { useSettings } from '../../helpers/SettingsProvider';

const MONTH_RANGE = 12;

export default function TrainingCalendarScreen() {
    const { settings, theme, translate } = useSettings();
    const currentMonth = useMemo(() => startOfMonth(), []);
    const minimumMonth = useMemo(() => addMonths(currentMonth, -MONTH_RANGE), [currentMonth]);
    const maximumMonth = useMemo(() => addMonths(currentMonth, MONTH_RANGE), [currentMonth]);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [history, setHistory] = useState([]);
    const { count, markedDates } = getMonthTrainingData(history, selectedMonth);
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
        scrollContent: {
            paddingBottom: 30
        },
        card: {
            borderRadius: 10,
            backgroundColor: theme.background,
            padding: 14
        },
        monthNavigation: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16
        },
        arrow: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.secondary,
            alignItems: 'center',
            justifyContent: 'center'
        },
        monthTitle: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 17,
            color: theme.textPrimary,
            textAlign: 'center',
            paddingHorizontal: 6
        },
        contentRow: {
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: 10
        },
        calendar: {
            flex: 1
        },
        summary: {
            width: 78,
            borderRadius: 10,
            backgroundColor: theme.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 7
        },
        count: {
            fontFamily: 'Nexa',
            fontSize: 32,
            color: theme.primary
        },
        countLabel: {
            fontFamily: 'Nexa',
            fontSize: 10,
            lineHeight: 14,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 5
        }
    }

    return (
        <Container gradient={0.85}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.monthNavigation}>
                        <TouchableOpacity
                            style={[styles.arrow, { opacity: canGoBack ? 1 : 0.35 }]}
                            disabled={!canGoBack}
                            accessibilityLabel={translate('previousMonth')}
                            onPress={() => setSelectedMonth(month => addMonths(month, -1))}
                        >
                            <Icon name='chevron-left' size={28} color={theme.textPrimary} />
                        </TouchableOpacity>
                        <Text style={styles.monthTitle}>{getLocalizedMonthTitle(selectedMonth, settings.language)}</Text>
                        <TouchableOpacity
                            style={[styles.arrow, { opacity: canGoForward ? 1 : 0.35 }]}
                            disabled={!canGoForward}
                            accessibilityLabel={translate('nextMonth')}
                            onPress={() => setSelectedMonth(month => addMonths(month, 1))}
                        >
                            <Icon name='chevron-right' size={28} color={theme.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contentRow}>
                        <View style={styles.calendar}>
                            <TrainingCalendar markedDates={markedDates} month={selectedMonth} />
                        </View>
                        <View style={styles.summary}>
                            <Text style={styles.count}>{count}</Text>
                            <Text style={styles.countLabel}>{translate('trainingsThisMonth')}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}