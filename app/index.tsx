import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import Login from '@/components/login';

export default function HomeScreen() {
  // Simulate user login state
  const [user, setUser] = useState({
    isConnected: true,
    role: 'collector'
  }); // Assume user is logged in

  // Redirect if user is not connected

  // Redirect based on user role
  if (user.role === 'recycler' && user.isConnected) {
    return <Redirect href="/map-recycler-page" />;
  } else if (user.role === 'collector' && user.isConnected) {
    (global as any).user = {
      role: 'collector',
      fullName: 'Med HADDAD',
      email:'mohh@gmail.com',
      points: 0, // Initial points
      jWtToken: '#jasjai!"#', // Initial JWT token
  };
    
    return <Redirect href="/map-page" />;
  }

  // Default rendering if none of the conditions are met
  return (
    <View style={styles.container}>
      {/* Render Login component if user is not logged in */}
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
