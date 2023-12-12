import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const calculate = (value) => {
        const replaceSymbols = (expr) => expr.replace(/x/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
        if (value === '=') {
            try {
                const result = replaceSymbols(input);
                let newOutput = eval(result).toPrecision(8).toString();
                newOutput = parseFloat(newOutput);
                setOutput(newOutput);
            } catch (error) {
                setOutput('Błąd');
            }
        } else if (value === 'C') {
            setInput('');
            setOutput('');
        } else if (value === 'sqrt') {
            try {
                let newOutput = Math.sqrt(eval(replaceSymbols(input))).toPrecision(8).toString();
                newOutput = parseFloat(newOutput);
                setOutput(newOutput);
            } catch (error) {
                setOutput('Błąd');
            }
        } else if (value === 'backspace') {
            setInput((prevInput) => prevInput.slice(0, -1));
        } else {
            const lastChar = input.slice(-1);
            const isLastCharSymbol = ['+', '-', 'x', '÷', '^'].includes(lastChar);
            if (isLastCharSymbol) {
                if (['+', '-', 'x', '÷', '^'].includes(value)) setInput((prevInput) => prevInput.slice(0, -1) + value);
                else setInput((prevInput) => prevInput + value);
            } else setInput((prevInput) => prevInput + value);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.input}>{input}</Text>
            <Text style={styles.output}>{output}</Text>
            <View style={styles.buttons}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('C')}>
                        <Text style={styles.delete}>C</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('sqrt')}>
                        <Text style={styles.symbols}>√</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('^')}>
                        <Text style={styles.symbols}>^</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('÷')}>
                        <Text style={styles.symbols}>÷</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('7')}>
                        <Text style={styles.numbers}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('8')}>
                        <Text style={styles.numbers}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('9')}>
                        <Text style={styles.numbers}>9</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('x')}>
                        <Text style={styles.symbols}>x</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('4')}>
                        <Text style={styles.numbers}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('5')}>
                        <Text style={styles.numbers}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('6')}>
                        <Text style={styles.numbers}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('-')}>
                        <Text style={styles.symbols}>-</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('1')}>
                        <Text style={styles.numbers}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('2')}>
                        <Text style={styles.numbers}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('3')}>
                        <Text style={styles.numbers}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('+')}>
                        <Text style={styles.symbols}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('0')}>
                        <Text style={styles.numbers}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('.')}>
                        <Text style={styles.numbers}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('backspace')}>
                        <Image
                            source={require('../../assets/tools/calculator/backspace.png')}
                            style={{ width: 40, height: 40 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => calculate('=')}>
                        <Text style={styles.symbols}>=</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        flex: 1
    },
    buttons: {
        marginBottom: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    input: {
        color: '#376DEC',
        fontSize: 28,
        textAlign: 'right',
        paddingRight: 20,
        paddingTop: 5
    },
    output: {
        color: '#376DEC',
        fontSize: 44,
        textAlign: 'right',
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 20
    },
    delete: {
        fontFamily: 'Mona-Sans Bold',
        color: '#FD5056',
        fontSize: 36
    },
    symbols: {
        fontFamily: 'Mona-Sans Bold',
        color: '#2ECC71',
        fontSize: 36
    },
    numbers: {
        fontFamily: 'Mona-Sans Bold',
        color: '#376DEC',
        fontSize: 36
    },
    button: {
        flex: 1,
        backgroundColor: '#E1E1E1',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        height: 85,
        borderRadius: 15,
        elevation: 10
    },
})