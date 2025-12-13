import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function CustomHeader({ 
  title = 'E-BAGUIO-ATE', 
  navigation, 
  backgroundColor = '#B3D9FF',
  showWarning = true,
  showGlobe = true 
}) {
  const [address, setAddress] = useState('123 Address, Baguio City');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentAddress();
  }, []);

  const getCurrentAddress = async () => {
    try {
      setLoading(true);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddress('Location permission denied');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Reverse geocode to get address
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode && geocode.length > 0) {
        const place = geocode[0];
        const addressParts = [
          place.street || place.name,
          place.city || place.district || 'Baguio City',
        ].filter(Boolean);
        
        setAddress(addressParts.join(', ') || 'Baguio City');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Address error:', error);
      setAddress('Unable to get location');
      setLoading(false);
    }
  };

  const handleWarningPress = () => {
    if (navigation) {
      navigation.navigate('SubmitReport');
    }
  };

  const handleGlobePress = () => {
    if (navigation) {
      navigation.navigate('InternetOutageReports', { provider: null });
    }
  };

  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerIcons}>
          {showWarning && (
            <TouchableOpacity 
              onPress={handleWarningPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="warning-outline" size={24} color="#333" style={styles.headerIcon} />
            </TouchableOpacity>
          )}
          {showGlobe && (
            <TouchableOpacity 
              onPress={handleGlobePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="globe-outline" size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Address Bar */}
      <TouchableOpacity 
        style={styles.addressBar}
        onPress={getCurrentAddress}
        activeOpacity={0.7}
      >
        <Ionicons name="location" size={16} color="#1E90FF" />
        {loading ? (
          <Text style={styles.addressText}>Updating location...</Text>
        ) : (
          <Text style={styles.addressText} numberOfLines={1}>{address}</Text>
        )}
        <Ionicons name="refresh" size={14} color="#666" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  addressText: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});