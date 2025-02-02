import { View, Text } from 'react-native';
import { useState } from 'react';

import Container from '../../components/Container';
import CalculatorButton from '../../components/buttons/CalculatorButton';
import { useTheme } from '../../providers/ThemeProvider';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const { theme, toggleTheme } = useTheme();

    const calculate = (value) => {
        const replaceSymbols = (expr) => expr.replace(/x/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
        if (value === '=') {
            try {
                if (input) setOutput(parseFloat(eval(replaceSymbols(input)).toPrecision(8)));
            } catch (error) {
                setOutput('Błąd');
            }
        } else if (value === 'C') {
            setInput('');
            setOutput('');
        } else if (value === 'sqrt') {
            try {
                setOutput(parseFloat(Math.sqrt(eval(replaceSymbols(input))).toPrecision(8)));
            } catch (error) {
                setOutput('Błąd');
            }
        } else if (value === 'backspace') {
            setInput((prevInput) => prevInput.slice(0, -1));
        } else {
            const lastChar = input.slice(-1);
            const isLastCharSymbol = ['+', '-', 'x', '÷', '^'].includes(lastChar);
            if (isLastCharSymbol) {
                if (['+', '-', 'x', '÷', '^'].includes(value)) if (input.length < 42) setInput((prevInput) => prevInput.slice(0, -1) + value);
                else if (input.length < 42) setInput((prevInput) => prevInput + value);
            } else if (input.length < 42) setInput((prevInput) => prevInput + value);
        }
    }

    const styles = {
        input: {
            backgroundColor: theme.background,
            color: theme.textPrimary,
            fontSize: 28,
            textAlign: 'right',
            paddingVertical: 5,
            paddingRight: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        },
        output: {
            backgroundColor: theme.background,
            color: theme.textPrimary,
            fontSize: 44,
            textAlign: 'right',
            paddingVertical: 5,
            paddingRight: 20,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: theme.primary
        },
        container: {
            flex: 1,
            justifyContent: 'space-between',
            marginTop: 10
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: -5
        }
    }

    return (
        <Container>
            <Text style={styles.input}>{input}</Text>
            <Text style={styles.output}>{output}</Text>
            <View style={styles.container}>
                <View style={styles.row}>
                    <CalculatorButton type='delete' value='C' onPress={() => calculate('C')} />
                    <CalculatorButton type='symbols' value='√' onPress={() => calculate('sqrt')} />
                    <CalculatorButton type='symbols' value='^' onPress={() => calculate('^')} />
                    <CalculatorButton type='symbols' value='÷' onPress={() => calculate('÷')} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton type='numbers' value='7' onPress={() => calculate('7')} />
                    <CalculatorButton type='numbers' value='8' onPress={() => calculate('8')} />
                    <CalculatorButton type='numbers' value='9' onPress={() => calculate('9')} />
                    <CalculatorButton type='symbols' value='x' onPress={() => calculate('x')} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton type='numbers' value='4' onPress={() => calculate('4')} />
                    <CalculatorButton type='numbers' value='5' onPress={() => calculate('5')} />
                    <CalculatorButton type='numbers' value='6' onPress={() => calculate('6')} />
                    <CalculatorButton type='symbols' value='-' onPress={() => calculate('-')} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton type='numbers' value='1' onPress={() => calculate('1')} />
                    <CalculatorButton type='numbers' value='2' onPress={() => calculate('2')} />
                    <CalculatorButton type='numbers' value='3' onPress={() => calculate('3')} />
                    <CalculatorButton type='symbols' value='+' onPress={() => calculate('+')} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton type='numbers' value='0' onPress={() => calculate('0')} />
                    <CalculatorButton type='numbers' value='.' onPress={() => calculate('.')} />
                    <CalculatorButton type='backspace' onPress={() => calculate('backspace')} />
                    <CalculatorButton type='symbols' value='=' onPress={() => calculate('=')} />
                </View>
            </View>
        </Container>
    )
}
