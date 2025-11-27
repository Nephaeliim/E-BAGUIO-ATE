import React, { useState } from 'react';
import CustomHeader from './CustomHeader';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OutagesScreen() {
  const [showInternetReports, setShowInternetReports] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const providers = [
    { id: 'pldt', name: 'PLDT', logo: '📡', color: '#C41E3A' },
    { id: 'globe', name: 'Globe', logo: '🌐', color: '#0033A0' },
    { id: 'converge', name: 'Converge', logo: '📶', color: '#00A651' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>E-BAGUIO-ATE</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="warning-outline" size={24} color="#333" style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Settings')}>
            <Ionicons name="globe-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

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

        <View style={[styles.card, styles.green]}>
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
        </View>

        <View style={[styles.card, styles.red]}>
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
        </View>

        {/* Service Provider Status */}
        <View style={styles.statusCard}>
          <Text style={styles.sectionTitle}>Service Provider Status</Text>
          
          <View style={styles.providerItem}>
            <Text style={styles.providerName}>Electricity Cooperative</Text>
            <View style={styles.providerStatus}>
              <Text style={styles.providerStatusText}>ACTIVE</Text>
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
            <View style={[styles.providerStatus, styles.providerStatusWarning]}>
              <Text style={[styles.providerStatusText, { color: '#856404' }]}>SLOW SERVICE</Text>
            </View>
          </View>

          <View style={styles.providerItem}>
            <Text style={styles.providerName}>Converge Internet</Text>
            <View style={styles.providerStatus}>
              <Text style={styles.providerStatusText}>ACTIVE</Text>
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
                  }}
                >
                  <View style={[styles.providerLogo, { backgroundColor: provider.color }]}>
                    <Text style={styles.providerLogoText}>{provider.logo}</Text>
                  </View>
                  <Text style={styles.providerCardName}>{provider.name}</Text>
                  <TouchableOpacity style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>Select</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Provider Details Modal */}
      {selectedProvider && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedProvider(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.providerModalHeader}>
                  <View style={[styles.providerLogo, { backgroundColor: selectedProvider.color }]}>
                    <Text style={styles.providerLogoText}>{selectedProvider.logo}</Text>
                  </View>
                  <Text style={styles.modalTitle}>{selectedProvider.name}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedProvider(null)}>
                  <Ionicons name="close" size={28} color="#333" />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View style={styles.providerInfo}>
                  <Text style={styles.providerInfoText}>
                    Hi {selectedProvider.name} Customers! These are the scheduled maintenance activities for the week of September 8, 2025. We're performing preventive maintenance to keep your connection strong and reliable. This helps us check and maintain our... <Text style={styles.seeMore}>See More</Text>
                  </Text>
                  <TouchableOpacity style={styles.reportOutageButton}>
                    <Text style={styles.reportOutageButtonText}>Report outage</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.commentsSection}>
                  <Text style={styles.commentsTitle}>Comments:</Text>
                  
                  <View style={styles.commentInputContainer}>
                    <View style={styles.commentAvatar} />
                    <View style={styles.commentInput}>
                      <Text style={styles.commentPlaceholder}>Add a comment...</Text>
                    </View>
                  </View>

                  <Comment 
                    text={`${selectedProvider.name} talaga blaya!`}
                  />
                  <Comment 
                    text={`${selectedProvider.name} ano na naman bayad pero walang wala`}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

function Comment({ text }) {
  return (
    <View style={styles.comment}>
      <View style={styles.commentAvatar} />
      <View style={styles.commentBubble}>
        <Text style={styles.commentText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E8FDE8',
  },
  header: {
    backgroundColor: '#E8FDE8',
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
  },
  providerStatus: {
    backgroundColor: '#D4EDDA',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  providerStatusWarning: {
    backgroundColor: '#FFF3CD',
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
  providerModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  providerInfo: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  providerInfoText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  seeMore: {
    color: '#1E90FF',
    fontWeight: '600',
  },
  reportOutageButton: {
    backgroundColor: '#4A9B8E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reportOutageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  commentsSection: {
    marginTop: 8,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  commentInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 12,
    justifyContent: 'center',
  },
  commentPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  comment: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  commentBubble: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 12,
  },
  commentText: {
    fontSize: 13,
    color: '#333',
  },
});