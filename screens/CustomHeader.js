import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomHeader({ 
  title = 'E-BAGUIO-ATE', 
  navigation, 
  backgroundColor = '#B3D9FF',
  showWarning = true,
  showGlobe = true 
}) {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerIcons}>
        {showWarning && (
          <TouchableOpacity 
            onPress={() => navigation?.navigate('SubmitReport')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="warning-outline" size={24} color="#333" style={styles.headerIcon} />
          </TouchableOpacity>
        )}
        {showGlobe && (
          <TouchableOpacity 
            onPress={() => navigation?.navigate('InternetOutageReports', { provider: null })}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="globe-outline" size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 50,
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
});