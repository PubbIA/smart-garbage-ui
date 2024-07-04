import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const nationalRank = [
  { id: '1', name: 'User1', points: 150 },
  { id: '2', name: 'vous', points: 120 },
  { id: '3', name: 'User3', points: 100 },
];

const regionalRank = [
  { id: '1', name: 'vous', points: 120 },
  { id: '2', name: 'User2', points: 110 },
  { id: '3', name: 'User3', points: 90 },
];

const currentUser = { id: '2', name: 'Current User', points: 120 };

export default function RankPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rankSection}>
        <Text style={styles.sectionTitle}>Classement National</Text>
        <FlatList
          data={nationalRank}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.rankItem}>
              <Text style={styles.rankPosition}>{index + 1}.</Text>
              <Text style={styles.rankName}>{item.name}</Text>
              <Text style={styles.rankPoints}>{item.points} Points</Text>
            </View>
          )}
        />
        <Text style={styles.currentRank}>
          Votre place: 2ème avec {currentUser.points} Points
        </Text>
      </View>
      <View style={styles.rankSection}>
        <Text style={styles.sectionTitle}>Classement Régional</Text>
        <FlatList
          data={regionalRank}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.rankItem}>
              <Text style={styles.rankPosition}>{index + 1}.</Text>
              <Text style={styles.rankName}>{item.name}</Text>
              <Text style={styles.rankPoints}>{item.points} Points</Text>
            </View>
          )}
        />
        <Text style={styles.currentRank}>
          Votre place: 1er avec {currentUser.points} Points
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  rankSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  rankItem: {
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
  rankPosition: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  rankName: {
    fontSize: 18,
    color: '#34495e',
  },
  rankPoints: {
    fontSize: 16,
    color: '#e74c3c',
  },
  currentRank: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    marginTop: 10,
  },
});
