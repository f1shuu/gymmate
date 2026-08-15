import { Text, View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { MultiSelect } from 'react-native-element-dropdown';

import { useSettings } from '../helpers/SettingsProvider';

export default function CustomMultiSelect({ passedStyle, data, placeholder, value, onFocus, onBlur, onChange }) {
    const { theme } = useSettings();

    const styles = {
        dropdown: {
            width: '100%',
            minHeight: 50,
            backgroundColor: theme.background,
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginVertical: 10
        },
        container: {
            marginTop: -2,
            marginLeft: 1,
            backgroundColor: theme.background,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 0
        },
        itemText: {
            fontFamily: 'Nexa',
            color: theme.textPrimary
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
        },
        selectedItem: {
            minHeight: 36,
            maxWidth: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            borderRadius: 18,
            backgroundColor: theme.primary,
            paddingLeft: 13,
            paddingRight: 8,
            marginRight: 6,
            marginBottom: 6
        },
        selectedItemText: {
            flexShrink: 1,
            fontFamily: 'Nexa',
            fontSize: 13,
            color: theme.textHeader,
            marginRight: 6
        }
    }

    return (
        <MultiSelect
            style={[styles.dropdown, passedStyle]}
            containerStyle={styles.container}
            itemTextStyle={styles.itemText}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={{ ...styles.itemText, color: theme.textHeader }}
            activeColor={theme.primary}
            iconColor={theme.textSecondary}
            fontFamily='Nexa'
            data={data}
            labelField='label'
            valueField='value'
            placeholder={placeholder}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            alwaysRenderSelectedItem
            renderItem={(item, selected) => (
                <View style={styles.item}>
                    <Text style={[styles.itemText, { color: selected ? theme.textHeader : theme.textPrimary }]}>
                        {item.label}
                    </Text>
                </View>
            )}
            renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity
                    style={styles.selectedItem}
                    activeOpacity={0.8}
                    onPress={() => unSelect?.(item)}
                >
                    <Text numberOfLines={1} style={styles.selectedItemText}>{item.label}</Text>
                    <Icon name='close' size={17} color={theme.textHeader} />
                </TouchableOpacity>
            )}
        />
    )
}