import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BodyMeasurement from '../../components/widgets/BodyMeasurement';

export default function BodyMeasurementsScreen() {
    const navigation = useNavigation();

    const navigateToAddBodyMeasurement = () => {
        navigation.navigate('AddBodyMeasurement');
    }

    return (
        <View style={styles.container}>
            <BodyMeasurement />
            <TouchableOpacity style={styles.add} onPress={navigateToAddBodyMeasurement}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141414',
        flex: 1
    },
    add: {
        backgroundColor: '#2B2B2B',
        margin: 10,
        marginTop: 5,
        borderRadius: 15
    },
    text: {
        color: '#BBBBBB',
        textAlign: 'center',
        paddingBottom: 6,
        fontSize: 50
    }
})