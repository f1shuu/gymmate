import { Text, View, StyleSheet } from 'react-native';
import Setting from '../../components/widgets/Setting';

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Setting />
            <Text style={styles.text}>Wersja beta 0.6.4</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'
    },
    text: {
        color: '#BBB',
        textAlign: 'center',
        marginBottom: 10
    }
})