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
    constructor() { }

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
                if (parsedData.length === 0) setIsData(false);
                else setIsData(true);
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

            if (parsedData) return parsedData.length;
            else return 0;
        } catch (error) {
            console.error(error);
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
            if (dataSet === 'all') await AsyncStorage.clear();
            else await AsyncStorage.removeItem(dataSet);
            setIsModalVisible(!isModalVisible);
            fetchData();
            setIsConfirmationModalVisible(!isConfirmationModalVisible);
        } catch (error) {
            console.error(error);
        }
    }
}
