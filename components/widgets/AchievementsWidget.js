import { Text, View, TouchableOpacity } from 'react-native';
import { useCallback, useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { achievements } from '../../constants/achievements';
import { useAchievements } from '../../helpers/AchievementProvider';
import { useSettings } from '../../helpers/SettingsProvider';

export default function AchievementsWidget() {
    const { evaluateAchievements, unlockedAchievements } = useAchievements();
    const { theme, translate } = useSettings();
    const navigation = useNavigation();

    useFocusEffect(useCallback(() => {
        evaluateAchievements();
    }, [evaluateAchievements]))

    const displayedAchievements = useMemo(() => {
        const unlockedById = new Map(unlockedAchievements.map(record => [record.id, record]));
        const unlocked = [...unlockedAchievements].sort((first, second) => new Date(second.unlockedAt) - new Date(first.unlockedAt)).map(record => achievements.find(achievement => achievement.id === record.id)).filter(Boolean);
        const locked = achievements.filter(achievement => !unlockedById.has(achievement.id));
        return [...unlocked, ...locked].slice(0, 3);
    }, [unlockedAchievements])

    const unlockedIds = new Set(unlockedAchievements.map(record => record.id));

    const styles = {
        widget: {
            borderRadius: 10,
            backgroundColor: theme.background,
            padding: 15,
            marginBottom: 10
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8
        },
        icon: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12
        },
        name: {
            fontFamily: 'Nexa',
            fontSize: 14,
            color: theme.textPrimary
        },
        description: {
            fontFamily: 'Nexa',
            fontSize: 10,
            lineHeight: 14,
            color: theme.textSecondary,
            marginTop: 3
        },
        button: {
            minHeight: 42,
            borderRadius: 10,
            backgroundColor: theme.secondary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8
        },
        buttonText: {
            fontFamily: 'Nexa',
            fontSize: 13,
            color: theme.primary,
            marginRight: 4
        }
    }

    return (
        <View style={styles.widget}>
            {displayedAchievements.map(achievement => {
                const unlocked = unlockedIds.has(achievement.id);
                return (
                    <View key={achievement.id} style={styles.row}>
                        <View style={[styles.icon, { backgroundColor: unlocked ? theme.primary : theme.secondary }]}>
                            <Icon name={achievement.icon} size={22} color={unlocked ? theme.textHeader : theme.tertiary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.name}>{translate(achievement.nameKey)}</Text>
                            <Text style={styles.description}>{translate(achievement.descriptionKey)}</Text>
                        </View>
                    </View>
                )
            })}
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate('AchievementsScreen')}>
                <Text style={styles.buttonText}>{translate('seeAllAchievements')}</Text>
                <Icon name='chevron-right' size={20} color={theme.primary} />
            </TouchableOpacity>
        </View>
    )
}