import { Text, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';

import { useSettings } from '../../providers/SettingsProvider';
import { useTheme } from '../../providers/ThemeProvider';

export default function NameScreen() {
    const { settings, translate, updateSettings } = useSettings();
    const { theme } = useTheme();

    const [firstName, setFirstName] = useState(settings.firstName);
    const [lastName, setLastName] = useState(settings.lastName);
    const [nickname, setNickname] = useState(settings.nickname);

    const navigation = useNavigation();

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
            borderRadius: 15,
            padding: 15,
            marginVertical: 10
        }
    }

    const saveAndReturn = (firstName, lastName, nickname) => {
        updateSettings({
            'firstName': firstName,
            'lastName': lastName,
            'nickname': nickname
        });
        navigation.navigate('SettingsScreen');
    }

    return (
        <Container>
            <Text style={styles.text}>{translate('firstName')}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.textSecondary}
                maxLength={20}
                placeholder={translate('firstNamePlaceholder')}
                value={firstName ? firstName : settings.firstName}
                onChangeText={(text) => setFirstName(text)}
            />
            <Text style={styles.text}>{translate('lastName')}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.textSecondary}
                maxLength={20}
                placeholder={translate('lastNamePlaceholder')}
                value={lastName ? lastName : settings.lastName}
                onChangeText={(text) => setLastName(text)}
            />
            <Text style={styles.text}>{translate('nickname')}</Text>
            <TextInput
                style={[styles.input, { marginBottom: 40 }]}
                placeholderTextColor={theme.textSecondary}
                maxLength={20}
                placeholder={translate('nicknamePlaceholder')}
                value={nickname ? nickname : settings.nickname}
                onChangeText={(text) => setNickname(text)}
            />
            <Button onPress={() => saveAndReturn(firstName, lastName, nickname)} text={translate('save')} />
        </Container>
    )
}