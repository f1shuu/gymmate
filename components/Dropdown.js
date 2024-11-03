import { Dropdown } from 'react-native-element-dropdown';

import Colors from '../Colors';

export default function CustomDropdown({ passedStyle, data, placeholder, value, onFocus, onBlur, onChange }) {
    return (
        <Dropdown
            style={[styles.dropdown, passedStyle]}
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            activeColor={Colors.button}
            data={data}
            labelField='value'
            valueField='value'
            placeholder={placeholder}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
        />
    )
}

const styles = {
    dropdown: {
        width: '100%',
        backgroundColor: Colors.primary,
        height: 60,
        borderRadius: 15,
        padding: 15,
        marginVertical: 10
    },
    containerStyle: {
        marginTop: -2,
        marginLeft: 1,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderWidth: 0
    },
    itemTextStyle: {
        fontFamily: 'Nexa',
        color: Colors.white,
        textAlign: 'center'
    },
    placeholderStyle: {
        fontFamily: 'Nexa',
        color: Colors.secondary
    },
    selectedTextStyle: {
        fontFamily: 'Nexa',
        color: Colors.white
    }
}