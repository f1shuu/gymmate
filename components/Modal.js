import { Text, View, Modal as NativeModal, Pressable } from 'react-native';

import Button from './buttons/Button';

import { useSettings } from '../helpers/SettingsProvider';

export default function CustomModal({ isVisible, text, twoButtons, buttonOneText, buttonOneOnPress, buttonTwoText, buttonTwoOnPress }) {
    const { theme } = useSettings();
    const closeAction = twoButtons ? buttonTwoOnPress : buttonOneOnPress;

    const styles = {
        backdrop: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            justifyContent: 'flex-end'
        },
        dismissArea: {
            flex: 1
        },
        modal: {
            backgroundColor: theme.background,
            width: '100%',
            minHeight: 200,
            paddingHorizontal: 25,
            paddingTop: 15,
            paddingBottom: 25,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: 'center',
            gap: 15
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.textPrimary,
            textAlign: 'center',
            marginHorizontal: 15
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
            gap: 15
        }
    }

    return (
        <NativeModal
            transparent
            visible={isVisible}
            animationType='fade'
            statusBarTranslucent
            onRequestClose={closeAction}
        >
            <View style={styles.backdrop}>
                <Pressable style={styles.dismissArea} onPress={closeAction} />
                <View style={styles.modal}>
                    <Text style={styles.text}>{text}</Text>
                    {twoButtons ? (
                        <View style={styles.row}>
                            <Button onPress={buttonOneOnPress} text={buttonOneText} type='delete' />
                            <Button onPress={buttonTwoOnPress} text={buttonTwoText} />
                        </View>
                    ) : (
                        <View style={styles.row}>
                            <Button onPress={buttonOneOnPress} text={buttonOneText} />
                        </View>
                    )}
                </View>
            </View>
        </NativeModal>
    )
}