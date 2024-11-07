import { Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Background from '../../components/Background';
import Button from '../../components/buttons/Button';

import { GOOGLE_MAPS_API_KEY } from '@env';

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Aby korzystać z tej funkcji, musisz zezwolić aplikacji na dostęp do lokalizacji urządzenia.');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      let gymsNearby = await fetchNearbyGyms(userLocation.coords.latitude, userLocation.coords.longitude);
      setGyms(gymsNearby);
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

  async function fetchNearbyGyms(latitude, longitude) {
    const searchRadius = 5000;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${searchRadius}&type=gym&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) return data.results;
      else return [];
    } catch (error) {
      console.error('Error fetching gyms:', error);
      return [];
    }
  }

  if (!location) {
    return (
      <Container>
        <Background />
        <View style={styles.textArea}>
          {errorMessage ? (
            <Text style={[styles.text, { color: Colors.delete }]}>{errorMessage}</Text>
          ) : <Text style={styles.text}>Ładowanie mapy...</Text>}
          <Button onPress={() => retry()} text='Odśwież' />
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
        latitudeDelta: 0.092,
        longitudeDelta: 0.042
      }}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude
        }}
        title='Twoja lokalizacja'
        tracksViewChanges={false}
        draggable
      >
        <View style={[styles.markerContainer, { width: 75, height: 75 }]}>
          <Image source={require('../../assets/images/marker.png')} style={[styles.marker, { width: 75, height: 75 }]} />
          <Image source={require('../../assets/images/avatars/default/male-avatar.png')} style={styles.avatar} />
        </View>
      </Marker>
      {gyms.map((gym, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: gym.geometry.location.lat,
            longitude: gym.geometry.location.lng,
          }}
          title={gym.name}
          description={gym.vicinity}
          tracksViewChanges={false}
        >
          <View style={[styles.markerContainer, { width: 50, height: 50 }]}>
            <Image source={require('../../assets/images/marker.png')} style={[styles.marker, { width: 50, height: 50 }]} />
          </View>
        </Marker>
      ))}
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
    justifyContent: 'center'
  },
  marker: {
    position: 'absolute',
    resizeMode: 'contain'
  },
  avatar: {
    marginBottom: 11,
    marginRight: 2,
    width: 60,
    height: 60,
    borderRadius: 40
  }
}