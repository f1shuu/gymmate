import { View, Text, TouchableOpacity } from 'react-native';

import { useSettings } from '../../helpers/SettingsProvider';

export default function SegmentedButton({ option1, option2, onOptionChange, selectedOption }) {
    const { theme } = useSettings();
    
    const styles = {
        container: {
            flexDirection: 'row',
            borderRadius: 15,
            overflow: 'hidden',
            marginVertical: 10
        },
        segment: {
            flex: 1,
            paddingVertical: 15,
            alignItems: 'center'
        },
        activeSegment: {
            backgroundColor: theme.primary
        },
        inactiveSegment: {
            backgroundColor: theme.background
        },
        activeText: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textHeader
        },
        inactiveText: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textSecondary
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => { if (onOptionChange) onOptionChange(option1) }}
                style={[styles.segment, selectedOption === option1 ? styles.activeSegment : styles.inactiveSegment]}
                disabled={selectedOption === option1}
                activeOpacity={0.8}
            >
                <Text style={selectedOption === option1 ? styles.activeText : styles.inactiveText}>{option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { if (onOptionChange) onOptionChange(option2) }}
                style={[styles.segment, selectedOption === option2 ? styles.activeSegment : styles.inactiveSegment]}
                disabled={selectedOption === option2}
                activeOpacity={0.8}
            >
                <Text style={selectedOption === option2 ? styles.activeText : styles.inactiveText}>{option2}</Text>
            </TouchableOpacity>
        </View>
    )
}
