import { Text, TextInput } from 'react-native';
import { useState } from 'react';

import Colors from '../../../Colors';
import Container from '../../../components/Container';
import Background from '../../../components/Background';
import NavigationButtons from '../../../components/buttons/NavigationButtons';

export default function ExerciseNameScreen() {
    const [name, setName] = useState('');

    return (
        <Container>
            <Background text={false} />
            <Text style={styles.text}>Nadaj swojemu ćwiczeniu nazwę</Text>
            <TextInput
                style={styles.input}
                placeholder='np. Wyciskanie sztangi na ławce'
                placeholderTextColor={Colors.secondary}
                maxLength={6}
                fontSize={16}
                color={Colors.white}
                onChangeText={(text) => setName(text)}
                value={name} >
            </TextInput>
            <NavigationButtons isFirst={true} isLast={false} firstOnPress='ExerciseDetailsScreen1' />
        </Container>
    )
}

const styles = {
    text: {
        fontFamily: 'Nexa',
        fontSize: 18,
        color: Colors.white,
        marginVertical: 10
    },
    input: {
        width: '100%',
        backgroundColor: Colors.primary,
        height: 60,
        fontFamily: 'Nexa',
        fontSize: 16,
        color: Colors.white,
        borderRadius: 15,
        padding: 15,
        marginVertical: 10
    }
}