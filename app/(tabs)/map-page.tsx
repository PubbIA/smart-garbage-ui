import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

// Import your logo image
import plagePropreLogo from './../../assets/images/plagePropre.png'; // Adjust the path as per your file structure
import { RANDOM_QUOTE_API } from './../../constants/apiConstants'; // Adjust the path as per your file structure

// Assuming `global.user` is defined somewhere in your app
declare global {
  var user: {
    role: 'collector' | 'recycler';
    fullName: string;
    email: string;
    points: number;
  };
}

export default function MapPage() {
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  const [bins, setBins] = useState([
    {
      id: 1,
      latitude: 35.747907505756534,
      longitude: -5.8959126698753925,
      plasticPercentage: 30,
      cardboardPercentage: 50,
      metalPercentage: 20,
      distance: 500,
    },
    {
      id: 2,
      latitude: 35.737907505756534,
      longitude: -5.9259126698753925,
      plasticPercentage: 40,
      cardboardPercentage: 30,
      metalPercentage: 30,
      distance: 700,
    },
  ]);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [selectedBin, setSelectedBin] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(global.user.points);

  const [quote, setQuote] = useState<string>('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Location permission denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        setUserLocation({ latitude, longitude });

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    const handleUserPointsChange = () => {
      setUserPoints(global.user.points);
    };

    // Listen for changes in global.user.points
    handleUserPointsChange(); // Initialize with the current points
    const interval = setInterval(handleUserPointsChange, 1000); // Poll every second or use an event listener if you have one

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const formData = new FormData();
        formData.append('language', 'francais'); // Default to French, adjust as needed

        const response = await axios.post(RANDOM_QUOTE_API, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setQuote(response.data.quote);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  const handleMarkerPress = (bin: any) => {
    setSelectedBin(bin);
  };

  const handleRefresh = () => {
    // Example: Refresh user points
    setUserPoints(global.user.points);
  };

  if (!initialRegion || !userLocation) {
    return (
      <View style={styles.container}>
        {/* Replace "Loading..." with your logo */}
        <Image source={plagePropreLogo} style={styles.logo} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh Points</Text>
      </TouchableOpacity>
      <Text style={styles.userDetails}>
        {global.user.fullName} - Points: {userPoints}
      </Text>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Marker
            coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }}
            title="My Location"
            description="You are here"
          />

          {bins.map((bin) => (
            <Marker
              key={bin.id}
              coordinate={{ latitude: bin.latitude, longitude: bin.longitude }}
              title="Boundif Bin"
              pinColor="green"
              onPress={() => handleMarkerPress(bin)}
            >
              {selectedBin && selectedBin.id === bin.id && (
                <Callout style={styles.callout}>
                  <Text style={{ color: '#004aad' }}>Boundif Bin</Text>
                  <View style={{ paddingVertical: 5 }}>
                    <Text>Distance: {bin.distance} meters</Text>
                    <Text>Plastic: {bin.plasticPercentage}%</Text>
                    <Text>Cardboard: {bin.cardboardPercentage}%</Text>
                    <Text>Metal: {bin.metalPercentage}%</Text>
                  </View>
                </Callout>
              )}
            </Marker>
          ))}

          {bins.map((bin) => (
            <Polyline
              key={bin.id}
              coordinates={[
                { latitude: userLocation.latitude, longitude: userLocation.longitude },
                { latitude: bin.latitude, longitude: bin.longitude },
              ]}
              strokeColor="#3498db"
              strokeWidth={3}
            />
          ))}
        </MapView>
      </View>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteTitle}>Proverbe du jour</Text>
        <Text style={styles.quoteText}>{quote}</Text>
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
  userDetails: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  mapContainer: {
    width: '90%',
    height: '60%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    width: 140,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 5,
    borderColor: '#004aad',
    borderWidth: 1,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  quoteContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    paddingVertical: 10,
  },
  quoteText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e',
  },
  quoteTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004aad',
  },
  refreshButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
