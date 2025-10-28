import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>E-BAGUIO-ATE</Text>
          <Ionicons name="globe-outline" size={24} color="#fff" />
        </View>

        <Text style={styles.welcome}>Welcome!</Text>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="medical" size={28} color="white" />
            <Text style={styles.actionText}>First Aid Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={28} color="white" />
            <Text style={styles.actionText}>Community Tab</Text>
          </TouchableOpacity>
        </View>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <Text style={styles.location}>Bakakeng Central</Text>
          <Text style={styles.temp}>18°C</Text>
          <Text style={styles.condition}>🌧 Rain</Text>
          <Text style={styles.range}>16° / 23°</Text>
        </View>

        {/* System Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.sectionTitle}>System Status</Text>

          <View style={styles.statusItem}>
            <Text>Weather Monitoring</Text>
            <Text style={styles.statusActive}>ACTIVE</Text>
          </View>

          <View style={styles.statusItem}>
            <Text>Power Grid Status</Text>
            <Text style={styles.statusWarning}>PARTIAL OUTAGE</Text>
          </View>

          <View style={styles.statusItem}>
            <Text>Internet Coverage</Text>
            <Text style={styles.statusGood}>GOOD</Text>
          </View>

          <View style={styles.statusItem}>
            <Text>Emergency Services</Text>
            <Text style={styles.statusGood}>AVAILABLE</Text>
          </View>
        </View>

        {/* Alerts */}
        <View style={styles.alertCard}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/58/Typhoon_Mangkhut_2018-09-12_0300Z.jpg" }}
            style={styles.alertImage}
          />
          <Text style={styles.alertText}>
            Signal No. 4 Raised: Typhoon ‘Kiko’ Threatens Northern Philippines With Violent Winds
          </Text>
        </View>

        <View style={styles.alertCard}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Thunderstorm_over_Tampa_Florida.jpg" }}
            style={styles.alertImage}
          />
          <Text style={styles.alertText}>
            Severe Thunderstorm Batters Baguio City: PAGASA Issues Heavy Rainfall Warning
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <Ionicons name="flash-outline" size={24} color="#007AFF" />
        <Ionicons name="alert-circle-outline" size={24} color="#007AFF" />
        <Ionicons name="home" size={28} color="#007AFF" />
        <Ionicons name="exit-outline" size={24} color="#007AFF" />
        <Ionicons name="help-circle-outline" size={24} color="#007AFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6ECF3",
  },
  header: {
    backgroundColor: "#4da6ff",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    width: "40%",
  },
  actionText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  weatherCard: {
    backgroundColor: "#003366",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  location: {
    color: "white",
    fontSize: 16,
  },
  temp: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  condition: {
    color: "white",
    fontSize: 18,
  },
  range: {
    color: "#cce0ff",
    fontSize: 14,
  },
  statusContainer: {
    backgroundColor: "#cce6ff",
    margin: 20,
    borderRadius: 16,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  statusActive: {
    color: "green",
    fontWeight: "bold",
  },
  statusWarning: {
    color: "#cc6600",
    fontWeight: "bold",
  },
  statusGood: {
    color: "green",
    fontWeight: "bold",
  },
  alertCard: {
    backgroundColor: "#d9d9d9",
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
  },
  alertImage: {
    height: 100,
    width: "100%",
  },
  alertText: {
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
