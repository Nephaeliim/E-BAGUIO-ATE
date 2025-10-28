import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AlertsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.card, styles.red]}>
        <Ionicons name="rainy-outline" size={24} color="#fff" />
        <Text style={styles.title}>Heavy Rain Warning!</Text>
        <Text style={styles.text}>Heavy rainfall expected from 2:00 PM to 10:00 PM today. Stay indoors.</Text>
      </View>

      <View style={[styles.card, styles.yellow]}>
        <Ionicons name="flash-outline" size={24} color="#fff" />
        <Text style={styles.title}>Scheduled Power Outage</Text>
        <Text style={styles.text}>Maintenance work from 8:00 AM to 2:00 PM in Barangay QM.</Text>
      </View>

      <View style={[styles.card, styles.orange]}>
        <Ionicons name="alert-circle-outline" size={24} color="#fff" />
        <Text style={styles.title}>Landslide Warning!</Text>
        <Text style={styles.text}>Avoid travel in steep areas. Alert issued by PAGASA.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7E0', padding: 20 },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  red: { backgroundColor: '#E74C3C' },
  yellow: { backgroundColor: '#F1C40F' },
  orange: { backgroundColor: '#E67E22' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 5 },
  text: { color: '#fff', marginTop: 5 },
});
