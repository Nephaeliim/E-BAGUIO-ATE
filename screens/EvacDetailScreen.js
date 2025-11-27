// components/EvacuationDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Linking,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Geolocation from 'react-native-geolocation-service';

export default function EvacDetailScreen({ route, navigation }) {
  const { center } = route.params;
  
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const capacityPercentage = Math.min(100, Math.max(0, (center.currentCapacity / center.capacity) * 100));
  
  const getCapacityColor = () => {
    if (capacityPercentage >= 90) return '#E74C3C';
    if (capacityPercentage >= 70) return '#F1C40F';
    return '#2ECC71';
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Request location permission (Android)
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to calculate distance.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  // Get user's current location
  const getUserLocation = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestLocationPermission();
      
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to calculate distance to evacuation center.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(newLocation);

          if (center.latitude && center.longitude) {
            const dist = calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              center.latitude,
              center.longitude
            );
            setDistance(dist);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          Alert.alert('Error', 'Failed to get your location. Please try again.');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get your location. Please try again.');
      setLoading(false);
    }
  };

  // Open in maps app for navigation
  const openInMaps = () => {
    if (!center.latitude || !center.longitude) {
      Alert.alert('Error', 'Location coordinates not available for this center.');
      return;
    }

    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q='
    });
    const latLng = `${center.latitude},${center.longitude}`;
    const label = encodeURIComponent(center.name);
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open maps application.');
    });
  };

  // Generate OpenStreetMap static image URL
  const getStaticMapUrl = (lat, lon, zoom = 15) => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lon}`;
  };

  useEffect(() => {
    getUserLocation();
  }, []);

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

          {/* Map Views */}
          <View style={styles.mapContainer}>
            {/* Top Map - Evacuation Center Location */}
            <TouchableOpacity 
              style={styles.mapBox}
              onPress={() => center.latitude && center.longitude && Linking.openURL(`https://www.openstreetmap.org/?mlat=${center.latitude}&mlon=${center.longitude}#map=15/${center.latitude}/${center.longitude}`)}
              activeOpacity={0.8}
            >
              {center.latitude && center.longitude ? (
                <View style={styles.mapContent}>
                  <View style={styles.mapIconOverlay}>
                    <Ionicons name="location" size={40} color="#E74C3C" />
                    <Text style={styles.mapLabel}>{center.name}</Text>
                    <Text style={styles.mapSubLabel}>Tap to open in maps</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.placeholderMap}>
                  <Ionicons name="location" size={40} color="#999" />
                  <Text style={styles.placeholderText}>Evacuation Center Location</Text>
                  <Text style={styles.placeholderSubtext}>{center.name}</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Bottom Map - Route from User to Center */}
            <View style={styles.mapBox}>
              {loading ? (
                <View style={styles.placeholderMap}>
                  <ActivityIndicator size="large" color="#0284c7" />
                  <Text style={styles.placeholderText}>Getting your location...</Text>
                </View>
              ) : userLocation && center.latitude && center.longitude ? (
                <TouchableOpacity 
                  style={styles.mapContent}
                  onPress={openInMaps}
                  activeOpacity={0.8}
                >
                  <View style={styles.routeVisualization}>
                    {/* User Location */}
                    <View style={styles.locationPoint}>
                      <View style={styles.userLocationDot}>
                        <Ionicons name="person" size={16} color="#fff" />
                      </View>
                      <Text style={styles.locationLabel}>You</Text>
                    </View>

                    {/* Route Line */}
                    <View style={styles.routeLine}>
                      <View style={styles.dottedLine} />
                      {distance !== null && (
                        <View style={styles.distanceBadge}>
                          <Ionicons name="navigate" size={12} color="#0284c7" />
                          <Text style={styles.distanceBadgeText}>
                            {distance < 1 
                              ? `${(distance * 1000).toFixed(0)}m`
                              : `${distance.toFixed(2)} km`
                            }
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Evacuation Center */}
                    <View style={styles.locationPoint}>
                      <View style={styles.centerLocationDot}>
                        <Ionicons name="business" size={16} color="#fff" />
                      </View>
                      <Text style={styles.locationLabel}>Center</Text>
                    </View>
                  </View>
                  <Text style={styles.tapToNavigate}>Tap to navigate</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.placeholderMap}>
                  <Ionicons name="navigate-circle-outline" size={40} color="#999" />
                  <Text style={styles.placeholderText}>Your Route</Text>
                  <Text style={styles.placeholderSubtext}>
                    {!userLocation ? 'Enable location to see route' : 'Route will be displayed here'}
                  </Text>
                </View>
              )}
            </View>

            {/* Action Buttons Below Maps */}
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={openInMaps}
              >
                <Ionicons name="navigate-circle" size={20} color="#fff" />
                <Text style={styles.primaryButtonText}>Get Directions</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={getUserLocation}
                disabled={loading}
              >
                <Ionicons name="refresh" size={20} color="#0284c7" />
                <Text style={styles.secondaryButtonText}>Update Location</Text>
              </TouchableOpacity>
            </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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

  mapBox: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#e5e5e5',
  },

  mapContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mapIconOverlay: {
    alignItems: 'center',
  },

  mapLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
  },

  mapSubLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  routeVisualization: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    paddingVertical: 20,
  },

  locationPoint: {
    alignItems: 'center',
  },

  userLocationDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0284c7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  centerLocationDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  locationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
  },

  routeLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dottedLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#0284c7',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#0284c7',
  },

  distanceBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0284c7',
    gap: 4,
  },

  distanceBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0284c7',
  },

  tapToNavigate: {
    position: 'absolute',
    bottom: 12,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },

  placeholderMap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  placeholderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
  },

  placeholderSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },

  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#0284c7',
  },

  secondaryButtonText: {
    color: '#0284c7',
    fontSize: 14,
    fontWeight: '600',
  },

  capacitySection: { marginTop: 16, marginBottom: 12 },

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