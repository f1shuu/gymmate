import { Text, View } from 'react-native';
import { useState } from 'react';

import Colors from '../../../Colors';
import Container from '../../../components/Container';
import Background from '../../../components/Background';
import Dropdown from '../../../components/Dropdown';
import NavigationButtons from '../../../components/buttons/NavigationButtons';

export default function ExerciseDetailsScreen2({ route }) {
    const { type } = route.params;

    const [time, setTime] = useState('60 s');
    const [set, setSet] = useState('4');
    const [rep, setRep] = useState('10');
    const [restTime, setRestTime] = useState('30 s');
    const [weight, setWeight] = useState('...');

    const [isDropdown0Focused, setIsDropdown0Focused] = useState(false);
    const [isDropdown1Focused, setIsDropdown1Focused] = useState(false);
    const [isDropdown2Focused, setIsDropdown2Focused] = useState(false);
    const [isDropdown3Focused, setIsDropdown3Focused] = useState(false);
    const [isDropdown4Focused, setIsDropdown4Focused] = useState(false);

    const times = [
        { value: '30 s' },
        { value: '45 s' },
        { value: '60 s' },
        { value: '90 s' },
        { value: '120 s' },
        { value: '150 s' },
        { value: '180 s' },
        { value: '240 s' },
        { value: '300 s' }
    ]

    const sets = [
        { value: '1' },
        { value: '2' },
        { value: '3' },
        { value: '4' },
        { value: '5' },
        { value: '6' },
        { value: '7' },
        { value: '8' },
        { value: '9' },
        { value: '10' }
    ]

    const reps = [
        { value: '3' },
        { value: '5' },
        { value: '8' },
        { value: '10' },
        { value: '12' },
        { value: '15' },
        { value: '20' }
    ]

    const restTimes = [
        { value: '30 s' },
        { value: '45 s' },
        { value: '60 s' },
        { value: '90 s' },
        { value: '120 s' },
        { value: '150 s' },
        { value: '180 s' }
    ]

    const weights = [
        { value: '2.5 kg' },
        { value: '5 kg' },
        { value: '7.5 kg' },
        { value: '10 kg' },
        { value: '15 kg' },
        { value: '20 kg' },
        { value: '25 kg' },
        { value: '30 kg' },
        { value: '35 kg' },
        { value: '40 kg' },
        { value: '45 kg' },
        { value: '50 kg' },
        { value: '55 kg' },
        { value: '60 kg' },
        { value: '65 kg' },
        { value: '70 kg' },
        { value: '75 kg' },
        { value: '80 kg' },
        { value: '85 kg' },
        { value: '90 kg' },
        { value: '95 kg' },
        { value: '100 kg' }
    ]

    return (
        <Container>
            <Background text={false} />
            {type === 'Powtórzeniowe' ? (
                <>
                    <View style={styles.row}>
                        <Text style={styles.text}>Ilość serii</Text>
                        <Dropdown
                            passedStyle={{ width: '20%', borderBottomLeftRadius: isDropdown1Focused ? 0 : 15, borderBottomRightRadius: isDropdown1Focused ? 0 : 15 }}
                            data={sets}
                            placeholder={isDropdown1Focused ? '...' : set}
                            value={set}
                            onFocus={() => setIsDropdown1Focused(true)}
                            onBlur={() => setIsDropdown1Focused(false)}
                            onChange={item => {
                                setSet(item.value);
                                setIsDropdown1Focused(false);
                            }}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Ilość powtórzeń</Text>
                        <Dropdown
                            passedStyle={{ width: '20%', borderBottomLeftRadius: isDropdown2Focused ? 0 : 15, borderBottomRightRadius: isDropdown2Focused ? 0 : 15 }}
                            data={reps}
                            placeholder={isDropdown2Focused ? '...' : rep}
                            value={rep}
                            onFocus={() => setIsDropdown2Focused(true)}
                            onBlur={() => setIsDropdown2Focused(false)}
                            onChange={item => {
                                setRep(item.value);
                                setIsDropdown2Focused(false);
                            }}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Odpoczynek między seriami</Text>
                        <Dropdown
                            passedStyle={{ width: '25%', borderBottomLeftRadius: isDropdown3Focused ? 0 : 15, borderBottomRightRadius: isDropdown3Focused ? 0 : 15 }}
                            data={restTimes}
                            placeholder={isDropdown3Focused ? '...' : restTime}
                            value={restTime}
                            onFocus={() => setIsDropdown3Focused(true)}
                            onBlur={() => setIsDropdown3Focused(false)}
                            onChange={item => {
                                setRestTime(item.value);
                                setIsDropdown3Focused(false);
                            }}
                        />
                    </View>
                </>) : (
                <>
                    <View style={styles.row}>
                        <Text style={styles.text}>Czas</Text>
                        <Dropdown
                            passedStyle={{ width: '30%', borderBottomLeftRadius: isDropdown0Focused ? 0 : 15, borderBottomRightRadius: isDropdown0Focused ? 0 : 15 }}
                            data={times}
                            placeholder={isDropdown0Focused ? '...' : time}
                            value={time}
                            onFocus={() => setIsDropdown0Focused(true)}
                            onBlur={() => setIsDropdown0Focused(false)}
                            onChange={item => {
                                setTime(item.value);
                                setIsDropdown0Focused(false);
                            }}
                        />
                    </View>
                </>)}
            <View style={styles.row}>
                <Text style={styles.text}>Obciążenie (opc.)</Text>
                <Dropdown
                    passedStyle={{ width: '30%', borderBottomLeftRadius: isDropdown4Focused ? 0 : 15, borderBottomRightRadius: isDropdown4Focused ? 0 : 15 }}
                    data={weights}
                    placeholder={isDropdown4Focused ? '...' : weight}
                    value={weight}
                    onFocus={() => setIsDropdown4Focused(true)}
                    onBlur={() => setIsDropdown4Focused(false)}
                    onChange={item => {
                        setWeight(item.value);
                        setIsDropdown4Focused(false);
                    }}
                />
            </View>
            <NavigationButtons isFirst={false} isLast={true} firstOnPress='ExerciseDetailsScreen1' secondOnPress='ExerciseDetailsScreen' />
        </Container>
    )
}

const styles = {
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Nexa',
        fontSize: 18,
        color: Colors.white
    }
}