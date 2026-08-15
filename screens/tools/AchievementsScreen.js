import { Text, View, FlatList } from 'react-native';
import { useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { achievements } from '../../constants/achievements';
import Container from '../../components/Container';
import { useAchievements } from '../../helpers/AchievementProvider';
import { useSettings } from '../../helpers/SettingsProvider';

export default function AchievementsScreen() {
    const { evaluateAchievements, unlockedAchievements } = useAchievements();
    const { settings, theme, translate } = useSettings();

    useFocusEffect(useCallback(() => {
        evaluateAchievements();
    }, [evaluateAchievements]))

    const unlockedById = useMemo(
        () => new Map(unlockedAchievements.map(record => [record.id, record])),
        [unlockedAchievements]
    )
    const dateLocale = settings.language === 'pl' ? 'pl-PL' : 'en-US';

    const styles = {
        card: {
            minHeight: 104,
            borderRadius: 12,
            backgroundColor: theme.background,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            marginBottom: 10
        },
        icon: {
            width: 58,
            height: 58,
            borderRadius: 29,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14
        },
        name: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary
        },
        description: {
            fontFamily: 'Nexa',
            fontSize: 12,
            lineHeight: 17,
            color: theme.textSecondary,
            marginTop: 4
        },
        status: {
            fontFamily: 'Nexa',
            fontSize: 10,
            color: theme.primary,
            marginTop: 6
        }
    }

    return (
        <Container>
            <FlatList
                data={achievements}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 28 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const unlockedRecord = unlockedById.get(item.id);
                    return (
                        <View style={[styles.card, !unlockedRecord && { opacity: 0.55 }]}>
                            <View style={[styles.icon, { backgroundColor: unlockedRecord ? theme.primary : theme.secondary }]}>
                                <Icon name={item.icon} size={30} color={unlockedRecord ? theme.textHeader : theme.tertiary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.name}>{translate(item.nameKey)}</Text>
                                <Text style={styles.description}>{translate(item.descriptionKey)}</Text>
                                <Text style={styles.status}>
                                    {unlockedRecord
                                        ? `${translate('unlockedOn')} ${new Date(unlockedRecord.unlockedAt).toLocaleDateString(dateLocale)}`
                                        : translate('achievementLocked')}
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
        </Container>
    )
}