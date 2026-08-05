import { Text, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';

import { useSettings } from '../../helpers/SettingsProvider';

export default function NameScreen() {
    const { settings, theme, translate, updateSettings } = useSettings();

    const [firstName, setFirstName] = useState(settings.firstName ?? '');
    const [lastName, setLastName] = useState(settings.lastName ?? '');
    const [nickname, setNickname] = useState(settings.nickname ?? '');

    const navigation = useNavigation();

    const saveAndReturn = async () => {
        await updateSettings({
            firstName: firstName.trim() || null,
            lastName: lastName.trim() || null,
            nickname: nickname.trim() || null
        })
        navigation.navigate('SettingsScreen');
    }

    const styles = {
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
        }
    }

    return (
        <Container>
            <Text style={styles.text}>{translate('firstName')}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.textSecondary}
                maxLength={20}
                placeholder={translate('firstNamePlaceholder')}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
            />
            <Text style={styles.text}>{translate('lastName')}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.textSecondary}
                maxLength={20}
                placeholder={translate('lastNamePlaceholder')}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
            />
            <Text style={styles.text}>{translate('nickname')}</Text>
            <TextInput
                style={[styles.input, { marginBottom: 40 }]}
                placeholderTextColor={theme.textSecondary}
                maxLength={20}
                placeholder={translate('nicknamePlaceholder')}
                value={nickname}
                onChangeText={(text) => setNickname(text)}
            />
            <Button
                onPress={saveAndReturn}
                text={translate('save')}
                type='small'
            />
        </Container>
    )
}