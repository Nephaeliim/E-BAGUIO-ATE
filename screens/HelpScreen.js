import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen({ navigation }) {
  const [helpCategory, setHelpCategory] = useState('');
  const [description, setDescription] = useState('');

  const emergencyContacts = [
    { name: 'Baguio Rescue', number: '(074) 442-8038' },
    { name: 'Red Cross Baguio', number: '(074) 442-4215' },
    { name: 'City Disaster Office', number: '(074) 442-5497' }
  ];

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>E-BAGUIO-ATE</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
            <Ionicons name="warning-outline" size={24} color="#333" style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Settings')}>
            <Ionicons name="globe-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Emergency SOS */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Ionicons name="alert-circle" size={28} color="#fff" />
            <Text style={styles.emergencyTitle}>EMERGENCY SOS - CALL 911</Text>
          </View>
          <Text style={styles.emergencySubtitle}>
            For medical, fire and police emergencies
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => handleCall('911')}
          >
            <Text style={styles.emergencyButtonText}>Call Emergency Services</Text>
          </TouchableOpacity>
        </View>

        {/* Request Assistance */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="call-outline" size={24} color="#333" />
            <Text style={styles.cardTitle}>Request Assistance</Text>
          </View>

          <Text style={styles.label}>Type of Help Needed</Text>
          <View style={styles.pickerContainer}>
            <Ionicons name="chevron-down-outline" size={20} color="#666" style={styles.pickerIcon} />
            <TextInput
              style={styles.input}
              placeholder="Select help category"
              value={helpCategory}
              onChangeText={setHelpCategory}
            />
          </View>

          <Text style={styles.label}>Describe Your Situation</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe what kind of help, your location, and any urgent details..."
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />

          <TouchableOpacity 
            style={styles.sendButton}
            onPress={() => {
              if (helpCategory && description) {
                alert('Help request sent to emergency services!');
                setHelpCategory('');
                setDescription('');
              } else {
                alert('Please fill in all fields');
              }
            }}
          >
            <Ionicons name="send-outline" size={18} color="#fff" />
            <Text style={styles.sendButtonText}>Send Help Request</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Emergency Contacts</Text>
          <View style={styles.contactsList}>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactItem}
                onPress={() => handleCall(contact.number)}
              >
                <View style={styles.contactLeft}>
                  <Ionicons name="call-outline" size={20} color="#1E90FF" />
                  <Text style={styles.contactName}>{contact.name}</Text>
                </View>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* First Aid Library */}
        <TouchableOpacity 
          style={styles.firstAidCard}
          onPress={() => navigation.navigate('FirstAid')}
        >
          <View style={styles.firstAidHeader}>
            <Ionicons name="medical" size={24} color="#E74C3C" />
            <Text style={styles.firstAidTitle}>First Aid Library</Text>
            <Ionicons name="chevron-forward" size={24} color="#E74C3C" style={{ marginLeft: 'auto' }} />
          </View>
          <Text style={styles.firstAidSubtitle}>Learn emergency first aid techniques</Text>
          <View style={styles.firstAidList}>
            <View style={styles.firstAidPreview}>
              <Ionicons name="bandage-outline" size={20} color="#E74C3C" />
              <Text style={styles.firstAidPreviewText}>Bandaging a wound</Text>
            </View>
            <View style={styles.firstAidPreview}>
              <Ionicons name="heart-outline" size={20} color="#E74C3C" />
              <Text style={styles.firstAidPreviewText}>Performing CPR</Text>
            </View>
            <View style={styles.firstAidPreview}>
              <Ionicons name="alert-circle-outline" size={20} color="#E74C3C" />
              <Text style={styles.firstAidPreviewText}>Helping a choking Person</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  emergencyCard: {
    backgroundColor: '#C0392B',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  emergencySubtitle: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 16,
    opacity: 0.95,
  },
  emergencyButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  pickerIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#1E90FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contactsList: {
    marginTop: 12,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactName: {
    fontSize: 14,
    color: '#333',
  },
  contactNumber: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '500',
  },
  firstAidCard: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  firstAidHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  firstAidTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  firstAidSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  firstAidList: {
    gap: 8,
  },
  firstAidPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    gap: 10,
  },
  firstAidPreviewText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
});