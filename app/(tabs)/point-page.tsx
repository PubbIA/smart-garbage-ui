import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PointPage() {
  const [userPoints, setUserPoints] = useState(global.user.points); // Example user points

  useEffect(() => {
    const interval = setInterval(() => {
      setUserPoints(global.user.points);
    }, 1000); // Check for changes every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const offers = [
    { id: '2', name: 'Balade en Jet Ski', points: 100 },
    { id: '3', name: 'Pack cosmétique', points: 75 },
    { id: '4', name: 'Location de parasol de plage', points: 20 },
    { id: '5', name: 'Équipement de snorkeling', points: 60 },
    { id: '6', name: 'Volleyball de plage gratuit', points: 30 },
    { id: '7', name: 'Football gratuit', points: 25 },
    { id: '8', name: 'Tennis Paddle gratuit', points: 40 },
    { id: '9', name: 'Crème solaire', points: 15 },
    { id: '10', name: 'Casquette', points: 10 },
    { id: '11', name: 'Bracelet recyclé', points: 5 },
    { id: '12', name: 'Jeux divers', points: 20 },
    { id: '1', name: 'Accès au événement de music ', points: 50 },
    // Add more offers as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dashContainer}>
          <View style={styles.dash} />
          <Text style={styles.pointsText}>Points: {userPoints}</Text>
          <View style={styles.dash} />
        </View>
      </View>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.offerContainer}>
            <Text style={styles.offerName}>{item.name}</Text>
            <Text style={styles.offerPoints}>{item.points} Points</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dash: {
    flex: 1,
    height: 1,
    backgroundColor: '#004aad',
    marginHorizontal: 10,
  },
  pointsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004aad',
  },
  offerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  offerName: {
    fontSize: 18,
    color: '#34495e',
  },
  offerPoints: {
    fontSize: 16,
    color: '#e74c3c',
  },
});
