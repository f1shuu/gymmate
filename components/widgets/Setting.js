import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Setting = () => {
    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };
    return (
        <TouchableOpacity onPress={clearAsyncStorage} style={styles.container}>
            <Text style={styles.text}>Usuń dane metryczne</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E1E1E1',
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 5,
        elevation: 10
    },
    text: {
        fontFamily: 'msb',
        color: '#FD5056',
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20,
        margin: 10
    }
});