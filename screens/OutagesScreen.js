import React, { useState } from 'react';
import CustomHeader from './CustomHeader';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OutagesScreen({ navigation }) {
  const [showInternetReports, setShowInternetReports] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const providers = [
    { id: 'pldt', name: 'PLDT', logo: '📡', color: '#C41E3A' },
    { id: 'globe', name: 'Globe', logo: '🌍', color: '#0033A0' },
    { id: 'converge', name: 'Converge', logo: '📶', color: '#00A651' },
  ];

  // Mock BENECO outage - in production, fetch from BENECO Facebook API
  const handleBenecoOutageClick = () => {
    // Open BENECO Facebook page or specific post
    Linking.openURL('https://www.facebook.com/BENECO1961');
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} backgroundColor="#E8FDE8" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Power Outages */}
        <View style={[styles.card, styles.green]}>
          <View style={styles.cardHeader}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>RESTORED</Text>
            </View>
          </View>
          <Text style={styles.title}>Burnham Park</Text>
          <Text style={styles.text}>Cause: Equipment failure</Text>
          <Text style={styles.text}>Started: 5/12/2025, 9:38 AM</Text>
          <Text style={styles.text}>Time Restored: 5/12/2025, 12:06 PM</Text>
        </View>

        <TouchableOpacity 
          style={[styles.card, styles.green]}
          onPress={handleBenecoOutageClick}
        >
          <View style={styles.cardHeader}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>SCHEDULED</Text>
            </View>
          </View>
          <Text style={styles.title}>Session Road</Text>
          <Text style={styles.text}>Cause: Scheduled maintenance</Text>
          <Text style={styles.text}>Started: 5/12/2025, 10:00 AM</Text>
          <Text style={styles.text}>Est. Duration: 2 hours</Text>
          <Text style={styles.text}>Affected: Lower and Upper Session Road</Text>
          <View style={styles.tapHint}>
            <Ionicons name="link-outline" size={14} color="#fff" />
            <Text style={[styles.text, { fontSize: 12 }]}>Tap for BENECO announcement</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.red]}
          onPress={handleBenecoOutageClick}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.statusBadge, { backgroundColor: 'rgba(255, 255, 255, 0.3)' }]}>
              <Text style={styles.statusBadgeText}>ONGOING</Text>
            </View>
          </View>
          <Text style={styles.title}>Camp 7</Text>
          <Text style={styles.text}>Cause: Scheduled maintenance</Text>
          <Text style={styles.text}>Started: 5/12/2025, 7:00 AM</Text>
          <Text style={styles.text}>Est. Restore: Unknown</Text>
          <Text style={styles.text}>Affected: Camp 7, Parts of Bakakeng Sur</Text>
          <View style={styles.tapHint}>
            <Ionicons name="link-outline" size={14} color="#fff" />
            <Text style={[styles.text, { fontSize: 12 }]}>Tap for BENECO announcement</Text>
          </View>
        </TouchableOpacity>

        {/* Service Provider Status */}
        <View style={styles.statusCard}>
          <Text style={styles.sectionTitle}>Service Provider Status</Text>
          
          <View style={styles.providerItem}>
            <Text style={styles.providerName}>BENECO (Benguet Electric Cooperative)</Text>
            <View style={styles.providerStatus}>
              <Text style={styles.providerStatusText}>OPERATIONAL</Text>
            </View>
          </View>

          <View style={styles.providerItem}>
            <Text style={styles.providerName}>PLDT Internet</Text>
            <View style={styles.providerStatus}>
              <Text style={styles.providerStatusText}>OPERATIONAL</Text>
            </View>
          </View>

          <View style={styles.providerItem}>
            <Text style={styles.providerName}>Globe Internet</Text>
            <View style={[styles.providerStatus, styles.providerStatusCritical]}>
              <Text style={[styles.providerStatusText, { color: '#721C24' }]}>SERVICE DISRUPTION</Text>
            </View>
          </View>

          <View style={styles.providerItem}>
            <Text style={styles.providerName}>Converge Internet</Text>
            <View style={styles.providerStatus}>
              <Text style={styles.providerStatusText}>OPERATIONAL</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.reportButton}
            onPress={() => setShowInternetReports(true)}
          >
            <Text style={styles.reportButtonText}>View Internet Outage Reports</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Internet Outage Reports Modal */}
      <Modal
        visible={showInternetReports}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowInternetReports(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Internet Outage Reports</Text>
              <TouchableOpacity onPress={() => setShowInternetReports(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>Please select your provider</Text>

            <ScrollView>
              {providers.map((provider) => (
                <TouchableOpacity
                  key={provider.id}
                  style={styles.providerCard}
                  onPress={() => {
                    setSelectedProvider(provider);
                    setShowInternetReports(false);
                    navigation.navigate('InternetOutageReports', { provider: provider.name });
                  }}
                >
                  <View style={[styles.providerLogo, { backgroundColor: provider.color }]}>
                    <Text style={styles.providerLogoText}>{provider.logo}</Text>
                  </View>
                  <Text style={styles.providerCardName}>{provider.name}</Text>
                  <View style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>Select</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E8FDE8',
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
  green: { backgroundColor: '#27AE60' },
  red: { backgroundColor: '#E74C3C' },
  cardHeader: {
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff',
    marginBottom: 8,
  },
  text: { 
    color: '#fff', 
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#27AE60', 
    marginBottom: 12,
  },
  providerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  providerName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  providerStatus: {
    backgroundColor: '#D4EDDA',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  providerStatusCritical: {
    backgroundColor: '#F8D7DA',
  },
  providerStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#155724',
  },
  reportButton: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
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
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  providerCard: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  providerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerLogoText: {
    fontSize: 32,
  },
  providerCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  selectButton: {
    backgroundColor: '#4A9B8E',
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});