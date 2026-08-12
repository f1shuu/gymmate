import { Text, View } from 'react-native';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { TimerPicker } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { createAudioPlayer } from 'expo-audio';

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
    const [key, setKey] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [isVibrating, setIsVibrating] = useState(false);
    const [isSoundPlaying, setIsSoundPlaying] = useState(false);
    const presetTimes = [
        { text: '01:00', minutes: 1, seconds: 0, id: 1 },
        { text: '02:00', minutes: 2, seconds: 0, id: 2 },
        { text: '05:00', minutes: 5, seconds: 0, id: 3 }
    ];

    const { settings, theme, translate } = useSettings();
    const alarmPlayer = useMemo(() => createAudioPlayer(require('../../assets/sounds/alarm.wav')), []);
    const pickerFeedback = useCallback(() => {
        if (!settings.isHapticsOn) return;
        return Haptics.selectionAsync().catch(console.error);
    }, [settings.isHapticsOn])

    const setTime = (minutes, seconds, id) => {
        setIsActive(prevId => prevId === id ? null : id);
        setKey(prevKey => prevKey + 1);
        setMinutes(minutes);
        setSeconds(seconds);
    }

    const start = (minutes, seconds) => {
        if (minutes === 0 && seconds === 0) { return; }
        else {
            setCompleted(false);
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
        if (!settings.isHapticsOn || !isVibrating) return;

        const vibrationTimeouts = new Set();
        const startVibrationSeries = () => {
            for (let index = 0; index < 4; index += 1) {
                const timeout = setTimeout(() => {
                    vibrationTimeouts.delete(timeout);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(console.error);
                }, index * 100);
                vibrationTimeouts.add(timeout);
            }
        }

        startVibrationSeries();
        const seriesInterval = setInterval(startVibrationSeries, 1000);

        return () => {
            clearInterval(seriesInterval);
            vibrationTimeouts.forEach(clearTimeout);
            vibrationTimeouts.clear();
        }
    }, [isVibrating, settings.isHapticsOn])

    useEffect(() => {
        let cancelled = false;
        const synchronizeAlarm = async () => {
            alarmPlayer.loop = true;
            alarmPlayer.pause();
            await alarmPlayer.seekTo(0);
            if (!cancelled && settings.isSoundOn && isSoundPlaying) alarmPlayer.play();
        }

        synchronizeAlarm().catch(console.error);
        return () => {
            cancelled = true;
            alarmPlayer.pause();
        }
    }, [isSoundPlaying, settings.isSoundOn, alarmPlayer])

    useFocusEffect(
        useCallback(() => () => {
            alarmPlayer.pause();
            setIsSoundPlaying(false);
            setIsVibrating(false);
            setIsPlaying(false);
        }, [alarmPlayer])
    )

    useEffect(() => () => {
        alarmPlayer.pause();
        alarmPlayer.release();
    }, [alarmPlayer])

    const styles = {
        pickerSection: {
            alignItems: 'center'
        },
        labels: {
            width: 200,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        label: {
            fontFamily: 'Nexa',
            fontSize: 20,
            color: theme.textPrimary,
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
            alignItems: 'stretch',
            gap: 15
        }
    }

    return (
        <Container>
            {showPicker ? (
                <>
                    <View style={styles.pickerSection}>
                        <TimerPicker
                            key={key}
                            initialValue={{ minutes, seconds }}
                            hideHours={true}
                            minuteLabel={translate('minutes')}
                            secondLabel={translate('seconds')}
                            minutes={minutes}
                            seconds={seconds}
                            onDurationChange={(duration) => onDurationChange(duration)}
                            LinearGradient={LinearGradient}
                            pickerFeedback={pickerFeedback}
                            styles={{
                                pickerContainer: {
                                    backgroundColor: theme.secondary,
                                    justifyContent: 'center',
                                    gap: 20
                                },
                                pickerColumnWidth: 100,
                                pickerItem: {
                                    fontFamily: 'Nexa',
                                    fontSize: 64,
                                    color: theme.primary
                                },
                                pickerLabel: {
                                    fontFamily: 'Nexa',
                                    fontSize: 14,
                                    color: theme.primary,
                                    marginLeft: 5
                                },
                                pickerItemContainer: {
                                    width: 100,
                                    height: 80,
                                    backgroundColor: theme.secondary
                                },
                                pickerLabelContainer: {
                                    top: -12
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
                    <Button onPress={() => start(minutes, seconds)} text={translate('start')} type='small' />
                </>
            ) : (
                <View style={styles.row}>
                    <Button
                        onPress={() => restart()}
                        text={completed ? translate('reset') : translate('delete')}
                        type='delete'
                    />
                    <Button
                        onPress={completed ? () => start(minutes, seconds) : () => playOrPause()}
                        text={completed ? translate('restart') : (isPlaying ? translate('pause') : translate('resume'))}
                        type={completed ? 'delete' : ''}
                    />
                </View>
            )}
        </Container>
    )
}