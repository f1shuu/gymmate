import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

const CATEGORY_ALIASES = {
    'Masa ciała': 'body_mass',
    'Body mass': 'body_mass',
    bodyMass: 'body_mass',
    'Obwód talii': 'waist_circumference',
    'Waist circumference': 'waist_circumference',
    waistCircumference: 'waist_circumference',
    'Obwód klatki piersiowej': 'chest_circumference',
    'Chest circumference': 'chest_circumference',
    chestCircumference: 'chest_circumference',
    'Obwód bicepsa': 'biceps_circumference',
    'Bicep circumference': 'biceps_circumference',
    'Biceps circumference': 'biceps_circumference',
    bicepsCircumference: 'biceps_circumference'
}

const MUSCLE_GROUP_ALIASES = {
    Barki: 'shoulders', Shoulders: 'shoulders',
    Bicepsy: 'biceps', Biceps: 'biceps',
    'Brzuch (ABS)': 'abs', Abs: 'abs',
    'Klatka piersiowa': 'chest', Chest: 'chest',
    'Łydki': 'calves', Calves: 'calves',
    Plecy: 'back', Back: 'back',
    'Pośladki': 'glutes', Glutes: 'glutes',
    Przedramiona: 'forearms', Forearms: 'forearms',
    'Szyja i kark': 'neck_and_traps', 'Neck and Traps': 'neck_and_traps',
    Tricepsy: 'triceps', Triceps: 'triceps',
    Uda: 'thighs', Thighs: 'thighs',
    'Całe ciało': 'full_body', 'Full body': 'full_body',
    'Czworogłowe uda': 'quadriceps', Quadriceps: 'quadriceps',
    'Dolna część pleców': 'lower_back', 'Lower back': 'lower_back',
    'Głębokie mięśnie tułowia (core)': 'core', Core: 'core',
    'Mięśnie dwugłowe uda': 'hamstrings', Hamstrings: 'hamstrings',
    Przywodziciele: 'adductors', Adductors: 'adductors',
    'Zginacze bioder': 'hip_flexors', 'Hip flexors': 'hip_flexors'
}

const EXERCISE_TYPE_ALIASES = {
    Powtórzeniowe: 'reps_based',
    'Reps-based': 'reps_based',
    repsBased: 'reps_based',
    Czasowe: 'time_based',
    'Time-based': 'time_based',
    timeBased: 'time_based'
}

const parseLegacyDate = (date) => {
    if (!date) return null;
    const isoDate = new Date(date);
    if (!Number.isNaN(isoDate.getTime())) return isoDate.toISOString();

    const match = String(date).match(/^(\d{2})\.(\d{2})\.(\d{4})(?: r\.)?$/);
    if (!match) return null;

    const [, day, month, year] = match;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 12)).toISOString();
}

const migrateRecord = (record) => {
    if (!record || typeof record !== 'object') return record;

    const { date, ...recordWithoutLegacyDate } = record;
    const createdAt = parseLegacyDate(record.createdAt) || parseLegacyDate(date) || new Date().toISOString();
    const category = CATEGORY_ALIASES[record.category] || record.category;
    const recordData = record.data && typeof record.data === 'object' ? record.data : {};
    const data = {
        ...recordData,
        type: EXERCISE_TYPE_ALIASES[recordData.type] || recordData.type
    }
    const hasMuscleGroupData = category === 'exercises'
        || recordData.muscleGroup
        || Array.isArray(recordData.muscleGroups)

    if (hasMuscleGroupData) {
        const sourceGroups = Array.isArray(recordData.muscleGroups)
            ? recordData.muscleGroups
            : (recordData.muscleGroup ? [recordData.muscleGroup] : [])
        data.muscleGroups = [...new Set(
            sourceGroups
                .map(group => MUSCLE_GROUP_ALIASES[group] || group)
                .filter(Boolean)
        )]
        delete data.muscleGroup;
    }

    return { ...recordWithoutLegacyDate, createdAt, category, data };
}

const showStorageError = () => {
    Alert.alert(
        'Błąd danych / Data error',
        'Nie udało się odczytać lub zapisać danych aplikacji. Uszkodzone dane zostały zabezpieczone w kopii. / App data could not be read or saved. Corrupted data was preserved in a backup.'
    )
}

