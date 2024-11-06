import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import Container from '../../components/Container';
import Background from '../../components/Background';

export default function Map() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, [])

  return (
    location ? (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title='Twoja lokalizacja'
        />
      </MapView>
    ) : <>
      <Container>
        <Background />
      </Container>
    </>
  );
}