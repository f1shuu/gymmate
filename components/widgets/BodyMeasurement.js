import { View, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

export default BodyMeasurement = (props) => {
    const [value, setValue] = useState(null);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
    ];

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select item'}
                renderLeftIcon={() => (
                    <Image
                        source={require('../../assets/measures/biceps-circumference.png')}
                        style={{ width: 60, height: 60, margin: 5 }}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2B2B2B',
        padding: 25,
        borderRadius: 15,
        margin: 10,
        marginBottom: 5
    },
    dropdown: {
        height: 100,
        backgroundColor: '#2B2B2B',
        borderRadius: 15,
        paddingHorizontal: 8,
    },
    itemText: {
        color: 'white',
        fontSize: 20
    },
    placeholderStyle: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center'
    }
});