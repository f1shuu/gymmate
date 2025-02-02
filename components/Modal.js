import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import Button from './buttons/Button';
import { useTheme } from '../providers/ThemeProvider';

export default function CustomModal({ isVisible, text, twoButtons, buttonOneText, buttonOneOnPress, buttonTwoText, buttonTwoOnPress }) {
    const { theme, toggleTheme } = useTheme();

    const styles = {
        modal: {
            backgroundColor: theme.background,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            margin: 0,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 18,
            color: theme.textPrimary,
            textAlign: 'center',
            marginHorizontal: 40
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20
        }
    }

    return (
        <Modal isVisible={isVisible} style={[styles.modal, { height: (twoButtons == true ? '30%' : '25%') }]} backdropTransitionOutTiming={1} >
            <Text style={styles.text}>{text}</Text>
            {twoButtons ? (<View style={styles.row}>
                <Button onPress={buttonOneOnPress} text={buttonOneText} type='delete' />
                <Button onPress={buttonTwoOnPress} text={buttonTwoText} />
            </View>) :
                <View style={styles.row}>
                    <Button onPress={buttonOneOnPress} text={buttonOneText} />
                </View>}
        </Modal >
    )
}
