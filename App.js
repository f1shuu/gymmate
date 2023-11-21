import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Workout from './components/Workout';

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
  return (
    <View style={ styles.container }>
      <View style={ styles.workoutsWrapper }>
        <View style={ styles.items }>
          <Workout text='Trening 1'/>
          <Workout text='Trening 2'/>
          <Workout text='Trening 3'/>
        </View>
      </View>
    </View>
  );
}

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
            headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  }
})

export default App;
