import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { CREATE_USER_API } from "./../../../constants/apiConstants"; // Adjust import based on your constants
type UserRole = 'collector' | 'recycler';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>('collector'); // Default role

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateStep1()) {
        return;
      }
      setStep(2);
    } else {
      if (!validateStep2()) {
        return;
      }
      submitForm();
    }
  };

  const validateStep1 = () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!photo) {
      Alert.alert("Photo requise", "Veuillez télécharger une photo.");
      return false;
    }
    return true;
  };

  const submitForm = () => {
    // Simulating form submission (replace with actual API call if needed)
    (global as any).user = {
        role: userRole,
        fullName,
        email,
        points: 0, // Initial points
        jWtToken: '#jasjai!"#', // Initial JWT token
    };
    
    // Redirect based on role
    if (userRole === 'recycler') {
        router.navigate('/map-recycler-page');
    } else {
        router.navigate('/map-page');
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

  const handleSave = () => {
    if (step === 1) {
      handleNextStep();
    } else {
      submitForm();
    }
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
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>
              {step === 1 ? "Suivant" : "Sauvegarder"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.content}>
          <Text style={styles.title}>Étape 2: Téléchargez votre photo</Text>
          <Text style={styles.subtitle}>Centre votre visage dans le cercle</Text>
          <View style={styles.cameraPlaceholder}>
            {loading && <ActivityIndicator size="large" color="#004aad" />}
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <Text style={styles.cameraText}>Aucune photo sélectionnée</Text>
            )}
          </View>
          <TouchableOpacity style={styles.buttonSmall} onPress={handleUploadImage}>
            <Text style={styles.buttonTextSmall}>Télécharger une image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Sauvegarder</Text>
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
    color: "#004aad",
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
    backgroundColor: "#004aad",
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
    borderColor: "#004aad",
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
  cameraPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  cameraText: {
    fontFamily: "outfit-Medium",
    fontSize: 16,
    color: "#34495e",
    position: "absolute",
    bottom: 10,
  },
  photo: {
    width: 250,
    height: 250,
    borderRadius: 125,
    position: "absolute",
  },
});
