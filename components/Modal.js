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
            minHeight: twoButtons ? 220 : 190,
            paddingHorizontal: 20,
            paddingTop: 30,
            paddingBottom: 24,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: 'center'
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.textPrimary,
            textAlign: 'center',
            marginHorizontal: 20
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20
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
