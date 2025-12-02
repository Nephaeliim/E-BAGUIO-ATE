import React, { useState, useEffect } from 'react';
import CustomHeader from './CustomHeader';  
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AlertsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [pagasaAlerts, setPagasaAlerts] = useState([]);

  // Mock PAGASA data - In production, this would fetch from PAGASA API
  const mockPagasaData = [
    {
      id: 1,
      typhoonName: 'Typhoon Kiko',
      signal: 4,
      affectedAreas: ['Baguio City', 'Benguet', 'La Union'],
      description: 'Typhoon Kiko brings violent winds and heavy rainfall to Northern Luzon.',
      timestamp: '1:00 PM',
      sourceUrl: 'https://www.facebook.com/PAGASA.DOST.GOV.PH'
    }
  ];

  useEffect(() => {
    // In production, fetch real PAGASA data here
    setPagasaAlerts(mockPagasaData);
  }, []);

  const handleOpenSource = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} backgroundColor="#FFF7E0" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* PAGASA Typhoon Alerts */}
        {pagasaAlerts.map((alert) => (
          <TouchableOpacity
            key={alert.id}
            style={[styles.card, styles.red]}
            onPress={() => handleOpenSource(alert.sourceUrl)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="warning" size={24} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{alert.typhoonName}</Text>
                <View style={styles.signalBadge}>
                  <Text style={styles.signalText}>Signal #{alert.signal}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.text}>{alert.description}</Text>
            <Text style={styles.text}>Affected: {alert.affectedAreas.join(', ')}</Text>
            <View style={styles.cardFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="time-outline" size={14} color="#fff" />
                <Text style={styles.footerText}>{alert.timestamp}</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="link-outline" size={14} color="#fff" />
                <Text style={styles.footerText}>Tap for PAGASA source</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Heavy Rain Warning */}
        <View style={[styles.card, styles.red]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="warning" size={24} color="#fff" />
            </View>
            <Text style={styles.title}>Heavy Rain Warning!</Text>
          </View>
          <Text style={styles.text}>Heavy rainfall expected from 2:00 PM to 8:00 PM today.</Text>
          <Text style={styles.text}>Stay indoors and prepare emergency kit.</Text>
          <View style={styles.cardFooter}>
            <View style={styles.footerItem}>
              <Ionicons name="time-outline" size={14} color="#fff" />
              <Text style={styles.footerText}>1:00 PM</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons name="location-outline" size={14} color="#fff" />
              <Text style={styles.footerText}>Baguio City</Text>
            </View>
          </View>
        </View>

        {/* Scheduled Power Outage */}
        <View style={[styles.card, styles.yellow]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="flash" size={24} color="#fff" />
            </View>
            <Text style={styles.title}>Scheduled Power Outage</Text>
          </View>
          <Text style={styles.text}>Power interruption in Barangay Session Road from 10:00 AM to 2:00 PM for maintenance.</Text>
          <View style={styles.cardFooter}>
            <View style={styles.footerItem}>
              <Ionicons name="time-outline" size={14} color="#fff" />
              <Text style={styles.footerText}>7:27 AM</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons name="location-outline" size={14} color="#fff" />
              <Text style={styles.footerText}>Baguio City</Text>
            </View>
          </View>
        </View>

        {/* Landslide Warning */}
        <View style={[styles.card, styles.orange]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="warning" size={24} color="#fff" />
            </View>
            <Text style={styles.title}>Landslide Warning!</Text>
          </View>
          <Text style={styles.text}>Heavy rains may trigger landslides along Kennon Road.</Text>
          <Text style={styles.text}>Avoid non-essential travel and watch for falling rocks.</Text>
          <View style={styles.cardFooter}>
            <View style={styles.footerItem}>
              <Ionicons name="time-outline" size={14} color="#fff" />
              <Text style={styles.footerText}>3:01 PM</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons name="location-outline" size={14} color="#fff" />
              <Text style={styles.footerText}>Baguio City</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF7E0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  red: { backgroundColor: '#E74C3C' },
  yellow: { backgroundColor: '#F1C40F' },
  orange: { backgroundColor: '#E67E22' },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff',
    flex: 1,
  },
  signalBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  signalText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: { 
    color: '#fff', 
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});