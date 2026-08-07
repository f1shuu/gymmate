import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { useSettings } from '../helpers/SettingsProvider';

export default function ProfileAvatar({ onPress, showEditBadge = false, size = 100, style }) {
    const { settings, theme } = useSettings();
    const [imageError, setImageError] = useState(false);

    useEffect(() => setImageError(false), [settings.profileImageUri]);

    const styles = {
        avatar: {
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center'
        },
        image: {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.background
        },
        editBadge: {
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: Math.max(26, size * 0.28),
            height: Math.max(26, size * 0.28),
            borderRadius: size,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }

    const content = (
        <View style={[styles.avatar, style]}>
            {settings.profileImageUri && !imageError ? (
                <Image
                    source={{ uri: settings.profileImageUri }}
                    style={styles.image}
                    onError={() => setImageError(true)}
                />
            ) : (
                <Icon name='account-circle' size={size} color={theme.textHeader} />
            )}
            {showEditBadge ? (
                <View style={styles.editBadge}>
                    <Icon name='photo-camera' size={Math.max(15, size * 0.16)} color={theme.textHeader} />
                </View>
            ) : null}
        </View>
    )

    return onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>{content}</TouchableOpacity>
    ) : content
}