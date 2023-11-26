import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { useState } from 'react';

import Exercise from '../../components/widgets/Exercise';

export default function ExercisesScreen() {
    const [exercise, setExercise] = useState();
    const [exerciseItems, setExerciseItems] = useState([]);

    const handleAddExercise = () => {
        Keyboard.dismiss();
        setExerciseItems([...exerciseItems, exercise]);
        setExercise(null);
    }

    const deleteExercise = (index) => () => {
        let itemsCopy = [...exerciseItems];
        itemsCopy.splice(index, 1);
        setExerciseItems(itemsCopy);
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.exercisesWrapper}>
                    <View style={styles.items}>
                        {
                            exerciseItems.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={deleteExercise(index)}>
                                        <Exercise text={item} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeExerciseWrapper}
            >
                <TextInput style={styles.input} placeholder={'Dodaj ćwiczenie...'} value={exercise} onChangeText={text => setExercise(text)} />
                <TouchableOpacity onPress={() => handleAddExercise()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141414',
        flex: 1,
    },
    exercisesWrapper: {
        paddingHorizontal: 20
    },
    items: {
        marginTop: 20
    },
    writeExerciseWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: 275,
        backgroundColor: '#D9D9D9',
        borderRadius: 60
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#386DEC',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addText: {
        color: 'white',
        fontSize: 24
    }
})