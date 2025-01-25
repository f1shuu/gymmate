import { View, Text, TouchableOpacity } from 'react-native';

import Colors from '../../Colors';

export default function SegmentedButton({ option1, option2, onOptionChange, selectedOption }) {
    const handleOptionChange = (option) => {
        if (onOptionChange) onOptionChange(option);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.segment, selectedOption === option1 ? styles.activeSegment : styles.inactiveSegment]}
                onPress={() => handleOptionChange(option1)}
                disabled={selectedOption === option1}
            >
                <Text style={selectedOption === option1 ? styles.activeText : styles.inactiveText}>{option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.segment, selectedOption === option2 ? styles.activeSegment : styles.inactiveSegment]}
                onPress={() => handleOptionChange(option2)}
                disabled={selectedOption === option2}
            >
                <Text style={selectedOption === option2 ? styles.activeText : styles.inactiveText}>{option2}</Text>
            </TouchableOpacity>
        </View>
    )
}

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
        backgroundColor: Colors.button
    },
    inactiveSegment: {
        backgroundColor: Colors.primary
    },
    activeText: {
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white
    },
    inactiveText: {
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.secondary
    }
}