import { Text } from 'react-native';
import { useState } from 'react';

import Colors from '../../../Colors';
import Container from '../../../components/Container';
import Background from '../../../components/Background';
import Dropdown from '../../../components/Dropdown';
import NavigationButtons from '../../../components/buttons/NavigationButtons';
import SegmentedButton from '../../../components/buttons/SegmentedButton';

export default function MuscleGroupScreen() {
    const [muscleGroup, setMuscleGroup] = useState('Wybierz grupę mięśni...');
    const [type, setType] = useState('Czasowe');
    const [isFocus, setIsFocus] = useState(false);

    const muscleGroups = [
        { value: 'Barki' },
        { value: 'Bicepsy' },
        { value: 'Brzuch (ABS)' },
        { value: 'Klatka piersiowa' },
        { value: 'Łydki' },
        { value: 'Plecy' },
        { value: 'Pośladki' },
        { value: 'Przedramiona' },
        { value: 'Szyja i kark' },
        { value: 'Tricepsy' },
        { value: 'Uda' }
    ]

    return (
        <Container>
            <Background text={false} />
            <Text style={styles.text}>Wybierz grupę mięśniową</Text>
            <Dropdown
                passedStyle={{ borderBottomLeftRadius: isFocus ? 0 : 15, borderBottomRightRadius: isFocus ? 0 : 15 }}
                data={muscleGroups}
                placeholder={isFocus ? '...' : muscleGroup}
                value={muscleGroup}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setMuscleGroup(item.value);
                    setIsFocus(false);
                }}
            />
            <Text style={styles.text}>Wybierz typ ćwiczenia</Text>
            <SegmentedButton option1='Powtórzeniowe' option2='Czasowe' />
            <NavigationButtons isFirst={false} isLast={false} firstOnPress='ExerciseNameScreen' secondOnPress='ExerciseDetailsScreen2' passedParameter={type} />
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
    helpText: {
        fontFamily: 'Nexa',
        fontSize: 14,
        color: Colors.secondary,
        textAlign: 'justify',
        marginVertical: 10
    }
}