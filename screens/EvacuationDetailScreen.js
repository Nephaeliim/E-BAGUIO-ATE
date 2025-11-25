// components/EvacuationDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EvacuationDetailScreen({ route, navigation }) {
  const { center } = route.params;
  
  const capacityPercentage = Math.min(100, Math.max(0, (center.currentCapacity / center.capacity) * 100));
  const getCapacityColor = () => {
    if (capacityPercentage >= 90) return '#E74C3C';
    if (capacityPercentage >= 70) return '#F1C40F';
    return '#2ECC71';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-BAGUIO-ATE</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="warning-outline" size={24} color="#000" style={{ marginRight: 10 }} />
          <Ionicons name="globe-outline" size={24} color="#000" />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.detailCard}>
          <Text style={styles.detailCenterName}>{center.name}</Text>
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.address}>{center.address}</Text>
          </View>

          {/* Map Images - Replace with actual map components */}
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/300x150/4285F4/ffffff?text=Map+View' }}
              style={styles.mapImage}
            />
            <Image
              source={{ uri: 'https://via.placeholder.com/300x150/34A853/ffffff?text=Street+View' }}
              style={styles.mapImage}
            />
          </View>

          <View style={styles.capacitySection}>
            <View style={styles.capacityHeader}>
              <Text style={styles.capacityLabel}>Capacity</Text>
              <Text style={styles.capacityNumbers}>{center.currentCapacity}/{center.capacity}</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${capacityPercentage}%`, backgroundColor: getCapacityColor() }
                ]}
              />
            </View>
          </View>

          <View style={styles.facilitiesSection}>
            <Text style={styles.facilitiesLabel}>Available Facilities</Text>
            <View style={styles.facilitiesRow}>
              {center.facilities.map((facility, index) => (
                <View key={index} style={styles.facilityTag}>
                  <Ionicons name={facility.icon} size={14} color="#0284c7" />
                  <Text style={styles.facilityText}>{facility.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },

  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', flex: 1, textAlign: 'center' },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  backButton: {
    marginRight: 16,
  },

  scrollView: { flex: 1 },

  detailCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3
  },

  detailCenterName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000'
  },

  addressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },

  address: { fontSize: 13, marginLeft: 4, color: '#666', flex: 1 },

  mapContainer: {
    marginVertical: 16,
  },

  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#e5e5e5',
  },

  capacitySection: { marginBottom: 12 },

  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },

  capacityLabel: { fontSize: 13, fontWeight: '600', color: '#000' },

  capacityNumbers: { fontSize: 13, color: '#666' },

  progressBar: {
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden'
  },

  progressFill: {
    height: '100%',
    borderRadius: 4
  },

  facilitiesSection: { marginBottom: 12 },

  facilitiesLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8, color: '#000' },

  facilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  facilityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8
  },

  facilityText: {
    fontSize: 11,
    color: '#0284c7',
    marginLeft: 4
  },
});