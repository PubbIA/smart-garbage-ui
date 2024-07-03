import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingPage() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSignIn = () => {
    router.push("/auth/sign-in");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
          <Image
            source={require("./../assets/images/plagePropre.png")}
            style={styles.logo}
          />
        </Animated.View>
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue</Text>
          <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Se Connecter</Text>
          </TouchableOpacity>
          <Text style={styles.awarenessText}>
            Chaque geste compte! Ramassez des déchets et gagnez des points!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#00000", // Fallback color
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: -100,
  },
  content: {
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontFamily: "outfit-Bold",
    fontSize: 32,
    color: "#2c3e50",
    marginTop: 20,
  },
  subtitle: {
    fontFamily: "outfit-Medium",
    fontSize: 20,
    color: "#34495e",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 30,
  },
  buttonText: {
    fontFamily: "outfit-Bold",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  awarenessText: {
    fontFamily: "outfit-Medium",
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 50,
    paddingHorizontal: 20,
  },
});
