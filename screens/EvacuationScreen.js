import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EvacuationCenter = ({
  name,
  address,
  distance,
  capacity,
  currentCapacity,
  facilities,
  onPress,
  centerData
}) => {
  const capacityPercentage = Math.min(
    100,
    Math.max(0, (currentCapacity / capacity) * 100)
  );

  const getCapacityColor = () => {
    if (capacityPercentage >= 90) return '#E74C3C';
    if (capacityPercentage >= 70) return '#F1C40F';
    return '#2ECC71';
  };

  return (
    <View style={styles.card}>
      <Text style={styles.centerName}>{name}</Text>

      <View style={styles.addressRow}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.address}>{address}</Text>
      </View>

      <Text style={styles.distance}>{distance}</Text>

      <View style={styles.capacitySection}>
        <View style={styles.capacityHeader}>
          <Text style={styles.capacityLabel}>Capacity</Text>
          <Text style={styles.capacityNumbers}>
            {currentCapacity}/{capacity}
          </Text>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${capacityPercentage}%`,
                backgroundColor: getCapacityColor(),
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.facilitiesSection}>
        <Text style={styles.facilitiesLabel}>Available Facilities</Text>

        <View style={styles.facilitiesRow}>
          {facilities.map((facility, index) => (
            <View key={index} style={styles.facilityTag}>
              <Ionicons name={facility.icon} size={14} color="#0284c7" />
              <Text style={styles.facilityText}>{facility.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.directionsButton}
        onPress={() => onPress(centerData)}
      >
        <Ionicons name="navigate-outline" size={18} color="#fff" />
        <Text style={styles.directionsText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function EvacuationScreen({ navigation }) {
  const centers = [
    {
      name: 'Baguio Convention Center',
      address: 'Gov. Pack Road, Baguio City',
      latitude: 16.4119,
      longitude: 120.5960,
      distance: '1.1 km away',
      capacity: 450,
      currentCapacity: 100,
      facilities: [
        { icon: 'medical-outline', name: 'Medical Station' },
        { icon: 'man-outline', name: 'Restrooms' },
        { icon: 'flash-outline', name: 'Charging Station' },
        { icon: 'wifi-outline', name: 'Wi-Fi' },
      ],
    },
    {
      name: 'UP Baguio Gym',
      address: 'Harrison Rd, Baguio City, Benguet',
      distance: '1.5 km away',
      capacity: 1000,
      currentCapacity: 423,
      facilities: [
        { icon: 'medical-outline', name: 'Medical Station' },
        { icon: 'man-outline', name: 'Restrooms' },
        { icon: 'restaurant-outline', name: 'Food Distribution' },
      ],
    },
    {
      name: 'Burnham Park Pavilion',
      address: 'Burnham Park, Baguio City',
      distance: '1.7 km away',
      capacity: 300,
      currentCapacity: 273,
      facilities: [
        { icon: 'medical-outline', name: 'Medical Station' },
        { icon: 'man-outline', name: 'Restrooms' },
        { icon: 'restaurant-outline', name: 'Food Distribution' },
      ],
    },
  ];

  const handleDirections = (center) => {
    if (navigation && navigation.navigate) {
      navigation.navigate('EvacuationDetail', { center });
    } else {
      console.error('Navigation not available!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>E-BAGUIO-ATE</Text>

        <View style={styles.headerIcons}>
          <Ionicons name="warning-outline" size={24} color="#000" style={{ marginRight: 10 }} />
          <Ionicons name="globe-outline" size={24} color="#000" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        {centers.map((center, index) => (
          <EvacuationCenter
            key={index}
            {...center}
            centerData={center}
            onPress={handleDirections}
          />
        ))}
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

  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },

  scrollView: { flex: 1 },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },

  centerName: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#000' },

  addressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  address: { fontSize: 13, marginLeft: 4, color: '#666' },
  distance: { fontSize: 12, color: '#999', marginBottom: 12 },

  capacitySection: { marginBottom: 12 },

  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  capacityLabel: { fontSize: 13, fontWeight: '600', color: '#000' },
  capacityNumbers: { fontSize: 13, color: '#666' },

  progressBar: {
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  facilitiesSection: { marginBottom: 12 },
  facilitiesLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8, color: '#000' },

  facilitiesRow: { flexDirection: 'row', flexWrap: 'wrap' },

  facilityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },

  facilityText: { fontSize: 11, color: '#0284c7', marginLeft: 4 },

  directionsButton: {
    backgroundColor: '#0284c7',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 8,
  },

  directionsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});
