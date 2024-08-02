import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { LinearGradient } from 'expo-linear-gradient';

export default Timer = () => {
    let startPlaying = true;
    let playOrPause = 'Start';
    const pauseOrResume = () => {
        startPlaying = !startPlaying;
        if (playOrPause === 'Start') playOrPause = 'Pauza'
        else playOrPause = 'Start'
    }
    return (
        <View style={styles.container}>
            <View style={styles.timer}>
                <CountdownCircleTimer
                    isPlaying={startPlaying}
                    duration={61}
                    colors={['#6430D2', '#376DEC']}
                    colorsTime={[60, 0]}
                    size={300}
                    strokeWidth={40}
                >
                    {({ remainingTime }) => <Text style={styles.timerText}>{remainingTime}</Text>}
                </CountdownCircleTimer>
            </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => pauseOrResume()} style={styles.button}>
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
                        <Text style={styles.text}>{playOrPause}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        marginBottom: 20,
    },
    timerText: {
        color: '#376DEC',
        fontFamily: 'msb',
        fontSize: 75
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
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
    }
});