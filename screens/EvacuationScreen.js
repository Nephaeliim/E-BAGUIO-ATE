import React, { useState, useEffect } from 'react';
import CustomHeader from './CustomHeader';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const EvacuationCenter = ({
  name,
  address,
  distance,
  capacity,
  currentCapacity,
  facilities,
  onPress,
  centerData,
  userLocation
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

  // Calculate actual distance if user location is available
  const calculateDistance = () => {
    if (!userLocation || !centerData.latitude || !centerData.longitude) {
      return distance; // Return default distance
    }

    const R = 6371; // Earth's radius in km
    const dLat = (centerData.latitude - userLocation.latitude) * Math.PI / 180;
    const dLon = (centerData.longitude - userLocation.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.latitude * Math.PI / 180) * 
      Math.cos(centerData.latitude * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const dist = R * c;
    
    return dist < 1 
      ? `${(dist * 1000).toFixed(0)}m away`
      : `${dist.toFixed(1)} km away`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.centerName}>{name}</Text>

      <View style={styles.addressRow}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.address}>{address}</Text>
      </View>

      <Text style={styles.distance}>{calculateDistance()}</Text>

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
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Real evacuation centers in Baguio with actual coordinates
  const centers = [
    {
      name: 'Baguio Convention Center',
      address: 'Gov. Pack Road, Baguio City',
      distance: '1.1 km away',
      latitude: 16.4123,
      longitude: 120.5960,
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
      latitude: 16.4015,
      longitude: 120.5965,
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
      latitude: 16.4119,
      longitude: 120.5924,
      capacity: 300,
      currentCapacity: 273,
      facilities: [
        { icon: 'medical-outline', name: 'Medical Station' },
        { icon: 'man-outline', name: 'Restrooms' },
        { icon: 'restaurant-outline', name: 'Food Distribution' },
      ],
    },
  ];

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      setLoadingLocation(true);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is needed to show distances to evacuation centers.'
        );
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      setLoadingLocation(false);
    } catch (error) {
      console.error('Location error:', error);
      setLoadingLocation(false);
    }
  };

  const handleDirections = (center) => {
    if (!center.latitude || !center.longitude) {
      Alert.alert('Error', 'Location data not available for this center');
      return;
    }

    // Open in Google Maps with directions
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${center.latitude},${center.longitude}&travelmode=driving`;
      Linking.openURL(url);
    } else {
      // Just show the location if we don't have user's location
      const url = `https://www.google.com/maps/search/?api=1&query=${center.latitude},${center.longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader navigation={navigation} backgroundColor="#B3D9FF" />

      {loadingLocation && (
        <View style={styles.locationBanner}>
          <ActivityIndicator size="small" color="#1E90FF" />
          <Text style={styles.locationBannerText}>Getting your location...</Text>
        </View>
      )}

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        {centers.map((center, index) => (
          <EvacuationCenter
            key={index}
            {...center}
            centerData={center}
            userLocation={userLocation}
            onPress={handleDirections}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1 },
  locationBanner: {
    backgroundColor: '#E3F2FD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 10,
  },
  locationBannerText: {
    fontSize: 13,
    color: '#1E90FF',
    fontWeight: '500',
  },
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
  distance: { fontSize: 12, color: '#1E90FF', marginBottom: 12, fontWeight: '600' },
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