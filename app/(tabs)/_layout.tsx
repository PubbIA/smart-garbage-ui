import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

// Simulated user points
const userPoints = 120;

const TabLayout = () => {
  const toggleSidebar = () => {
    // Toggle sidebar visibility logic
    console.log("Toggle sidebar");
  };

  const navigateToAccount = () => {
    // Navigate to account screen logic
    console.log("Navigate to account");
  };

  // Placeholder user avatar URL
  const placeholderAvatar = 'https://via.placeholder.com/150';

  return (
    <Drawer
      screenOptions={{
        headerShown: true, // Display header
        headerTitle: () => (
          <Text style={styles.pointsText}>Points: {global.user.points}</Text>
        ), // Display user points
        headerRight: () => (
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={navigateToAccount}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: placeholderAvatar }} style={styles.avatar} />
              </View>
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      {/* Define your screens with titles and icons */}
      <Drawer.Screen
        name="map-page"
    
        options={{
          title: "Home",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "map-outline"}
              size={size}
              color={focused ? "#004aad" : "#004aad"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="games-page"
      
        options={{
          title: "Games",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "game-controller" : "game-controller-outline"}
              size={size}
              color={focused ? "#004aad" : "#004aad"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="point-page"
        
        options={{
          title: "Points",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={size}
              color={focused ? "#004aad" : "#004aad"}
            />
          ),
        }}
      />
       
      <Drawer.Screen
        name="rank-page"
        
        options={{
          title: "Rank",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "trophy" : "trophy-outline"}
              size={size}
              color={focused ? "#004aad" : "#004aad"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="mission-of-day"
        
        options={{
          title: "Mission of the Day",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "checkbox" : "checkbox-outline"}
              size={size}
              color={focused ? "#004aad" : "#004aad"}
            />
          ),
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  pointsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004aad",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default TabLayout;
