import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OutagesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.card, styles.green]}>
        <Ionicons name="location-outline" size={24} color="#fff" />
        <Text style={styles.title}>Burnham Park</Text>
        <Text style={styles.text}>Power restored: 12:06 PM</Text>
      </View>

      <View style={[styles.card, styles.green]}>
        <Ionicons name="location-outline" size={24} color="#fff" />
        <Text style={styles.title}>Session Road</Text>
        <Text style={styles.text}>Maintenance scheduled: 2:00 PM - 5:00 PM</Text>
      </View>

      <View style={[styles.card, styles.red]}>
        <Ionicons name="location-outline" size={24} color="#fff" />
        <Text style={styles.title}>Camp 7</Text>
        <Text style={styles.text}>Ongoing line restoration in progress.</Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.sectionTitle}>Service Provider Status</Text>
        <Text>Electricity: ✅ Active</Text>
        <Text>Water Supply: ✅ Active</Text>
        <Text>Internet Coverage: ✅ Normal</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8FDE8', padding: 20 },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  green: { backgroundColor: '#27AE60' },
  red: { backgroundColor: '#E74C3C' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 5 },
  text: { color: '#fff', marginTop: 5 },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#27AE60', marginBottom: 5 },
});
