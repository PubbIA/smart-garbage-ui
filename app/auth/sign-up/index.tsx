import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useRouter } from "expo-router";
  import * as ImagePicker from "expo-image-picker";
  
  export default function SignUp() {
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState("");
    const router = useRouter();
  
    const handleNextStep = () => {
      if (step === 1) {
        setStep(2);
      } else {
        console.log({ fullName, email, password, photo });
        router.push("/"); // Replace '/home' with the actual home route in your application
      }
    };
  
    const handleUploadImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    };
  
    const handleSkip = () => {
      setPhoto("");
      handleNextStep();
    };
  
    return (
      <SafeAreaView style={styles.container}>
        {step === 1 && (
          <View style={styles.content}>
            <Text style={styles.title}>Étape 1: Créez votre compte</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom Complet"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
          </View>
        )}
  
        {step === 2 && (
          <View style={styles.content}>
            <Text style={styles.title}>Étape 2: Téléchargez votre photo</Text>
            <Text style={styles.subtitle}>
              Centre votre visage dans le cercle
            </Text>
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.cameraText}>Camera Here</Text>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photo} />
              ) : null}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>comencer a scaner le visage</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSmall}
              onPress={handleUploadImage}
            >
              <Text style={styles.buttonTextSmall}>ou Télécharger une image </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Passer pour le moment</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f8ff",
    },
    content: {
      width: "80%",
      alignItems: "center",
    },
    title: {
      fontFamily: "outfit-Bold",
      fontSize: 28,
      color: "#2c3e50",
      marginBottom: 10,
    },
    subtitle: {
      fontFamily: "outfit-Medium",
      fontSize: 18,
      color: "#34495e",
      marginBottom: 30,
    },
    input: {
      width: "100%",
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      color: "#34495e",
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    button: {
      backgroundColor: "#3498db",
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 30,
      marginTop: 20,
    },
    buttonText: {
      fontFamily: "outfit-Bold",
      fontSize: 18,
      color: "#fff",
    },
    buttonSmall: {
      backgroundColor: "#FFFFFF",
      borderWidth: 3,
      borderColor: "#3498db",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginTop: 20,
    },
    buttonTextSmall: {
      fontFamily: "outfit-Bold",
      fontSize: 14,
      color: "#00000",
      
    },
    skipButton: {
      marginTop: 20,
    },
    skipButtonText: {
      fontFamily: "outfit-Medium",
      fontSize: 16,
      color: "#3498db",
    },
    cameraPlaceholder: {
      width: 250,
      height: 250,
      borderRadius: 125,
      backgroundColor: "#ddd",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    cameraText: {
      fontFamily: "outfit-Medium",
      fontSize: 16,
      color: "#34495e",
    },
    photo: {
      width: 250,
      height: 250,
      borderRadius: 125,
      position: "absolute",
    },
  });
  