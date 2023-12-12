import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

export default function BodyMeasurementsScreen() {
    const navigation = useNavigation();

    const navigateToAddBodyMeasurement = () => {
        navigation.navigate('AddBodyMeasurement');
    }

    const [activeSections, setActiveSections] = useState([]);

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return (`${day}.${month}.${year} r.`);
    }

    const [data, setData] = useState([
        { title: 'Masa ciała', data: ['81 kg' + ' | ' + getFormattedDate(), '80 kg' + ' | ' + getFormattedDate(), '79 kg' + ' | ' + getFormattedDate()] },
        { title: 'Obwód talii', data: ['50 cm' + ' | ' + getFormattedDate(), '51 cm' + ' | ' + getFormattedDate(), '52 cm' + ' | ' + getFormattedDate()] },
        { title: 'Obwód klatki piersiowej', data: ['60 cm' + ' | ' + getFormattedDate(), '61 cm' + ' | ' + getFormattedDate(), '62 cm' + ' | ' + getFormattedDate()] },
        { title: 'Obwód bicepsa', data: ['20 cm' + ' | ' + getFormattedDate(), '21 cm' + ' | ' + getFormattedDate(), '22 cm' + ' | ' + getFormattedDate()] },
    ]);

    const handleDeleteMeasurement = (measurementType, index) => {
        setData((prevData) => {
            const measurementTypeIndex = prevData.findIndex((item) => item.title === measurementType);
            if (measurementTypeIndex !== -1) {
                const newData = [...prevData];
                newData[measurementTypeIndex].data.splice(index, 1);
                return newData;
            }
            return prevData;
        });
    };

    const imageMapping = {
        'Masa ciała': require('../../assets/measures/body-mass.png'),
        'Obwód talii': require('../../assets/measures/waist-circumference.png'),
        'Obwód klatki piersiowej': require('../../assets/measures/chest-circumference.png'),
        'Obwód bicepsa': require('../../assets/measures/biceps-circumference.png'),
    };

    const renderHeader = (section, _, isActive) => {
        const url = imageMapping[section.title];
        return (
            <LinearGradient colors={['#6430D2', '#376DEC']} style={styles.header}>
                <View style={styles.imageBackground}>
                    <Image
                        source={url}
                        style={{ width: 60, height: 60, margin: 5 }}
                    />
                </View>
                <Text style={styles.headerText}>{section.title}</Text>
                <Icon
                    name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={32}
                    color={'white'}
                />
            </LinearGradient>
        );
    };

    const renderContent = (section) => {
        return (
            <View>
                {section.data.map((measurement, index) => (
                    <View key={index} style={styles.measurementItem}>
                        <Text style={styles.measurementText}>{measurement}</Text>
                        <TouchableOpacity onPress={() => handleDeleteMeasurement(section.title, index)}>
                            <Icon name="delete" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (
        <View style={styles.container}>
            <Accordion
                underlayColor='#ececec'
                sections={data}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
            />
            <LinearGradient colors={['#6430D2', '#376DEC']} style={styles.add}>
                <TouchableOpacity onPress={navigateToAddBodyMeasurement}>
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ececec',
        padding: 16,
        flex: 1,
    },
    imageBackground: {
        backgroundColor: '#ececec',
        borderRadius: 15,
        elevation: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 5,
        elevation: 10
    },
    headerText: {
        fontFamily: 'Mona-Sans Bold',
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
    },
    measurementItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: '#376DEC',
        padding: 10,
        borderRadius: 15
    },
    measurementText: {
        fontFamily: 'Mona-Sans Regular',
        color: 'white',
        fontSize: 16,
    },
    add: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginTop: 'auto',
        marginLeft: 'auto'
    },
    text: {
        fontFamily: 'Mona-Sans Regular',
        color: '#5AFF98',
        textAlign: 'center',
        fontSize: 64
    }
});
