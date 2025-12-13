import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ============================================
// TODO: CHANGE THIS TO YOUR NGROK URL!
// Same as LoginScreen.js
// ============================================
const API_URL = 'https://immersed-arrythmic-tonia.ngrok-free.dev/ebaguio-api';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!email || !password || !confirm) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting signup at:', API_URL);
      
      const response = await fetch(`${API_URL}/register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          confirm: confirm,
        }),
      });

      const data = await response.json();
      console.log('Signup response:', data);

      if (data.success) {
        Alert.alert(
          'Success', 
          'Account created successfully! You can now log in.', 
          [
            {
              text: 'OK',
              onPress: () => {
                setEmail('');
                setPassword('');
                setConfirm('');
                navigation.navigate('Login');
              }
            }
          ]
        );
      } else {
        Alert.alert('Registration Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert(
        'Connection Error',
        `Could not connect to server.\n\nMake sure:\n1. WAMP is running\n2. ngrok is running (ngrok http 80)\n3. API URL is correct: ${API_URL}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image
        source={require('../assets/ebaguioate-logo.jpg')}
        style={styles.logo}
      />

      <Text style={styles.debugText}>
        API: {API_URL.replace('https://', '').replace('http://', '').split('/')[0]}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor="#999"
        value={confirm}
        onChangeText={setConfirm}
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign up</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Already have an account?{" "}
        <Text
          style={{ fontWeight: "bold" }}
          onPress={() => navigation.navigate("Login")}
        >
          Log in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 25,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  debugText: {
    color: "#fff",
    fontSize: 10,
    marginBottom: 10,
    opacity: 0.7,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: "#0A369D",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#5A7FBD",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomText: {
    color: "#fff",
    marginTop: 20,
  },
});