import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Workout from './components/Workout';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loader'>
        <Stack.Screen
          name='Loader'
          component={Loader}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            title: 'Twoje treningi',
            headerStyle: {
              backgroundColor: '#376DEC',
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
            },
            animation: 'none',
            headerBackVisible: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Loader({ navigation }) {
  useEffect(() => {
    const gifTimeout = setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 2500);

    return () => clearTimeout(gifTimeout);
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: '#212121', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('./assets/splash.gif')}
        style={{ resizeMode: 'center' }}
      />
    </View>
  );
}

function HomeScreen() {
  const [workout, setWorkout] = useState();
  const [workoutItems, setWorkoutItems] = useState([]);

  const handleAddWorkout = () => {
    Keyboard.dismiss();
    setWorkoutItems([...workoutItems, workout]);
    setWorkout(null);
  }

  const deleteWorkout = (index) => () => {
    let itemsCopy = [...workoutItems];
    itemsCopy.splice(index, 1);
    setWorkoutItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.workoutsWrapper}>
          <View style={styles.items}>
            {
              workoutItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={deleteWorkout(index)}>
                    <Workout text={item} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeWorkoutWrapper}
      >
        <TextInput style={styles.input} placeholder={'Dodaj trening...'} value={workout} onChangeText={text => setWorkout(text)} />
        <TouchableOpacity onPress={() => handleAddWorkout()}>
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
    backgroundColor: '#212121',
    flex: 1,
  },
  workoutsWrapper: {
    paddingHorizontal: 20
  },
  items: {
    marginTop: 20
  },
  writeWorkoutWrapper: {
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
    width: 250,
    backgroundColor: 'white',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#C0C0C0'
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0'
  },
  addText: {
    color: '#376DEC',
    fontSize: 24
  }
})

export default App;