export default new class DataController {
    async readDataSet(dataSet) {
        const storedData = await AsyncStorage.getItem(dataSet);
        if (!storedData) return [];

        try {
            const parsedData = JSON.parse(storedData);
            if (!Array.isArray(parsedData)) throw new Error('Stored data set is not an array');

            const migratedData = parsedData.map(migrateRecord);
            if (JSON.stringify(parsedData) !== JSON.stringify(migratedData)) {
                await AsyncStorage.setItem(dataSet, JSON.stringify(migratedData));
            }
            return migratedData;
        } catch (error) {
            console.error(error);
            try {
                await AsyncStorage.setItem(dataSet + ':corrupted-backup', storedData);
                await AsyncStorage.removeItem(dataSet);
            } catch (backupError) {
                console.error(backupError);
            }
            showStorageError();
            return [];
        }
    }

    groupByCategory(data) {
        return data.reduce((acc, measurement) => {
            const { category } = measurement;
            if (!acc[category]) acc[category] = [];
            acc[category].push(measurement);
            return acc;
        }, {})
    }

    async get(dataSet, setData, setIsData) {
        try {
            const parsedData = await this.readDataSet(dataSet);
            setData(parsedData);
            setIsData(parsedData.length > 0);
        } catch (error) {
            console.error(error);
            showStorageError();
            setData([]);
            setIsData(false);
        }
    }

    async getCount(dataSet) {
        try {
            return (await this.readDataSet(dataSet)).length;
        } catch (error) {
            console.error(error);
            showStorageError();
            return 0;
        }
    }

    async store(dataSet, id, name, category, navigation, navigator, data = {}) {
        try {
            const parsedData = await this.readDataSet(dataSet);
            const sanitizedData = { ...data, weight: data.weight === '-' ? null : data.weight };
            const stableCategory = CATEGORY_ALIASES[category] || category;

            if (id) {
                const existingElementId = parsedData.findIndex(item => item.id === id);
                if (existingElementId === -1) throw new Error('Cannot update a missing data record');
                parsedData[existingElementId] = {
                    ...parsedData[existingElementId],
                    name,
                    category: stableCategory,
                    data: { ...parsedData[existingElementId].data, ...sanitizedData }
                }
            } else {
                parsedData.push({
                    id: uuidv4(),
                    createdAt: new Date().toISOString(),
                    name,
                    category: stableCategory,
                    data: sanitizedData
                })
            }

            await AsyncStorage.setItem(dataSet, JSON.stringify(parsedData));
            navigation.navigate(navigator);
        } catch (error) {
            console.error(error);
            showStorageError();
        }
    }

    async update(dataSet, id, navigation, navigator) {
        try {
            const parsedData = await this.readDataSet(dataSet);
            const record = parsedData.find(element => element.id === id);
            if (!record) throw new Error('Cannot edit a missing data record');
            navigation.navigate(navigator, record);
        } catch (error) {
            console.error(error);
            showStorageError();
        }
    }

    async delete(dataSet, setData, setIsData, id, isModalVisible, setIsModalVisible) {
        try {
            const parsedData = await this.readDataSet(dataSet);
            const updatedData = parsedData.filter(item => item.id !== id);

            await AsyncStorage.setItem(dataSet, JSON.stringify(updatedData));
            await this.get(dataSet, setData, setIsData);
            setIsModalVisible(!isModalVisible);
        } catch (error) {
            console.error(error);
            showStorageError();
        }
    }

    async clear(dataSet, isModalVisible, setIsModalVisible, fetchData, isConfirmationModalVisible, setIsConfirmationModalVisible) {
        try {
            if (dataSet === 'all') await AsyncStorage.multiRemove(['exercises', 'bodyMeasurements', 'trainings']);
            else await AsyncStorage.removeItem(dataSet);
            setIsModalVisible(!isModalVisible);
            await fetchData();
            setIsConfirmationModalVisible(!isConfirmationModalVisible);
        } catch (error) {
            console.error(error);
            showStorageError();
        }
    }
}