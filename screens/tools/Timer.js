import { Text, View } from 'react-native';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { TimerPicker } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Button from '../../components/buttons/Button';
import SetTimerButton from '../../components/buttons/SetTimerButton';

export default Timer = () => {
    const [showPicker, setShowPicker] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [initialValue, setInitialValue] = useState({ minutes: 0, seconds: 0 });
    const [key, setKey] = useState(0);
    const [completed, setCompleted] = useState(false);

    const setTime = (minutes, seconds, id) => {
        setIsActive(prevIndex => prevIndex === id ? null : id);
        setInitialValue({ minutes, seconds });
        setKey(prevKey => prevKey + 1);
        setMinutes(minutes);
        setSeconds(seconds);
    }

    const startTimer = (minutes, seconds) => {
        if (minutes === 0 && seconds === 0) { return; }
        else {
            setCompleted(false);
            setInitialValue({ minutes, seconds });
            setKey(prevKey => prevKey + 1);
            setShowPicker(false);
            setIsPlaying(true);
        }
    }

    return (
        <Container>
            {showPicker ? (
                <>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.labels}>
                            <Text style={styles.label}>Minuty</Text>
                            <Text style={styles.label}>Sekundy</Text>
                        </View>
                        <TimerPicker
                            key={key}
                            initialValue={{ minutes, seconds }}
                            hideHours={true}
                            minuteLabel=':'
                            secondLabel=''
                            minutes={minutes}
                            seconds={seconds}
                            onDurationChange={(duration) => {
                                const { minutes, seconds } = duration;
                                if (!(minutes === 1 && seconds === 0) && !(minutes === 5 && seconds === 0) && !(minutes === 10 && seconds === 0)) {
                                    setIsActive(null);
                                }
                                setMinutes(minutes);
                                setSeconds(seconds);
                            }}
                            LinearGradient={LinearGradient}
                            Haptics={Haptics}
                            styles={{
                                pickerContainer: {
                                    backgroundColor: Colors.background
                                },
                                pickerItem: {
                                    fontFamily: 'Nexa',
                                    fontSize: 64,
                                    color: Colors.button
                                },
                                pickerLabel: {
                                    backgroundColor: Colors.background,
                                    fontFamily: 'Nexa',
                                    fontSize: 64,
                                    color: Colors.button
                                },
                                pickerItemContainer: {
                                    width: 100,
                                    height: 80,
                                    marginHorizontal: 10,
                                    backgroundColor: Colors.background,
                                    right: -15
                                },
                                pickerLabelContainer: {
                                    top: -20,
                                    right: -35,
                                    alignItems: 'center'
                                }
                            }}
                        />
                    </View>
                </>
            ) : <View style={styles.timer}>
                <CountdownCircleTimer
                    key={key}
                    isPlaying={isPlaying}
                    duration={minutes * 60 + seconds}
                    colors={Colors.button}
                    colorsTime={[minutes * 60 + seconds, 0]}
                    size={300}
                    strokeWidth={15}
                    trailColor={Colors.primary}
                    onComplete={() => { setCompleted(true); }}
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            return <Text style={styles.timesUpText}>Czas minął</Text>
                        }
                        const mins = Math.floor(remainingTime / 60);
                        const secs = remainingTime % 60;
                        return <Text style={styles.timerText}>{`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`}</Text>
                    }}
                </CountdownCircleTimer>
            </View>}
            {showPicker ? (
                <>
                    <View style={styles.row}>
                        <SetTimerButton active={isActive === 1} time='01:00' onPress={() => setTime(1, 0, 1)} />
                        <SetTimerButton active={isActive === 2} time='05:00' onPress={() => setTime(5, 0, 2)} />
                        <SetTimerButton active={isActive === 3} time='10:00' onPress={() => setTime(10, 0, 3)} />
                    </View>
                    <Button onPress={() => startTimer(minutes, seconds)} text='Start' />
                </>
            ) : (
                <View style={styles.row}>
                    <Button onPress={() => { setShowPicker(true); }} text={completed ? 'Odrzuć' : 'Usuń'} />
                    <Button onPress={completed ? () => startTimer(minutes, seconds) : () => { if (!isPlaying) setIsPlaying(true); else setIsPlaying(false); }} text={completed ? 'Uruchom ponownie' : (isPlaying ? 'Wstrzymaj' : 'Wznów')} type='delete' />
                </View>
            )}
        </Container>
    )
}

const styles = {
    labels: {
        flexDirection: 'row'
    },
    label: {
        fontFamily: 'Nexa',
        fontSize: 20,
        color: Colors.white,
        marginHorizontal: 25,
        marginVertical: 10
    },
    timer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50
    },
    timesUpText: {
        fontFamily: 'Nexa',
        fontSize: 36,
        color: Colors.delete
    },
    timerText: {
        fontFamily: 'Nexa',
        fontSize: 56,
        color: Colors.button
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    }
}