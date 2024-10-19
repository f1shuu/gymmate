import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { LinearGradient } from 'expo-linear-gradient';
import { TimerPicker } from 'react-native-timer-picker';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export default Timer = () => {
    const [showPicker, setShowPicker] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [initialValue, setInitialValue] = useState({ minutes: 0, seconds: 0 });
    const [key, setKey] = useState(0);

    const pauseOrResume = () => {
        if (!isPlaying) setIsPlaying(true);
        else setIsPlaying(false);
    }

    const setTime = (minutes, seconds, id) => {
        setIsActive(prevIndex => prevIndex === id ? null : id);
        setInitialValue({ minutes, seconds });
        setKey(prevKey => prevKey + 1);
        setMinutes(minutes);
        setSeconds(seconds);
    };

    const startTimer = (minutes, seconds) => {
        if (minutes === 0 && seconds === 0) { return; }
        else {
            setShowPicker(false);
            setIsPlaying(true);
        }
    }

    return (
        <View style={styles.container}>
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
                            minuteLabel={':'}
                            secondLabel={''}
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
                            clickSoundAsset={require("../../assets/sounds/click.wav")}
                            Audio={Audio}
                            LinearGradient={LinearGradient}
                            Haptics={Haptics}
                            styles={{
                                pickerItem: {
                                    fontFamily: 'msb',
                                    fontSize: 80,
                                    color: '#376DEC',
                                },
                                pickerLabel: {
                                    fontFamily: 'msb',
                                    fontSize: 80,
                                    color: '#376DEC',
                                },
                                pickerContainer: {
                                    marginRight: 6,
                                },
                                pickerItemContainer: {
                                    width: 150,
                                    height: 100,
                                },
                                pickerLabelContainer: {
                                    top: -20,
                                    right: -26,
                                    width: 40,
                                    alignItems: "center",
                                },
                            }}
                        />
                    </View>
                </>
            ) : <View>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={minutes * 60 + seconds}
                    colors={['#6430D2', '#376DEC']}
                    colorsTime={[minutes * 60 + seconds, 0]}
                    size={300}
                    strokeWidth={40}
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            return <Text style={styles.timesUpText}>Czas minął</Text>;
                        }
                        const mins = Math.floor(remainingTime / 60);
                        const secs = remainingTime % 60;
                        return <Text style={styles.timerText}>{`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`}</Text>;
                    }}
                </CountdownCircleTimer>
            </View>}
            {showPicker ? (
                <>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.presetInactive, isActive === 1 && styles.presetActive]} onPress={() => setTime(1, 0, 1)}>
                            {isActive === 1 ? (
                                <LinearGradient
                                    colors={['#6430D2', '#376DEC']}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    style={[styles.presetInactive, isActive === 1 && styles.presetActive]}
                                >
                                    <Text style={[styles.presetTextInactive, isActive === 1 && styles.presetTextActive]}>01:00</Text>
                                </LinearGradient>) : (
                                <Text style={[styles.presetTextInactive, isActive === 1 && styles.presetTextActive]}>01:00</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.presetInactive, isActive === 2 && styles.presetActive]} onPress={() => setTime(5, 0, 2)}>
                            {isActive === 2 ? (
                                <LinearGradient
                                    colors={['#6430D2', '#376DEC']}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    style={[styles.presetInactive, isActive === 2 && styles.presetActive]}
                                >
                                    <Text style={[styles.presetTextInactive, isActive === 2 && styles.presetTextActive]}>05:00</Text>
                                </LinearGradient>) : (
                                <Text style={[styles.presetTextInactive, isActive === 2 && styles.presetTextActive]}>05:00</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.presetInactive, isActive === 3 && styles.presetActive]} onPress={() => setTime(10, 0, 3)}>
                            {isActive === 3 ? (
                                <LinearGradient
                                    colors={['#6430D2', '#376DEC']}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    style={[styles.presetInactive, isActive === 3 && styles.presetActive]}
                                >
                                    <Text style={[styles.presetTextInactive, isActive === 3 && styles.presetTextActive]}>10:00</Text>
                                </LinearGradient>) : (
                                <Text style={[styles.presetTextInactive, isActive === 3 && styles.presetTextActive]}>10:00</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => startTimer(minutes, seconds)}>
                            <LinearGradient
                                colors={['#6430D2', '#376DEC']}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={styles.button}
                            >
                                <Text style={styles.text}>Start</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.button}>
                        <LinearGradient
                            colors={['#6430D2', '#376DEC']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.button}
                        >
                            <Text style={styles.text}>Usuń</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pauseOrResume()} style={styles.button}>
                        <LinearGradient
                            colors={['#6430D2', '#376DEC']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.button}
                        >
                            <Text style={styles.text}>{isPlaying ? 'Wstrzymaj' : 'Wznów'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 240,
        marginBottom: 10
    },
    label: {
        color: '#376DEC',
        fontFamily: 'msb',
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    presetInactive: {
        width: 90,
        height: 90,
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#376DEC',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        elevation: 10
    },
    presetActive: {
        backgroundColor: '#376DEC',
        borderWidth: 0
    },
    presetTextInactive: {
        fontFamily: 'msb',
        fontSize: 20,
        color: '#376DEC'
    },
    presetTextActive: {
        color: 'white'
    },
    button: {
        width: 150,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 10,
        elevation: 10
    },
    text: {
        color: 'white',
        fontFamily: 'msb',
        fontSize: 16,
    },
    timerText: {
        color: '#376DEC',
        fontFamily: 'msb',
        fontSize: 75
    },
    timesUpText: {
        color: 'red',
        fontFamily: 'msb',
        fontSize: 36
    }
});