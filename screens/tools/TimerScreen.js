import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { TimerPicker } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Button from '../../components/buttons/Button';
import SetTimerButton from '../../components/buttons/SetTimerButton';

import { useSettings } from '../../helpers/SettingsProvider';

export default function Timer() {
    const [showPicker, setShowPicker] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [initialValue, setInitialValue] = useState({ minutes: 0, seconds: 0 });
    const [key, setKey] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [isVibrating, setIsVibrating] = useState(false);
    const [isSoundPlaying, setIsSoundPlaying] = useState(false);
    const presetTimes = [
        { text: '01:00', minutes: 1, seconds: 0, id: 1 },
        { text: '05:00', minutes: 5, seconds: 0, id: 2 },
        { text: '10:00', minutes: 10, seconds: 0, id: 3 }
    ];

    const { settings, theme, translate } = useSettings();

    const setTime = (minutes, seconds, id) => {
        setIsActive(prevId => prevId === id ? null : id);
        setInitialValue({ minutes, seconds });
        setKey(prevKey => prevKey + 1);
        setMinutes(minutes);
        setSeconds(seconds);
    }

    const start = (minutes, seconds) => {
        if (minutes === 0 && seconds === 0) { return; }
        else {
            setCompleted(false);
            setInitialValue({ minutes, seconds });
            setKey(prevKey => prevKey + 1);
            setShowPicker(false);
            setIsPlaying(true);
            setIsVibrating(false);
            setIsSoundPlaying(false);
        }
    }

    const playOrPause = () => {
        if (!isPlaying) setIsPlaying(true);
        else setIsPlaying(false);
    }

    const restart = () => {
        setIsVibrating(false);
        setIsSoundPlaying(false);
        setShowPicker(true);
    }

    const onDurationChange = (duration) => {
        const { minutes, seconds } = duration;
        const activePreset = presetTimes.find(preset => preset.minutes === minutes && preset.seconds === seconds);

        setIsActive(activePreset ? activePreset.id : null);
        setMinutes(minutes);
        setSeconds(seconds);
    }

    const finish = () => {
        setCompleted(true);
        setIsVibrating(true);
        setIsSoundPlaying(true);
    }

    useEffect(() => {
        if (settings.isHapticsOn) {
            let seriesInterval;

            const startVibrationSeries = () => {
                let vibrationCount = 0;
                const vibrationInterval = setInterval(() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    vibrationCount++;
                    if (vibrationCount >= 4) clearInterval(vibrationInterval);
                }, 100)
            }

            if (isVibrating) {
                startVibrationSeries();
                seriesInterval = setInterval(startVibrationSeries, 1000);
            } else clearInterval(seriesInterval);

            return () => clearInterval(seriesInterval);
        }
    }, [isVibrating]);

    useEffect(() => {
        let soundObject;

        const playSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/sounds/alarm.wav'),
                { shouldPlay: true, isLooping: true }
            )
            soundObject = sound;
        }

        if (settings.isSoundOn && isSoundPlaying) playSound();

        return () => {
            if (soundObject) {
                soundObject.stopAsync();
                soundObject.unloadAsync();
            }
        }
    }, [isSoundPlaying])

    const styles = {
        labels: {
            flexDirection: 'row'
        },
        label: {
            fontFamily: 'Nexa',
            fontSize: 20,
            color: theme.textPrimary,
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
            color: Colors.red
        },
        timerText: {
            fontFamily: 'Nexa',
            fontSize: 56,
            color: theme.primary
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
            alignItems: 'stretch'
        }
    }

    return (
        <Container>
            {showPicker ? (
                <>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.labels}>
                            <Text style={styles.label}>{translate('minutes')}</Text>
                            <Text style={styles.label}>{translate('seconds')}</Text>
                        </View>
                        <TimerPicker
                            key={key}
                            initialValue={{ minutes, seconds }}
                            hideHours={true}
                            minuteLabel=':'
                            secondLabel=''
                            minutes={minutes}
                            seconds={seconds}
                            onDurationChange={(duration) => onDurationChange(duration)}
                            LinearGradient={LinearGradient}
                            Haptics={Haptics}
                            styles={{
                                pickerContainer: {
                                    backgroundColor: theme.secondary
                                },
                                pickerItem: {
                                    fontFamily: 'Nexa',
                                    fontSize: 64,
                                    color: theme.primary
                                },
                                pickerLabel: {
                                    backgroundColor: theme.secondary,
                                    fontFamily: 'Nexa',
                                    fontSize: 64,
                                    color: theme.primary
                                },
                                pickerItemContainer: {
                                    width: 100,
                                    height: 80,
                                    marginHorizontal: 10,
                                    backgroundColor: theme.secondary,
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
                    colors={theme.primary}
                    colorsTime={[minutes * 60 + seconds, 0]}
                    size={300}
                    strokeWidth={15}
                    trailColor={theme.tertiary}
                    onComplete={() => finish()}
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            return <Text style={styles.timesUpText}>{translate('timeIsUp')}</Text>
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
                        {
                            presetTimes.map(element => (
                                <SetTimerButton key={element.id} active={isActive === element.id} time={element.text} onPress={() => setTime(element.minutes, element.seconds, element.id)} />
                            ))}
                    </View>
                    <Button onPress={() => start(minutes, seconds)} text={translate('start')} />
                </>
            ) : (
                <View style={styles.row}>
                    <Button onPress={() => restart()} text={completed ? translate('reset') : translate('delete')} />
                    <Button onPress={completed ? () => start(minutes, seconds) : () => playOrPause()} text={completed ? translate('restart') : (isPlaying ? translate('pause') : translate('resume'))} type='delete' />
                </View>
            )}
        </Container>
    )
}
