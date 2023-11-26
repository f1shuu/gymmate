import { View, Text, Image, StyleSheet } from 'react-native';

export default Tool = (props) => {
    const { name, icon } = props;

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Image
                    source={icon}
                    style={{ width: 128, height: 128, marginRight: 15 }}
                />
                <View style={styles.text}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2a2a2a',
        padding: 32,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 10
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        maxWidth: '70%',
    },
    name: {
        color: '#edf2fb',
        fontSize: 24,
    },
});