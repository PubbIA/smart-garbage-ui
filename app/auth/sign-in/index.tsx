import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Validate form fields if needed
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Log form data
    console.log("Form Data:", { email, password });

    // Example navigation using router.push
    // router.push('/home'); // Replace '/home' with your destination route
  };

  const handleSignUp = () => {
    router.push('/auth/sign-up'); // Replace '/auth/sign-up' with your sign-up route
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Se Connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpContainer} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Vous n'avez pas de compte ? Inscrivez-vous</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'outfit-Bold',
    fontSize: 28,
    color: '#004aad',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'outfit-Medium',
    fontSize: 18,
    color: '#34495e',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#34495e',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#004aad',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'outfit-Bold',
    fontSize: 18,
    color: '#fff',
  },
  signUpContainer: {
    marginTop: 20,
  },
  signUpText: {
    fontFamily: 'outfit-Medium',
    fontSize: 16,
    color: '#004aad',
  },
});
