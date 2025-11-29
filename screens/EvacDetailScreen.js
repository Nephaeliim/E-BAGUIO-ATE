// components/EvacuationDetailScreen.js
import React, { useState, useEffect } from 'react';
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
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Conditional import for WebView
let WebView;
try {
  WebView = require('react-native-webview').WebView;
} catch (e) {
  WebView = null;
}

export default function EvacDetailScreen({ route, navigation }) {
  const { center } = route.params;
  
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Check if WebView is available (not on web)
  const isWebViewAvailable = WebView !== null && Platform.OS !== 'web';
  
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

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  };

  // Get user's current location
  const getUserLocation = async () => {
    setLoading(true);
    console.log('Starting location request...');
    
    try {
      // Check if location services are enabled
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      console.log('Location services enabled:', servicesEnabled);
      
      if (!servicesEnabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services in your device settings.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      // Request permission
      console.log('Requesting location permission...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Permission status:', status);
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to calculate distance to evacuation center. Please grant permission in your device settings.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      // Get location
      console.log('Getting current position...');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000,
        timeout: 15000,
      });
      
      console.log('Location received:', location.coords);

      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(newLocation);

      if (center.latitude && center.longitude) {
        const dist = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          center.latitude,
          center.longitude
        );
        setDistance(dist);
        console.log('Distance calculated:', dist);
      }
      
      Alert.alert('Success', 'Location updated successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Location error details:', error);
      Alert.alert(
        'Location Error', 
        `Failed to get location: ${error.message}\n\nPlease make sure:\n1. Location is enabled\n2. App has location permission\n3. You have GPS signal`
      );
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

  // Generate OpenStreetMap embed HTML
  const generateMapHTML = (lat, lon, markerLabel) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100%; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            var map = L.map('map').setView([${lat}, ${lon}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            var marker = L.marker([${lat}, ${lon}]).addTo(map);
            marker.bindPopup("<b>${markerLabel}</b>").openPopup();
          </script>
        </body>
      </html>
    `;
  };

  // Generate route map HTML with both locations and path
  const generateRouteMapHTML = (userLat, userLon, centerLat, centerLon, distanceKm) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100%; }
            .distance-badge {
              position: absolute;
              top: 10px;
              right: 10px;
              background: rgba(2, 132, 199, 0.9);
              color: white;
              padding: 8px 12px;
              border-radius: 20px;
              font-weight: bold;
              font-size: 12px;
              z-index: 1000;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
          </style>
        </head>
        <body>
          <div class="distance-badge">📍 ${distanceKm < 1 ? (distanceKm * 1000).toFixed(0) + 'm' : distanceKm.toFixed(2) + ' km'} away</div>
          <div id="map"></div>
          <script>
            // Calculate center point between two locations
            var centerLat = (${userLat} + ${centerLat}) / 2;
            var centerLon = (${userLon} + ${centerLon}) / 2;
            
            // Create map
            var map = L.map('map').setView([centerLat, centerLon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // User location marker (blue)
            var userIcon = L.divIcon({
              className: 'custom-icon',
              html: '<div style="background: #0284c7; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 16px;">👤</span></div>',
              iconSize: [30, 30]
            });
            var userMarker = L.marker([${userLat}, ${userLon}], {icon: userIcon}).addTo(map);
            userMarker.bindPopup("<b>Your Location</b>");
            
            // Evacuation center marker (red)
            var centerIcon = L.divIcon({
              className: 'custom-icon',
              html: '<div style="background: #E74C3C; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 16px;">🏢</span></div>',
              iconSize: [30, 30]
            });
            var centerMarker = L.marker([${centerLat}, ${centerLon}], {icon: centerIcon}).addTo(map);
            centerMarker.bindPopup("<b>Evacuation Center</b>");
            
            // Draw route line
            var routeLine = L.polyline([
              [${userLat}, ${userLon}],
              [${centerLat}, ${centerLon}]
            ], {
              color: '#0284c7',
              weight: 4,
              opacity: 0.7,
              dashArray: '10, 10'
            }).addTo(map);
            
            // Fit map to show both markers
            var bounds = L.latLngBounds([
              [${userLat}, ${userLon}],
              [${centerLat}, ${centerLon}]
            ]);
            map.fitBounds(bounds, {padding: [50, 50]});
          </script>
        </body>
      </html>
    `;
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
              onPress={() => center.latitude && center.longitude && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${center.latitude},${center.longitude}`)}
              activeOpacity={0.8}
            >
              {center.latitude && center.longitude ? (
                <View style={styles.mapFallback}>
                  <View style={styles.mapFallbackContent}>
                    <View style={styles.mapIconContainer}>
                      <Ionicons name="business" size={50} color="#E74C3C" />
                    </View>
                    <Text style={styles.mapFallbackTitle}>{center.name}</Text>
                    <Text style={styles.mapFallbackSubtitle}>{center.address}</Text>
                    <View style={styles.coordinatesBox}>
                      <Ionicons name="location" size={16} color="#0284c7" />
                      <Text style={styles.coordinatesText}>
                        {center.latitude.toFixed(4)}, {center.longitude.toFixed(4)}
                      </Text>
                    </View>
                    <View style={styles.tapHintBox}>
                      <Ionicons name="map-outline" size={16} color="#666" />
                      <Text style={styles.tapHint}>Tap to open in Google Maps</Text>
                    </View>
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
            <TouchableOpacity 
              style={styles.mapBox}
              onPress={() => {
                if (userLocation && center.latitude && center.longitude) {
                  // Open Google Maps with directions
                  const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${center.latitude},${center.longitude}&travelmode=driving`;
                  Linking.openURL(url);
                }
              }}
              activeOpacity={0.8}
              disabled={!userLocation}
            >
              {loading ? (
                <View style={styles.placeholderMap}>
                  <ActivityIndicator size="large" color="#0284c7" />
                  <Text style={styles.placeholderText}>Getting your location...</Text>
                </View>
              ) : userLocation && center.latitude && center.longitude ? (
                <View style={styles.mapFallback}>
                  <View style={styles.routeVisualization}>
                    {/* User Location */}
                    <View style={styles.locationPoint}>
                      <View style={styles.userLocationDot}>
                        <Ionicons name="person" size={20} color="#fff" />
                      </View>
                      <Text style={styles.locationLabel}>Your Location</Text>
                      <Text style={styles.coordsSmall}>
                        {userLocation.latitude.toFixed(3)}, {userLocation.longitude.toFixed(3)}
                      </Text>
                    </View>

                    {/* Route Line with Distance */}
                    <View style={styles.routeLineContainer}>
                      <View style={styles.routeLineVertical} />
                      {distance !== null && (
                        <View style={styles.distanceBadgeLarge}>
                          <Ionicons name="navigate" size={20} color="#0284c7" />
                          <Text style={styles.distanceBadgeTextLarge}>
                            {distance < 1 
                              ? `${(distance * 1000).toFixed(0)}m`
                              : `${distance.toFixed(2)} km`
                            }
                          </Text>
                          <Text style={styles.distanceSubtext}>away</Text>
                        </View>
                      )}
                      <View style={styles.routeArrow}>
                        <Ionicons name="arrow-down" size={24} color="#0284c7" />
                      </View>
                    </View>

                    {/* Evacuation Center */}
                    <View style={styles.locationPoint}>
                      <View style={styles.centerLocationDot}>
                        <Ionicons name="business" size={20} color="#fff" />
                      </View>
                      <Text style={styles.locationLabel}>Evacuation Center</Text>
                      <Text style={styles.coordsSmall}>
                        {center.latitude.toFixed(3)}, {center.longitude.toFixed(3)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.tapHintBox}>
                    <Ionicons name="navigate-circle-outline" size={16} color="#666" />
                    <Text style={styles.tapHint}>Tap to get turn-by-turn directions</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.placeholderMap}>
                  <Ionicons name="navigate-circle-outline" size={40} color="#999" />
                  <Text style={styles.placeholderText}>Your Route</Text>
                  <Text style={styles.placeholderSubtext}>
                    {!userLocation ? 'Tap "Update Location" to see route' : 'Route will be displayed here'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Action Buttons Below Maps */}
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => {
                  if (userLocation && center.latitude && center.longitude) {
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${center.latitude},${center.longitude}&travelmode=driving`;
                    Linking.openURL(url);
                  } else {
                    Alert.alert('Location Required', 'Please update your location first.');
                  }
                }}
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
    height: 250,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#e5e5e5',
  },

  mapIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  mapFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  mapFallbackContent: {
    alignItems: 'center',
  },

  mapFallbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },

  mapFallbackSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },

  coordinatesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
    gap: 6,
  },

  coordinatesText: {
    fontSize: 12,
    color: '#0284c7',
    fontWeight: '600',
  },

  tapHintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },

  tapHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },

  routeVisualization: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },

  locationPoint: {
    alignItems: 'center',
    marginVertical: 8,
  },

  userLocationDot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0284c7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  centerLocationDot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  locationLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginTop: 8,
  },

  coordsSmall: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },

  routeLineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },

  routeLineVertical: {
    width: 3,
    height: 40,
    backgroundColor: '#0284c7',
  },

  routeArrow: {
    marginTop: -8,
  },

  distanceBadgeLarge: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0284c7',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  distanceBadgeTextLarge: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0284c7',
    marginTop: 4,
  },

  distanceSubtext: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
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