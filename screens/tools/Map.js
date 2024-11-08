import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import Colors from '../../Colors';
import Container from '../../components/Container';
import Background from '../../components/Background';
import Modal from '../../components/Modal';
import Button from '../../components/buttons/Button';

export default function Map() {
  const [message, setMessage] = useState(null);
  const [locationAccessGranted, setLocationAccessGranted] = useState(false);
  const [location, setLocation] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const checkForLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    let isLocationEnabled = await Location.hasServicesEnabledAsync();

    if (status === 'granted') {
      setLocationAccessGranted(true);
      if (isLocationEnabled) {
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);

        let gymsNearby = await fetchNearbyGyms(userLocation.coords.latitude, userLocation.coords.longitude);
        setGyms(gymsNearby);
      } else setMessage('Usługa lokalizacji urządzenia jest wyłączona');
    } else {
      setLocationAccessGranted(false);
      setMessage('Aby korzystać z tej funkcji, musisz zezwolić na dostęp do lokalizacji urządzenia.');
    }
  }

  useEffect(() => {
    checkForLocation();
  }, [])

  async function fetchNearbyGyms(latitude, longitude) {
    const searchRadius = 5000;
    const key = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${searchRadius}&type=gym&key=${key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) return data.results;
      else return [];
    } catch (error) {
      console.error('Error fetching gyms: ', error);
      return [];
    }
  }

  const goToSettings = async () => {
    Linking.openSettings();
    checkForLocation();
  }

  if (!location) {
    return (
      <Container>
        <Background />
        <View style={styles.textArea}>
          <Text style={[styles.text, { color: Colors.delete }]}>{message}</Text>
          {!locationAccessGranted ?
            <>
              <TouchableOpacity onPress={() => setIsModalVisible(() => !isModalVisible)}>
                <Text style={styles.help}>Gdzie mogę to zrobić?</Text>
              </TouchableOpacity>
              <Button onPress={() => goToSettings()} text='Ustawienia' />
              <Modal
                isVisible={isModalVisible}
                text='Uprawnienia > Lokalizacja > "Zawsze zezwalaj"'
                twoButtons={false}
                buttonOneText='OK'
                buttonOneOnPress={() => setIsModalVisible(() => !isModalVisible)}
              />
            </> :
            <Button onPress={() => checkForLocation()} text='Odśwież' />}
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
  help: {
    fontFamily: 'Nexa',
    color: Colors.secondary,
    marginBottom: 10
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