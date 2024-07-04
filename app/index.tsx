import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Redirect } from 'expo-router';
import Login from '@/components/login';

export default function HomeScreen() {
  // Simulate user login state
  const [user, setUser] = useState(true); // Assume user is logged in

  if (user) {
    return <Redirect href="/map-page" />;
  }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
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
