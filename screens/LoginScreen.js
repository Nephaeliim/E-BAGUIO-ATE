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
import Checkbox from 'expo-checkbox';
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

// ============================================
// TODO: CHANGE THIS TO YOUR NGROK URL!
// ============================================
// For emulator testing (localhost):
// const API_URL = 'http://10.0.2.2/ebaguio-api';

// For real device with ngrok (after running: ngrok http 80):
const API_URL = 'https://immersed-arrythmic-tonia.ngrok-free.dev/ebaguio-api';

// For production with your public IP:
// const API_URL = 'http://YOUR.PUBLIC.IP.HERE/ebaguio-api';

// For production with domain:
// const API_URL = 'https://yourdomain.com/ebaguio-api';
// ============================================

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '667934639842-16kph2p16hsueou1t6lcpv9toqk11v77.apps.googleusercontent.com',
    webClientId: '667934639842-mtam5uiig84e8pjctmi26rqfcbgpugcb.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleSignIn(authentication.accessToken);
    }
  }, [response]);

  const handleGoogleSignIn = async (token) => {
    try {
      setLoading(true);
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userInfo = await userInfoResponse.json();
      
      Alert.alert(
        'Success',
        `Welcome ${userInfo.name}!`,
        [{ text: 'OK', onPress: () => navigation.replace("MainTabs") }]
      );
    } catch (error) {
      Alert.alert('Error', 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting to connect to:', API_URL);
      
      const response = await fetch(`${API_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Login successful!', [
          {
            text: 'OK',
            onPress: () => navigation.replace("MainTabs")
          }
        ]);
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Connection Error',
        `Could not connect to server at ${API_URL}\n\nMake sure:\n1. WAMP is running\n2. ngrok is running (ngrok http 80)\n3. You updated the API_URL in the code\n\nWould you like to continue as guest?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Guest Mode', onPress: handleGuestMode }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image
        source={require('../assets/adaptive-icon.png')}
        style={styles.logo}
      />

      {/* Show current API URL for debugging */}
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
        color="#333"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        editable={!loading}
        color="#333"
      />

      <View style={styles.row}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox value={rememberMe} onValueChange={setRememberMe} />
          <Text style={{ color: "#fff" }}> Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: "#fff" }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.guestButton}
        onPress={handleGuestMode}
        disabled={loading}
      >
        <Ionicons name="person-outline" size={20} color="#fff" />
        <Text style={styles.guestButtonText}>Continue as Guest</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or Sign in with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => promptAsync()}
          disabled={!request || loading}
        >
          <Image
            style={styles.socialIcon}
            source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }}
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
  row: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0A369D",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#5A7FBD",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  guestButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  guestButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  divider: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  dividerText: {
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 13,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});