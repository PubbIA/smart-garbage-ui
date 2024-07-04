import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MissionOfDay = () => {
  const [mission, setMission] = useState('');
  const [completedMissions, setCompletedMissions] = useState(0);

  const missions = [
    { text: 'Ramassez 5 déchets', target: 5 },
    { text: 'Recyclez 3 objets', target: 3 },
    { text: 'Réduisez votre consommation de plastique aujourd\'hui', target: 1 }
    // Add more missions as needed
  ];

  // Function to randomly select a mission
  const selectRandomMission = () => {
    const randomIndex = Math.floor(Math.random() * missions.length);
    const selectedMission = missions[randomIndex];
    setMission(selectedMission.text);
    setCompletedMissions(0); // Reset completed missions when mission changes
  };

  const completeMission = () => {
    if (completedMissions < missions.length) {
      setCompletedMissions(completedMissions + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mission du jour :</Text>
      <Text style={styles.missionText}>{mission}</Text>
      <Text style={styles.progressText}>{completedMissions}/{missions.length} missions complétées</Text>
      
      <Button title="Nouvelle mission" onPress={selectRandomMission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  missionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MissionOfDay;
