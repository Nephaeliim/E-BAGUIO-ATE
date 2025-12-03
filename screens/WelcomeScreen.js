import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen({ navigation }) {
  const handleGuestMode = () => {
    Alert.alert(
      'Guest Mode',
      'You will have limited access to some features. Create an account for full access.',
      [
        {
          text: 'Continue as Guest',
          onPress: () => navigation.replace("MainTabs")
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSocialSignIn = (platform) => {
    Alert.alert(
      `${platform} Sign In`,
      'Social authentication will redirect you to the login screen.',
      [
        {
          text: 'Continue',
          onPress: () => navigation.navigate("Login")
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ebaguioate-logo.jpg')}
        style={styles.logo}
      />
      
      <Text style={styles.welcomeText}>Welcome to E-BAGUIO-ATE</Text>
      <Text style={styles.subtitleText}>Your Emergency Alert & Response System</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#3B82F6" }]}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Guest Mode Button */}
        <TouchableOpacity
          style={styles.guestButton}
          onPress={handleGuestMode}
        >
          <Ionicons name="person-outline" size={20} color="#fff" />
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>or Sign in with</Text>
      <View style={styles.socialRow}>
        <TouchableOpacity onPress={() => handleSocialSignIn('Google')}>
          <Image
            style={styles.icon}
            source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialSignIn('Apple')}>
          <Image
            style={styles.icon}
            source={{ uri: "https://img.icons8.com/ios-filled/50/ffffff/mac-os.png" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialSignIn('Facebook')}>
          <Image
            style={styles.icon}
            source={{ uri: "https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
    gap: 10,
  },
  button: {
    backgroundColor: "#0A369D",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  guestButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  guestButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  orText: {
    color: "#fff",
    marginTop: 30,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
    marginTop: 15,
    gap: 20,
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 5,
  },
});