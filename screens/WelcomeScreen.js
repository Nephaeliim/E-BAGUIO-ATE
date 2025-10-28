import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ebaguioate-logo.jpg')}
        style={styles.logo}
      />
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
      </View>

      <Text style={styles.orText}>or Sign in with</Text>
      <View style={styles.socialRow}>
        <Image
          style={styles.icon}
          source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }}
        />
        <Image
          style={styles.icon}
          source={{ uri: "https://img.icons8.com/ios-filled/50/mac-os.png" }}
        />
        <Image
          style={styles.icon}
          source={{ uri: "https://img.icons8.com/ios-filled/50/facebook-new.png" }}
        />
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
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  buttonContainer: {
    width: "70%",
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
    width: 40,
    height: 40,
  },
});
