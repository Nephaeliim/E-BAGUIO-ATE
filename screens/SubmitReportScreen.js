import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


export default function SubmitReportScreen({ navigation }) {
  const [emergencyType, setEmergencyType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('');
  const [contactNumber, setContactNumber] = useState('+63');
  const [attachedImages, setAttachedImages] = useState([]);

  const emergencyTypes = [
    'Internet Outage',
    'Flooding',
    'Electricity Outage',
    'Landslide',
    'Medical Emergency',
    'Fire'
  ];

  const urgencyLevels = [
    { label: 'Critical', color: '#E74C3C', value: 'critical' },
    { label: 'High', color: '#F1C40F', value: 'high' },
    { label: 'Moderate', color: '#FF9800', value: 'moderate' }
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAttachedImages([...attachedImages, ...result.assets]);
    }
  };

  const handleSubmit = () => {
    if (!emergencyType || !description || !urgency || contactNumber === '+63') {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Report Submitted!',
      'Thank you for sending your report. Emergency services have been notified.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-BAGUIO-ATE</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('SubmitReport')}>
            <Ionicons name="warning-outline" size={24} color="#333" style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('InternetOutageReports', { provider: null })}>
            <Ionicons name="globe-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Submit Report</Text>

        {/* Type of Emergency */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Type of Emergency</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={[styles.dropdownText, !emergencyType && styles.placeholder]}>
              {emergencyType || 'Select emergency type'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {emergencyTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setEmergencyType(type);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Location with Map */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <Ionicons name="map" size={40} color="#999" />
              <Text style={styles.mapPlaceholderText}>Map will appear here</Text>
            </View>
            <View style={styles.locationInfo}>
              <Ionicons name="location" size={20} color="#F1C40F" />
              <Text style={styles.locationText}>123 Address, Baguio City</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe the emergency situation..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        {/* Urgency */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Urgency</Text>
          <View style={styles.urgencyButtons}>
            {urgencyLevels.map((level) => (
              <TouchableOpacity
                key={level.value}
                style={[
                  styles.urgencyButton,
                  urgency === level.value && { 
                    backgroundColor: level.color,
                    borderColor: level.color 
                  }
                ]}
                onPress={() => setUrgency(level.value)}
              >
                <View style={[styles.urgencyColor, { backgroundColor: level.color }]} />
                <Text style={[
                  styles.urgencyLabel,
                  urgency === level.value && styles.urgencyLabelActive
                ]}>
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Number */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Contact no</Text>
          <TextInput
            style={styles.input}
            placeholder="+63 | 908 728 9823"
            placeholderTextColor="#999"
            value={contactNumber}
            onChangeText={(text) => {
              if (!text.startsWith('+63')) {
                setContactNumber('+63' + text.replace('+63', ''));
              } else {
                setContactNumber(text);
              }
            }}
            keyboardType="phone-pad"
            maxLength={16}
          />
        </View>

        {/* Attachment */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Attachment</Text>
          <TouchableOpacity style={styles.attachmentButton} onPress={pickImage}>
            <Ionicons name="attach" size={24} color="#666" />
            <Text style={styles.attachmentText}>Attach picture</Text>
          </TouchableOpacity>
          {attachedImages.length > 0 && (
            <Text style={styles.attachmentCount}>
              {attachedImages.length} image(s) attached
            </Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  header: {
    backgroundColor: '#FFB6C1',
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
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  mapContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    color: '#999',
    marginTop: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  urgencyButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  urgencyButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  urgencyColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  urgencyLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  urgencyLabelActive: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  attachmentButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  attachmentText: {
    fontSize: 14,
    color: '#666',
  },
  attachmentCount: {
    fontSize: 12,
    color: '#27AE60',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});