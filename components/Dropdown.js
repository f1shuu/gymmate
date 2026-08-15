import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { useSettings } from '../helpers/SettingsProvider';

export default function CustomDropdown({ passedStyle, data, labelField = 'value', placeholder, value, onFocus, onBlur, onChange }) {
    const { theme } = useSettings();

    const styles = {
        dropdown: {
            width: '100%',
            backgroundColor: theme.background,
            height: 50,
            borderRadius: 10,
            padding: 15,
            marginVertical: 10
        },
        container: {
            marginTop: -2,
            backgroundColor: theme.background,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 0,
            overflow: 'hidden'
        },
        itemText: {
            fontFamily: 'Nexa',
            color: theme.textPrimary,
        },
        placeholder: {
            fontFamily: 'Nexa',
            color: theme.textSecondary
        },
        item: {
            padding: 17,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
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
            dropdownPosition='bottom'
            maxHeight={260}
            data={data}
            labelField={labelField}
            valueField='value'
            placeholder={placeholder}
            value={value}
            selectedTextProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            renderItem={(item, selected) => (
                <View style={styles.item}>
                    <Text style={[styles.itemText, { color: selected ? theme.textHeader : theme.textPrimary }]}>
                        {item[labelField]}
                    </Text>
                </View>
            )}
        />
    )
}