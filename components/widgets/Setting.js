import { View, Text, StyleSheet } from 'react-native';

export default Setting = (props) => {
    const { name } = props;

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.name}>{name}</Text>
            </View>
        </View>
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