import { Text, View, TouchableOpacity } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import TrainingCalendar from '../TrainingCalendar';

import DataController from '../../helpers/dataController';
import { getLocalizedMonthTitle, getMonthTrainingData, startOfMonth } from '../../helpers/trainingCalendar';
import { useSettings } from '../../helpers/SettingsProvider';

export default function TrainingCalendarWidget() {
    const { settings, theme, translate } = useSettings();
    const navigation = useNavigation();
    const [history, setHistory] = useState([]);
    const month = startOfMonth();
    const { count, markedDates } = getMonthTrainingData(history, month);

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
            minHeight: 218,
            borderRadius: 10,
            backgroundColor: theme.background,
            padding: 15,
            marginBottom: 10
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10
        },
        title: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 17,
            color: theme.textPrimary
        },
        month: {
            fontFamily: 'Nexa',
            fontSize: 12,
            color: theme.textSecondary,
            marginTop: 3
        },
        count: {
            minWidth: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 12
        },
        countText: {
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.primary
        }
    }

    return (
        <TouchableOpacity
            style={styles.widget}
            activeOpacity={0.8}
            accessibilityRole='button'
            accessibilityLabel={translate('trainingCalendar')}
            onPress={() => navigation.navigate('TrainingCalendarScreen')}
        >
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{translate('trainingCalendar')}</Text>
                    <Text style={styles.month}>{getLocalizedMonthTitle(month, settings.language)}</Text>
                </View>
                <View style={styles.count}>
                    <Text style={styles.countText}>{count}</Text>
                </View>
                <Icon name='chevron-right' size={26} color={theme.textSecondary} />
            </View>
            <TrainingCalendar compact markedDates={markedDates} month={month} />
        </TouchableOpacity>
    )
}