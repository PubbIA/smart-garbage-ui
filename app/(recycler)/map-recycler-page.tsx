import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function MapPage() {
  return (
    <View style={styles.container}>
     
     
      <View style={styles.mapContainer}>
        <Text>Helo</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 35.7804,  // Tangier beach latitude
            longitude: -5.8130,  // Tangier beach longitude
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: 35.7804, longitude: -5.8130 }}
            title="Tangier Beach"
            description="Initial marker at Tangier beach"
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#004aad',
  },
  mapContainer: {
    width: '90%',
    height: '60%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: -90,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
