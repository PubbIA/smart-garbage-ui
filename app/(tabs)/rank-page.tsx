import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const globalRank = [
  { id: '1', name: 'Oail laamiri ', points: 150, avatar: 'https://example.com/user1-avatar.jpg' },
  { id: '2', name: 'vous', points: 120, avatar: 'https://example.com/current-user-avatar.jpg' },
  { id: '3', name: 'Ismail oukha', points: 100, avatar: 'https://example.com/user3-avatar.jpg' },
];

export default function RankPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rankSection}>
        <Text style={styles.sectionTitle}>Classement Global</Text>
        <FlatList
          data={globalRank}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.rankItem}>
              <Text style={styles.rankPosition}>{index + 1}.</Text>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.rankName}>{item.name}</Text>
              <Text style={styles.rankPoints}>{item.points} Points</Text>
            </View>
          )}
        />
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
    color: '#004aad',
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
    color: '#004aad',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  rankName: {
    fontSize: 18,
    color: '#34495e',
  },
  rankPoints: {
    fontSize: 16,
    color: '#e74c3c',
  },
});
