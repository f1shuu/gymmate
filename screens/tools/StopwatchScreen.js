import { Text, View, ScrollView } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import Button from '../../components/buttons/Button';
import Container from '../../components/Container';

import { useSettings } from '../../helpers/SettingsProvider';

const formatElapsedTime = (milliseconds) => {
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

export default function StopwatchScreen() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const startedAt = useRef(null);
    const elapsedTimeRef = useRef(0);
    const isRunningRef = useRef(false);

    const { settings, theme, translate } = useSettings();

    useEffect(() => {
        elapsedTimeRef.current = elapsedTime;
    }, [elapsedTime])

    useEffect(() => {
        isRunningRef.current = isRunning;
        if (!isRunning) return;

        const interval = setInterval(() => {
            setElapsedTime(Date.now() - startedAt.current);
        }, 30)

        return () => clearInterval(interval);
    }, [isRunning])

    useFocusEffect(
        useCallback(() => () => {
            if (isRunningRef.current && startedAt.current) {
                setElapsedTime(Date.now() - startedAt.current);
            }
            setIsRunning(false)
        }, [])
    )

    const provideHapticFeedback = () => {
        if (settings?.isHapticsOn) {
            Haptics.selectionAsync().catch(console.error);
        }
    }

    const toggleStopwatch = () => {
        provideHapticFeedback();
        if (isRunning) {
            setElapsedTime(Date.now() - startedAt.current);
            setIsRunning(false);
            return;
        }

        startedAt.current = Date.now() - elapsedTimeRef.current;
        setIsRunning(true);
    }

    const resetStopwatch = () => {
        provideHapticFeedback();
        startedAt.current = null;
        elapsedTimeRef.current = 0;
        setElapsedTime(0);
        setLaps([]);
        setIsRunning(false);
    }

    const addLap = () => {
        if (!isRunning || elapsedTimeRef.current === 0) return;
        provideHapticFeedback();
        setLaps(currentLaps => [elapsedTimeRef.current, ...currentLaps]);
    }

    const styles = {
        content: {
            flex: 1,
            justifyContent: 'center'
        },
        dial: {
            width: 310,
            height: 310,
            borderRadius: 155,
            borderWidth: 15,
            borderColor: theme.primary,
            backgroundColor: theme.background,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30
        },
        time: {
            fontFamily: 'Nexa',
            fontSize: 40,
            color: theme.primary,
            textAlign: 'center'
        },
        controls: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 15
        },
        lapHeader: {
            fontFamily: 'Nexa',
            fontSize: 16,
            color: theme.textSecondary,
            marginHorizontal: 20,
            marginTop: 12,
            marginBottom: 8
        },
        laps: {
            maxHeight: 150,
            marginHorizontal: 20,
            borderRadius: 10,
            backgroundColor: theme.background
        },
        lapRow: {
            minHeight: 42,
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: theme.secondary
        },
        lapText: {
            fontFamily: 'Nexa',
            fontSize: 15,
            color: theme.textPrimary
        }
    }

    return (
        <Container>
            <View style={styles.content}>
                <View style={styles.dial}>
                    <Text style={styles.time}>{formatElapsedTime(elapsedTime)}</Text>
                </View>

                <View style={styles.controls}>
                    <Button
                        onPress={elapsedTime > 0 && !isRunning ? resetStopwatch : addLap}
                        text={elapsedTime > 0 && !isRunning ? translate('resetStopwatch') : translate('lap')}
                        type='delete'
                    />
                    <Button
                        onPress={toggleStopwatch}
                        text={isRunning ? translate('pause') : (elapsedTime > 0 ? translate('resume') : translate('start'))}
                    />
                </View>

                {laps.length > 0 ? (
                    <>
                        <Text style={styles.lapHeader}>{translate('laps')}</Text>
                        <ScrollView style={styles.laps}>
                            {laps.map((lap, index) => (
                                <View key={`${lap}-${laps.length - index}`} style={styles.lapRow}>
                                    <Text style={styles.lapText}>{translate('lap')} {laps.length - index}</Text>
                                    <Text style={styles.lapText}>{formatElapsedTime(lap)}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </>
                ) : null}
            </View>
        </Container>
    )
}