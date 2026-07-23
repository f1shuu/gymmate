import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return (`${day}.${month}.${year} r.`);
}

export default new class DataController {
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
            const storedData = await AsyncStorage.getItem(dataSet);

            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setData(parsedData);
                setIsData(parsedData.length > 0);
            } else {
                setData([]);
                setIsData(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getCount(dataSet) {
        try {
            const storedData = await AsyncStorage.getItem(dataSet);
            const parsedData = storedData ? JSON.parse(storedData) : [];

            return parsedData.length;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async store(dataSet, id, name, category, navigation, navigator, data = {}) {
        try {
            const storedData = await AsyncStorage.getItem(dataSet);
            const parsedData = storedData ? JSON.parse(storedData) : [];

            const date = getFormattedDate();
            if (data.weight === '-') data.weight = null;

            if (id) {
                const existingElementId = parsedData.findIndex(item => item.id === id);
                if (existingElementId === -1) throw new Error('Cannot update a missing data record');
                parsedData[existingElementId] = { ...parsedData[existingElementId], name, category, data: { ...parsedData[existingElementId].data, ...data } };
            } else {
                id = uuidv4();
                parsedData.push({ id, date, name, category, data: data });
            }

            await AsyncStorage.setItem(dataSet, JSON.stringify(parsedData, null, 2));
            navigation.navigate(navigator);
        } catch (error) {
            console.error(error);
        }
    }

    async update(dataSet, id, navigation, navigator) {
        try {
            const storedData = await AsyncStorage.getItem(dataSet);
            const parsedData = storedData ? JSON.parse(storedData) : [];

            navigation.navigate(navigator, parsedData.find(element => element.id === id));
        } catch (error) {
            console.error(error);
        }
    }

    async delete(dataSet, setData, setIsData, id, isModalVisible, setIsModalVisible) {
        try {
            const storedData = await AsyncStorage.getItem(dataSet);
            const parsedData = storedData ? JSON.parse(storedData) : [];
            const updatedData = parsedData.filter(item => item.id !== id);

            await AsyncStorage.setItem(dataSet, JSON.stringify(updatedData));
            this.get(dataSet, setData, setIsData);
            setIsModalVisible(!isModalVisible);
        } catch (error) {
            console.error(error);
        }
    }

    async clear(dataSet, isModalVisible, setIsModalVisible, fetchData, isConfirmationModalVisible, setIsConfirmationModalVisible) {
        try {
            if (dataSet === 'all') await AsyncStorage.multiRemove(['exercises', 'bodyMeasurements', 'trainings']);
            else await AsyncStorage.removeItem(dataSet);
            setIsModalVisible(!isModalVisible);
            fetchData();
            setIsConfirmationModalVisible(!isConfirmationModalVisible);
        } catch (error) {
            console.error(error);
        }
    }
}
