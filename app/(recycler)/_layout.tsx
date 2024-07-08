import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

const placeholderAvatar = 'https://via.placeholder.com/150'; // Placeholder avatar URL

// Component for rendering avatar in header
const HeaderAvatar = () => (
  <TouchableOpacity style={styles.avatarContainer} onPress={() => {}}>
    <Image source={{ uri: placeholderAvatar }} style={styles.avatar} />
  </TouchableOpacity>
);

// Main component for RecyclerTabLayout
export default function RecyclerTabLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
        headerRight: () => <HeaderAvatar />,
      }}
    >
      <Drawer.Screen
        name="map-recycler-page"
 
        options={{
          title: 'Home',
          drawerIcon: () => <Ionicons name="map" size={24} color="#3498db" />,
        }}
      />
      <Drawer.Screen
      name = 'nearby-garbage'
        options={{
            title: 'Nearby Garbage',
            drawerIcon: () => <Ionicons name="map" size={24} color="#3498db" />,
        }}
        />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
