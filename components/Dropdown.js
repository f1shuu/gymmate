import { Dropdown } from 'react-native-element-dropdown';

import { useSettings } from '../helpers/SettingsProvider';

export default function CustomDropdown({ passedStyle, data, placeholder, value, onFocus, onBlur, onChange }) {
    const { theme } = useSettings();
    
    const styles = {
        dropdown: {
            width: '100%',
            backgroundColor: theme.background,
            height: 60,
            borderRadius: 10,
            padding: 15,
            marginVertical: 10
        },
        container: {
            marginTop: -2,
            marginLeft: 1,
            backgroundColor: theme.background,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderWidth: 0
        },
        itemText: {
            fontFamily: 'Nexa',
            color: theme.textPrimary,
        },
        placeholder: {
            fontFamily: 'Nexa',
            color: theme.textSecondary
        }
    }

    return (
        <Dropdown
            style={[styles.dropdown, passedStyle]}
            containerStyle={styles.container}
            itemTextStyle={styles.itemText}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.itemText}
            activeColor={theme.primary}
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
