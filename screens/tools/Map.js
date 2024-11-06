import { Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Background from '../../components/Background';
import Button from '../../components/buttons/Button';

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Aby korzystać z tej funkcji, musisz zezwolić aplikacji na dostęp do lokalizacji urządzenia.');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })()
  }, [])

  const retry = () => {
    setErrorMessage(null);
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (status === 'granted') {
        Location.getCurrentPositionAsync({}).then(location => {
          setLocation(location.coords);
        })
      } else {
        setErrorMessage('Uprawnienia nadal odrzucone, spróbuj ponownie.');
      }
    })
  }

  if (!location) {
    return (
      <Container>
        <Background />
        <View style={styles.textArea}>
          <Text style={[styles.text, { color: Colors.delete }]}>{errorMessage}</Text>
          {errorMessage ? (
            <Button onPress={() => retry()} text='Odśwież' />
          ) : <Text style={styles.text}>Ładowanie mapy...</Text>}
        </View>
      </Container>
    )
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title='Twoja lokalizacja' >
        <View style={styles.markerContainer}>
          <Image source={require('../../assets/images/marker.png')} style={styles.marker} />

          <Image source={require('../../assets/images/avatars/default/male-avatar.png')} style={styles.avatar} />
        </View>
      </Marker>
    </MapView>
  )
}

const styles = {
  textArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Nexa',
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
    margin: 20
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100
  },
  marker: {
    position: 'absolute',
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  avatar: {
    marginBottom: 14,
    marginRight: 2.5,
    width: 80,
    height: 80,
    borderRadius: 40
  }
}