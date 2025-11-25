<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EvacuationScreen() {
  const [selectedCenter, setSelectedCenter] = useState(null);

  const evacuationCenters = [
    {
      id: 1,
      name: 'Baguio Convention Center',
      address: 'Gov. Pack Road, Baguio City',
      distance: '3 km away',
      capacity: { current: 100, max: 450 },
      facilities: ['Medical Station', 'Restrooms', 'Charging Station', 'Wi-Fi'],
      status: 'available'
    },
    {
      id: 2,
      name: 'University of the Philippines Baguio Gym',
      address: 'Harrison Rd, Baguio City, Benguet',
      distance: '2.5 km away',
      capacity: { current: 423, max: 1000 },
      facilities: ['Medical Station', 'Restrooms', 'Food Distribution'],
      status: 'available'
    },
    {
      id: 3,
      name: 'Burnham Park Pavilion',
      address: 'Burnham Park, Baguio City',
      distance: '1.2 km away',
      capacity: { current: 273, max: 300 },
      facilities: ['Medical Station', 'Restrooms', 'Food Distribution'],
      status: 'critical'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>E-BAGUIO-ATE</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="warning-outline" size={24} color="#333" style={styles.headerIcon} />
          <Ionicons name="globe-outline" size={24} color="#333" />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {evacuationCenters.map((center) => (
          <EvacuationCard
            key={center.id}
            center={center}
            onPress={() => setSelectedCenter(center)}
          />
        ))}
      </ScrollView>

      {/* Modal for Center Details */}
      {selectedCenter && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedCenter(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedCenter.name}</Text>
                <TouchableOpacity onPress={() => setSelectedCenter(null)}>
                  <Ionicons name="close" size={28} color="#333" />
                </TouchableOpacity>
              </View>

              <ScrollView>
                {/* Map Placeholder */}
                <View style={styles.mapPlaceholder}>
                  <Ionicons name="map-outline" size={60} color="#999" />
                  <Text style={styles.placeholderText}>Map View</Text>
                </View>

                {/* Image Placeholder */}
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={40} color="#999" />
                  <Text style={styles.placeholderText}>Building Image</Text>
                </View>

                {/* Capacity Info */}
                <View style={styles.capacitySection}>
                  <View style={styles.capacityHeader}>
                    <Text style={styles.capacityLabel}>Capacity</Text>
                    <Text style={[styles.capacityValue, selectedCenter.status === 'critical' && styles.capacityCritical]}>
                      {selectedCenter.capacity.current}/{selectedCenter.capacity.max}
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${(selectedCenter.capacity.current / selectedCenter.capacity.max) * 100}%` },
                        selectedCenter.status === 'critical' && styles.progressCritical
                      ]} 
                    />
                  </View>
                </View>

                {/* Facilities */}
                <View style={styles.facilitiesSection}>
                  <Text style={styles.facilitiesTitle}>Available Facilities</Text>
                  <View style={styles.facilitiesGrid}>
                    {selectedCenter.facilities.map((facility, index) => (
                      <View key={index} style={styles.facilityBadge}>
                        <Text style={styles.facilityText}>{facility}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <TouchableOpacity style={styles.directionsButton}>
                  <Ionicons name="navigate-outline" size={20} color="#fff" />
                  <Text style={styles.directionsButtonText}>Get Directions</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

function EvacuationCard({ center, onPress }) {
  const capacityPercentage = (center.capacity.current / center.capacity.max) * 100;
  const isCritical = center.status === 'critical';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.cardTitle}>{center.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.cardAddress}>{center.address}</Text>
          </View>
          <Text style={styles.cardDistance}>{center.distance}</Text>
        </View>
      </View>

      {/* Capacity Bar */}
      <View style={styles.capacityContainer}>
        <View style={styles.capacityRow}>
          <Text style={styles.capacityText}>Capacity</Text>
          <Text style={[styles.capacityNumber, isCritical && styles.capacityCritical]}>
            {center.capacity.current}/{center.capacity.max}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${capacityPercentage}%` },
              isCritical && styles.progressCritical
            ]} 
=======
// components/EvacuationScreen.js
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

const EvacuationCenter = ({ name, address, distance, capacity, currentCapacity, facilities, onPress, centerData }) => {
  const capacityPercentage = Math.min(100, Math.max(0, (currentCapacity / capacity) * 100));
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
          <Text style={styles.capacityNumbers}>{currentCapacity}/{capacity}</Text>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${capacityPercentage}%`, backgroundColor: getCapacityColor() }
            ]}
>>>>>>> 3d6e3846e38d21555bd5b5f218018c23be2ef21f
          />
        </View>
      </View>

<<<<<<< HEAD
      {/* Facilities */}
      <View style={styles.cardFacilities}>
        <Text style={styles.facilitiesLabel}>Available Facilities</Text>
        <View style={styles.facilitiesGrid}>
          {center.facilities.map((facility, index) => (
            <View key={index} style={styles.facilityBadge}>
              <Text style={styles.facilityText}>{facility}</Text>
=======
      <View style={styles.facilitiesSection}>
        <Text style={styles.facilitiesLabel}>Available Facilities</Text>

        <View style={styles.facilitiesRow}>
          {facilities.map((facility, index) => (
            <View key={index} style={styles.facilityTag}>
              <Ionicons name={facility.icon} size={14} color="#0284c7" />
              <Text style={styles.facilityText}>{facility.name}</Text>
>>>>>>> 3d6e3846e38d21555bd5b5f218018c23be2ef21f
            </View>
          ))}
        </View>
      </View>

<<<<<<< HEAD
      <TouchableOpacity style={styles.cardButton}>
        <Ionicons name="navigate-outline" size={16} color="#fff" />
        <Text style={styles.cardButtonText}>Get Directions</Text>
      </TouchableOpacity>
    </TouchableOpacity>
=======
      <TouchableOpacity style={styles.directionsButton} onPress={() => onPress(centerData)} activeOpacity={0.8}>
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
      distance: '1.1 km away',
      capacity: 120500,
      currentCapacity: 78900,
      facilities: [
        { icon: 'medical-outline', name: 'Medical Station' },
        { icon: 'man-outline', name: 'Restrooms' },
        { icon: 'flash-outline', name: 'Charging Station' },
        { icon: 'wifi-outline', name: 'Wi-Fi' }
      ]
    },
    {
      name: 'University of the Philippines Baguio Gym',
      address: 'Harrison Rd, Baguio City, Benguet',
      distance: '1.5 km away',
      capacity: 210900,
      currentCapacity: 167320,
      facilities: [
        { icon: 'medical-outline', name: 'Medical Station' },
        { icon: 'man-outline', name: 'Restrooms' },
        { icon: 'restaurant-outline', name: 'Food Distribution' }
      ]
    },
    {
      name: 'Burnham Park Pavilion',
      address: 'Burnham Park, Baguio City',
      distance: '1.7 km away',
      capacity: 150300,
      currentCapacity: 148800,
      facilities: [
        { icon: 'medical-outline', name: 'Medical Station' },
        { icon: 'man-outline', name: 'Restrooms' },
        { icon: 'restaurant-outline', name: 'Food Distribution' }
      ]
    }
  ];

  const handleDirections = (center) => {
    console.log('handleDirections called', center);
    console.log('navigation object:', navigation);
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
>>>>>>> 3d6e3846e38d21555bd5b5f218018c23be2ef21f
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#B3D9FF',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 12,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardAddress: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  cardDistance: {
    fontSize: 12,
    color: '#999',
  },
  capacityContainer: {
    marginBottom: 12,
  },
  capacityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  capacityText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  capacityNumber: {
    fontSize: 13,
    color: '#27AE60',
    fontWeight: '600',
  },
  capacityCritical: {
    color: '#E74C3C',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 4,
  },
  progressCritical: {
    backgroundColor: '#E74C3C',
  },
  cardFacilities: {
    marginBottom: 12,
  },
  facilitiesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  facilityBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  facilityText: {
    fontSize: 11,
    color: '#1976D2',
  },
  cardButton: {
    backgroundColor: '#1E90FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  mapPlaceholder: {
    backgroundColor: '#E0E0E0',
    height: 180,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePlaceholder: {
    backgroundColor: '#F5F5F5',
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    color: '#999',
    marginTop: 8,
    fontSize: 12,
  },
  capacitySection: {
    marginBottom: 16,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  capacityLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  capacityValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#27AE60',
  },
  facilitiesSection: {
    marginBottom: 16,
  },
  facilitiesTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  directionsButton: {
    backgroundColor: '#1E90FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  directionsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
=======
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

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  scrollView: { flex: 1 },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3
  },

  centerName: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#000' },

  addressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },

  address: { fontSize: 13, marginLeft: 4, color: '#666' },

  distance: { fontSize: 12, color: '#999', marginBottom: 12 },

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

  directionsButton: {
    backgroundColor: '#0284c7',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 8
  },

  directionsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6
  }
>>>>>>> 3d6e3846e38d21555bd5b5f218018c23be2ef21f
});