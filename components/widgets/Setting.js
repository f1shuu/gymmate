import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default Setting = ({ onPress, name }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2a2a2a',
        padding: 24,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 5
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: '#edf2fb',
        fontSize: 20,
    },
});