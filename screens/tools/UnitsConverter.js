import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

export default function UnitsConverter() {
    const [centimeters1, setCentimeters1] = useState('');
    const [feet, setFeet] = useState('');
    const [inches1, setInches1] = useState('');
    const [kilos, setKilos] = useState('');
    const [pounds, setPounds] = useState('');
    const [centimeters2, setCentimeters2] = useState('');
    const [inches2, setInches2] = useState('');
    const [meters, setMeters] = useState('');
    const [feetFromMeters, setFeetFromMeters] = useState('');
    const [ounces, setOunces] = useState('');
    const [grams, setGrams] = useState('');
    const [whichHeightConverter, setHeightConverter] = useState(true);
    const [whichWeightConverter, setWeightConverter] = useState(true);
    const [whichCmCalConverter, setCmCalConverter] = useState(true);
    const [whichMFtConverter, setMFtConverter] = useState(true);
    const [whichGOzConverter, setGOzConverter] = useState(true);

    const cmToFeetAndInches = (text) => {
        updateFeetAndInches(text);
        setCentimeters1(text);
    }

    const updateFeetAndInches = (text) => {
        const cm = parseFloat(text);
        const feet = Math.floor(cm / 30.48);
        const rest = cm - feet * 30.48;
        const inches = Math.floor(rest / 2.54);
        if (!isNaN(feet)) setFeet(feet.toString())
        else setFeet('');
        if (!isNaN(inches)) setInches1(inches.toString())
        else setInches1('');
    }

    const feetInputChange = (text) => {
        setFeet(text);
        updateCentimeters1(text, inches1);
    }

    const inchesInputChange = (text) => {
        setInches1(text);
        updateCentimeters1(feet, text);
    }

    const updateCentimeters1 = (newFeet, newInches) => {
        let parsedFeet = parseFloat(newFeet);
        let parsedInches = parseFloat(newInches);
        if (isNaN(parsedFeet)) parsedFeet = 0;
        if (isNaN(parsedInches)) parsedInches = 0;
        const cm = Math.round(parsedFeet * 30.48 + parsedInches * 2.54).toString();
        if (!isNaN(cm)) setCentimeters1(cm)
        else setCentimeters1('');
    }

    const kilosToPounds = (text) => {
        updatePounds(text);
        setKilos(text);
    }

    const updatePounds = (text) => {
        const kg = parseFloat(text);
        const lb = 2.20462262 * kg;
        if (!isNaN(lb)) {
            if (lb > 99999999) setPounds(Math.floor(lb).toString())
            else setPounds(lb.toString())
        } else setPounds('');
    }

    const poundsToKilos = (text) => {
        updateKilos(text);
        setPounds(text);
    }

    const updateKilos = (text) => {
        const lb = parseFloat(text);
        const kg = 0.45359237 * lb;
        if (!isNaN(kg)) {
            if (kg > 99999999) setKilos(Math.floor(kg).toString())
            else setKilos(kg.toString())
        } else setKilos('');
    }

    const centimetersToInches = (text) => {
        updateInches(text);
        setCentimeters2(text);
    }

    const updateInches = (text) => {
        const cm = parseFloat(text);
        const inches = 0.393700787 * cm;
        if (!isNaN(inches)) {
            if (inches > 99999999) setInches2(Math.floor(inches).toString())
            else setInches2(inches.toString())
        } else setInches2('');
    }

    const inchesToCentimeters = (text) => {
        updateCentimeters2(text);
        setInches2(text);
    }

    const updateCentimeters2 = (text) => {
        const inch = parseFloat(text);
        const cm = 2.54 * inch;
        if (!isNaN(cm)) {
            if (cm > 99999999) setCentimeters2(Math.floor(cm).toString())
            else setCentimeters2(cm.toString())
        } else setCentimeters2('');
    }

    const metersToFeet = (text) => {
        updateFeet(text);
        setMeters(text);
    }

    const updateFeet = (text) => {
        const m = parseFloat(text);
        const ft = 3.2808399 * m;
        if (!isNaN(ft)) {
            if (ft > 99999999) setFeetFromMeters(Math.floor(ft).toString())
            else setFeetFromMeters(ft.toString())
        } else setFeetFromMeters('');
    }

    const feetToMeters = (text) => {
        updateMeters(text);
        setFeetFromMeters(text);
    }

    const updateMeters = (text) => {
        const ft = parseFloat(text);
        const m = 0.3048 * ft;
        if (!isNaN(m)) {
            if (m > 99999999) setMeters(Math.floor(m).toString())
            else setMeters(m.toString())
        } else setMeters('');
    }

    const gramsToOunces = (text) => {
        updateOunces(text);
        setGrams(text);
    }

    const updateOunces = (text) => {
        const g = parseFloat(text);
        const oz = 0.0352739619 * g;
        if (!isNaN(oz)) {
            if (oz > 99999999) setOunces(Math.floor(oz).toString())
            else setOunces(oz.toString())
        } else setOunces('');
    }

    const ouncesToGrams = (text) => {
        updateGrams(text);
        setOunces(text);
    }

    const updateGrams = (text) => {
        const oz = parseFloat(text);
        const g = 28.3495231 * oz;
        if (!isNaN(g)) {
            if (g > 99999999) setGrams(Math.floor(g).toString())
            else setGrams(g.toString())
        } else setGrams('');
    }

    const swapConverter = (setter) => () => setter((prev) => !prev);

    return (
        <ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Text style={styles.titleText}>Konwerter wzrostu</Text>
                <View style={styles.converter}>
                    {whichHeightConverter ? (
                        <>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={3}
                                value={centimeters1}
                                onChangeText={cmToFeetAndInches}
                                keyboardType='numeric' />
                            <Text style={styles.customText}>cm</Text>
                            <TouchableOpacity onPress={swapConverter(setHeightConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                value={feet}
                                editable={false}
                                keyboardType='numeric' />
                            <Text style={styles.customText}>'</Text>
                            <TextInput
                                style={styles.input}
                                value={inches1}
                                editable={false}
                                keyboardType='numeric' />
                            <Text style={styles.customText}>"</Text>
                        </>
                    ) : (
                        <>
                            <TextInput
                                style={styles.input}
                                maxLength={1}
                                value={feet}
                                onChangeText={feetInputChange}
                                keyboardType='numeric' />
                            <Text style={styles.customText}>'</Text>
                            <TextInput
                                style={styles.input}
                                maxLength={1}
                                value={inches1}
                                onChangeText={inchesInputChange}
                                keyboardType='numeric' />
                            <Text style={styles.customText}>"</Text>
                            <TouchableOpacity onPress={swapConverter(setHeightConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={3}
                                value={centimeters1}
                                editable={false}
                                keyboardType='numeric' />
                            <Text style={styles.customText}>cm</Text>
                        </>
                    )}
                </View>
                <Text style={styles.titleText}>Konwerter masy ciała</Text>
                <View style={styles.converter}>
                    {whichWeightConverter ? (
                        <>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={kilos}
                                onChangeText={kilosToPounds}
                                keyboardType='numeric' />
                            <Text style={styles.text}>kg </Text>
                            <TouchableOpacity onPress={swapConverter(setWeightConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={pounds}
                                editable={false}
                                keyboardType='numeric' />
                            <Text style={styles.text}>lbs</Text>
                        </>
                    ) : (
                        <>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={pounds}
                                onChangeText={poundsToKilos}
                                keyboardType='numeric' />
                            <Text style={styles.text}>lbs</Text>
                            <TouchableOpacity onPress={swapConverter(setWeightConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={kilos}
                                editable={false}
                                keyboardType='numeric' />
                            <Text style={styles.text}>kg </Text>
                        </>
                    )}
                </View>
                <Text style={styles.titleText}>Pozostałe konwertery</Text>
                <View style={styles.converter}>
                    {whichCmCalConverter ? (
                        <>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={centimeters2}
                                onChangeText={centimetersToInches}
                                keyboardType='numeric'
                            />
                            <Text style={styles.text}>cm </Text>
                            <TouchableOpacity onPress={swapConverter(setCmCalConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={inches2}
                                editable={false}
                                keyboardType='numeric'
                            />
                            <Text style={styles.text}>cal</Text>
                        </>
                    ) : (
                        <>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={inches2}
                                onChangeText={inchesToCentimeters}
                                keyboardType='numeric'
                            />
                            <Text style={styles.text}>cal</Text>
                            <TouchableOpacity onPress={swapConverter(setCmCalConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={centimeters2}
                                editable={false}
                                keyboardType='numeric'
                            />
                            <Text style={styles.text}>cm </Text>
                        </>
                    )}
                </View>
                <View style={styles.converter}>
                    {whichMFtConverter ? (
                        <>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={meters}
                                onChangeText={metersToFeet}
                                keyboardType='numeric' />
                            <Text style={styles.text}>m  </Text>
                            <TouchableOpacity onPress={swapConverter(setMFtConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={feetFromMeters}
                                editable={false}
                                keyboardType='numeric' />
                            <Text style={styles.text}>ft </Text>
                        </>
                    ) : (
                        <>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={feetFromMeters}
                                onChangeText={feetToMeters}
                                keyboardType='numeric' />
                            <Text style={styles.text}>ft </Text>
                            <TouchableOpacity onPress={swapConverter(setMFtConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={meters}
                                editable={false}
                                keyboardType='numeric' />
                            <Text style={styles.text}>m  </Text>
                        </>
                    )}
                </View>
                <View style={styles.converter}>
                    {whichGOzConverter ? (
                        <>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={grams}
                                onChangeText={gramsToOunces}
                                keyboardType='numeric' />
                            <Text style={styles.text}>g  </Text>
                            <TouchableOpacity onPress={swapConverter(setGOzConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={ounces}
                                editable={false}
                                keyboardType='numeric' />
                            <Text style={styles.text}>oz </Text>
                        </>
                    ) : (
                        <>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={ounces}
                                onChangeText={ouncesToGrams}
                                keyboardType='numeric' />
                            <Text style={styles.text}>oz </Text>
                            <TouchableOpacity onPress={swapConverter(setGOzConverter)}>
                                <Image source={require('../../assets/images/tools/converter/swap.png')} style={styles.image} resizeMode='cover' />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.wideInput}
                                maxLength={10}
                                value={grams}
                                editable={false}
                                keyboardType='numeric' />
                            <Text style={styles.text}>g  </Text>
                        </>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECECEC',
        flex: 1,
    },
    converter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 1,
        marginVertical: 10
    },
    text: {
        fontFamily: 'msb',
        color: '#376DEC',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 32
    },
    titleText: {
        fontFamily: 'msb',
        color: '#376DEC',
        fontSize: 18,
        textAlignVertical: 'center',
        paddingTop: 10,
        paddingLeft: 10
    },
    customText: {
        fontFamily: 'msb',
        color: '#376DEC',
        fontSize: 18,
        textAlignVertical: 'center',
    },
    input: {
        fontFamily: 'msr',
        color: '#376DEC',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#E1E1E1',
        borderColor: '#376DEC',
        borderWidth: 1.5,
        borderRadius: 15,
        width: 60
    },
    wideInput: {
        fontFamily: 'msr',
        color: '#376DEC',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#E1E1E1',
        borderColor: '#376DEC',
        borderWidth: 1.5,
        borderRadius: 15,
        width: 120
    },
    image: {
        width: 40,
        height: 40,
    }
})