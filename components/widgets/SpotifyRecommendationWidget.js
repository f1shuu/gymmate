import { Text, View, TouchableOpacity, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
    getAvailableSpotifyItems,
    getSpotifyItemAuthor,
    getSpotifyItemTitle,
    selectDailyItem,
    selectWeeklyItem
} from '../../helpers/spotifyRecommendations';
import { useSettings } from '../../helpers/SettingsProvider';

export default function SpotifyRecommendationWidget({ items, period, titleKey }) {
    const { settings, theme, translate } = useSettings();
    const availableItems = getAvailableSpotifyItems(items);
    const item = period === 'day' ? selectDailyItem(availableItems) : selectWeeklyItem(availableItems);
    const itemTitle = getSpotifyItemTitle(item, settings.language);
    const itemAuthor = getSpotifyItemAuthor(item);
    const quotedTitle = settings.language === 'pl' ? `„${itemTitle}”` : `“${itemTitle}”`;

    const openSpotify = async () => {
        if (!item) return;
        try {
            await Linking.openURL(item.url);
        } catch (error) {
            console.error(error);
            Alert.alert(translate('error'), translate('spotifyOpenError'));
        }
    }

    const styles = {
        widget: {
            width: '48.5%',
            height: 150,
            borderRadius: 10,
            backgroundColor: theme.background,
            padding: 14,
            justifyContent: 'space-between',
            opacity: item ? 1 : 0.65
        },
        topRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        icon: {
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: '#1DB954',
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            fontFamily: 'Nexa',
            fontSize: 14,
            color: theme.textPrimary
        },
        subtitle: {
            fontFamily: 'Nexa',
            fontSize: 11,
            lineHeight: 15,
            color: theme.textSecondary,
            marginTop: 3
        },
        author: {
            fontFamily: 'Nexa',
            fontSize: 10,
            color: theme.textSecondary,
            marginTop: 2
        }
    }

    return (
        <TouchableOpacity
            style={styles.widget}
            activeOpacity={item ? 0.8 : 1}
            disabled={!item}
            accessibilityRole={item ? 'link' : 'text'}
            onPress={openSpotify}
        >
            <View style={styles.topRow}>
                <View style={styles.icon}>
                    <Icon name='spotify' size={24} color='#FFFFFF' />
                </View>
                <Icon name='chevron-right' size={16} color={theme.textSecondary} />
            </View>
            <View>
                <Text style={styles.title}>{translate(titleKey)}</Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                    {item ? quotedTitle : translate('spotifyContentUnavailable')}
                </Text>
                {item ? <Text style={styles.author} numberOfLines={1}>{itemAuthor || '—'}</Text> : null}
            </View>
        </TouchableOpacity>
    )
}