import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';
import ProfileAvatar from '../../components/ProfileAvatar';

import { useSettings } from '../../helpers/SettingsProvider';
import { deleteProfileImage, saveProfileImage } from '../../helpers/profileImage';

export default function NameScreen() {
    const { settings, theme, translate, updateSettings } = useSettings();

    const [firstName, setFirstName] = useState(settings.firstName ?? '');
    const [lastName, setLastName] = useState(settings.lastName ?? '');
    const [nickname, setNickname] = useState(settings.nickname ?? '');
    const [isChangingPhoto, setIsChangingPhoto] = useState(false);

    const navigation = useNavigation();

    const chooseProfileImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert(translate('error'), translate('photoPermissionDenied'));
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8
        })
        if (result.canceled || !result.assets?.[0]) return;

        setIsChangingPhoto(true);
        let newImageUri = null;
        try {
            newImageUri = await saveProfileImage(result.assets[0]);
            const previousImageUri = settings.profileImageUri;
            const saved = await updateSettings({ profileImageUri: newImageUri });

            if (!saved) {
                await deleteProfileImage(newImageUri);
                return;
            }
            await deleteProfileImage(previousImageUri);
        } catch (error) {
            console.error(error);
            if (newImageUri) await deleteProfileImage(newImageUri).catch(console.error);
            Alert.alert(translate('error'), translate('profilePhotoError'));
        } finally {
            setIsChangingPhoto(false);
        }
    }

    const removeProfileImage = async () => {
        const previousImageUri = settings.profileImageUri;
        if (!previousImageUri) return;

        const saved = await updateSettings({ profileImageUri: null });
        if (saved) await deleteProfileImage(previousImageUri).catch(console.error);
    }

    const saveAndReturn = async () => {
        const saved = await updateSettings({
            firstName: firstName.trim() || null,
            lastName: lastName.trim() || null,
            nickname: nickname.trim() || null
        })
        if (saved) navigation.navigate('SettingsScreen');
    }

    const styles = {
        content: {
            paddingBottom: 25
        },
        avatarSection: {
            alignItems: 'center',
            marginBottom: 22
        },
        photoAction: {
            fontFamily: 'Nexa',
            fontSize: 14,
            color: theme.primary,
            marginTop: 12
        },
        removePhoto: {
            fontFamily: 'Nexa',
            fontSize: 13,
            color: theme.textSecondary,
            marginTop: 8
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.textPrimary,
            marginVertical: 5
        },
        input: {
            width: '100%',
            backgroundColor: theme.background,
            height: 60,
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textPrimary,
            borderRadius: 10,
            padding: 15,
            marginVertical: 10
        },
        privacy: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 8,
            marginTop: 20,
            paddingHorizontal: 8
        },
        privacyText: {
            flex: 1,
            fontFamily: 'Nexa',
            fontSize: 12,
            lineHeight: 18,
            color: theme.textSecondary
        }
    }

    return (
        <Container>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.avatarSection}>
                    <ProfileAvatar size={112} showEditBadge onPress={isChangingPhoto ? undefined : chooseProfileImage} />
                    <TouchableOpacity disabled={isChangingPhoto} onPress={chooseProfileImage} activeOpacity={0.8}>
                        <Text style={styles.photoAction}>
                            {isChangingPhoto
                                ? translate('saving')
                                : translate(settings.profileImageUri ? 'changeProfilePhoto' : 'addProfilePhoto')}
                        </Text>
                    </TouchableOpacity>
                    {settings.profileImageUri ? (
                        <TouchableOpacity onPress={removeProfileImage} activeOpacity={0.8}>
                            <Text style={styles.removePhoto}>{translate('removeProfilePhoto')}</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>

                <Text style={styles.text}>{translate('firstName')}</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={theme.textSecondary}
                    maxLength={20}
                    placeholder={translate('firstNamePlaceholder')}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <Text style={styles.text}>{translate('lastName')}</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={theme.textSecondary}
                    maxLength={20}
                    placeholder={translate('lastNamePlaceholder')}
                    value={lastName}
                    onChangeText={setLastName}
                />
                <Text style={styles.text}>{translate('nickname')}</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={theme.textSecondary}
                    maxLength={20}
                    placeholder={translate('nicknamePlaceholder')}
                    value={nickname}
                    onChangeText={setNickname}
                />

                <View style={styles.privacy}>
                    <Icon name='lock-outline' size={17} color={theme.textSecondary} />
                    <Text style={styles.privacyText}>{translate('localProfileDataNotice')}</Text>
                </View>

                <Button onPress={saveAndReturn} text={translate('save')} type='small' />
            </ScrollView>
        </Container>
    )
}