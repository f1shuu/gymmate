import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Loader({ navigation }) {
  useEffect(() => {
    const gifTimeout = setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 2500);

    return () => clearTimeout(gifTimeout);
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: '#376DEC', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('./assets/splash.gif')}
        style={{ resizeMode: 'center' }}
      />
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loader">
        <Stack.Screen
          name="Loader"
          component={Loader}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false, animation: 'none' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
