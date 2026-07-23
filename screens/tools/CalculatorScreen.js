import { View, Text } from 'react-native';
import { useState } from 'react';

import Container from '../../components/Container';
import CalculatorButton from '../../components/buttons/CalculatorButton';

import { useSettings } from '../../helpers/SettingsProvider';

const parseExpression = (expression) => {
    const source = expression.replace(/\s/g, '').replace(/x/g, '*').replace(/÷/g, '/');
    let position = 0;

    const peek = () => source[position];
    const consume = (character) => {
        if (peek() !== character) return false;
        position += 1;
        return true;
    }

    const parseNumber = () => {
        const match = source.slice(position).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
        if (!match) throw new Error('Expected a number');
        position += match[0].length;
        const value = Number(match[0]);
        if (!Number.isFinite(value)) throw new Error('Invalid number');
        return value;
    }

    const parsePrimary = () => {
        if (consume('(')) {
            const value = parseAddition();
            if (!consume(')')) throw new Error('Missing closing parenthesis');
            return value;
        }
        return parseNumber();
    }

    const parsePower = () => {
        const base = parsePrimary();
        return consume('^') ? Math.pow(base, parseUnary()) : base;
    }

    const parseUnary = () => {
        if (consume('+')) return parseUnary();
        if (consume('-')) return -parseUnary();
        return parsePower();
    }

    const parseMultiplication = () => {
        let value = parseUnary();
        while (peek() === '*' || peek() === '/') {
            const operator = source[position++];
            const right = parseUnary();
            if (operator === '/' && right === 0) throw new Error('Division by zero');
            value = operator === '*' ? value * right : value / right;
        }
        return value;
    }

    const parseAddition = () => {
        let value = parseMultiplication();
        while (peek() === '+' || peek() === '-') {
            const operator = source[position++];
            const right = parseMultiplication();
            value = operator === '+' ? value + right : value - right;
        }
        return value;
    }

    if (!source) throw new Error('Empty expression');
    const result = parseAddition();
    if (position !== source.length || !Number.isFinite(result)) throw new Error('Invalid expression');
    return result;
}

const formatResult = (value) => Number(Number(value).toPrecision(8));

export default function Calculator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const { theme, translate } = useSettings();

    const showResult = (operation) => {
        try {
            setOutput(formatResult(operation(parseExpression(input))));
        } catch (error) {
            setOutput(translate('error'));
        }
    };

    const appendValue = (value) => {
        const operators = ['+', '-', 'x', '÷', '^'];
        const lastCharacter = input.slice(-1);

        if (operators.includes(value)) {
            if (!input) {
                if (value === '-') setInput('-');
                return;
            }
            if (operators.includes(lastCharacter)) {
                if (value === '-' && lastCharacter !== '-') setInput(input + value);
                else setInput(input.slice(0, -1) + value);
                return;
            }
        }

        if (value === '.') {
            const currentNumber = input.split(/[+\-x÷^]/).pop();
            if (currentNumber.includes('.')) return;
        }

        if (input.length < 42) setInput(input + value);
    }

    const calculate = (value) => {
        if (value === '=') showResult(result => result);
        else if (value === 'C') {
            setInput('');
            setOutput('');
        } else if (value === 'sqrt') {
            showResult((result) => {
                if (result < 0) throw new Error('Square root of a negative number');
                return Math.sqrt(result);
            })
        } else if (value === 'backspace') setInput(input.slice(0, -1));
        else appendValue(value);
    }

    const styles = {
        input: {
            backgroundColor: theme.background,
            color: theme.textPrimary,
            fontSize: 28,
            textAlign: 'right',
            paddingVertical: 5,
            paddingRight: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
        },
        output: {
            backgroundColor: theme.background,
            color: theme.textPrimary,
            minHeight: 70,
            fontSize: 44,
            textAlign: 'right',
            paddingVertical: 5,
            paddingRight: 20,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: theme.primary
        },
        container: {
            flex: 1,
            height: '100%',
            marginTop: 15
        },
        row: {
            flex: 1,
            flexDirection: 'row'
        }
    }

    return (
        <Container style={{ paddingBottom: 15 }}>
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
