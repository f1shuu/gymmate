import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
const Workout = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Image
                    source={require('../assets/transparent.png')}
                    style={{ resizeMode: 'center', width: 40, height: 40, marginRight: 15 }}
                />
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#376DEC',
        padding: 25,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    itemText: {
        maxWidth: '80%',
        color: 'white',
        fontSize: 20
    }
});

export default Workout;