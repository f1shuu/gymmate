import { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
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
    'Masa ciała': require('./assets/measures/body-mass.png'),
    'Obwód talii': require('./assets/measures/waist-circumference.png'),
    'Obwód klatki piersiowej': require('./assets/measures/chest-circumference.png'),
    'Obwód bicepsa': require('./assets/measures/biceps-circumference.png'),
  };

  const renderHeader = (section, _, isActive) => {
    const url = imageMapping[section.title];
    return (
      <View style={styles.header}>
        <Image
          source={url}
          style={{ width: 60, height: 60, margin: 5 }}
        />
        <Text style={styles.headerText}>{section.title}</Text>
        <Icon
          name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={32}
          color={'white'}
        />
      </View>
    );
  };

  // A bug needs to be fixed - black background appear whenever the main button is press and held.

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
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
        sections={data}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: 5
  },
  headerText: {
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
    color: 'white',
    fontSize: 16,
  }
});
