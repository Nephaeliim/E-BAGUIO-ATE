import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

export default function CommunityHubScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Emergency Coordinator',
      text: 'Welcome to the Community Emergency Hub! This is a real-time chat for emergency communications.',
      timestamp: '9:00 AM',
      isSystem: true
    },
    {
      id: 2,
      user: 'Maria Santos',
      text: 'Session Road is flooded near Burnham Park. Avoid the area!',
      timestamp: '9:15 AM',
      isEmergency: true,
      location: { latitude: 16.4119, longitude: 120.5924, address: 'Session Road, Baguio' }
    },
    {
      id: 3,
      user: 'Juan Dela Cruz',
      text: 'Can confirm. Water level rising quickly. Stay safe everyone.',
      timestamp: '9:16 AM',
    },
  ]);
  const scrollViewRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [attachedLocation, setAttachedLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const sendMessage = () => {
    if (message.trim() || selectedImage || attachedLocation) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        text: message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isUser: true,
        image: selectedImage,
        location: attachedLocation,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setSelectedImage(null);
      setAttachedLocation(null);
      
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleLocationShare = async () => {
    try {
      setLoadingLocation(true);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is needed to share your location');
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Get address
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      let addressText = 'Current Location';
      if (geocode && geocode.length > 0) {
        const place = geocode[0];
        const parts = [
          place.street || place.name,
          place.city || place.district,
        ].filter(Boolean);
        addressText = parts.join(', ') || 'Baguio City';
      }

      setAttachedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: addressText,
      });

      Alert.alert('Success', 'Location attached! Tap send to share.');
      setLoadingLocation(false);
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Failed to get location');
      setLoadingLocation(false);
    }
  };

  const handlePhotoAttach = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera roll permission is needed');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        Alert.alert('Success', 'Photo attached! Tap send to share.');
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleEmergency = () => {
    Alert.alert(
      '🚨 EMERGENCY ALERT 🚨',
      'This will send an URGENT emergency alert to all users and notify emergency services with your location.\n\nAre you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'SEND EMERGENCY ALERT',
          style: 'destructive',
          onPress: async () => {
            try {
              const location = await Location.getCurrentPositionAsync({});
              const geocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });

              let address = 'Unknown location';
              if (geocode && geocode.length > 0) {
                const place = geocode[0];
                const parts = [place.street, place.city].filter(Boolean);
                address = parts.join(', ');
              }

              const emergencyMessage = {
                id: messages.length + 1,
                user: 'You',
                text: '🚨 EMERGENCY! Need immediate assistance!',
                timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                isUser: true,
                isEmergency: true,
                location: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  address: address,
                },
              };

              setMessages([...messages, emergencyMessage]);
              
              // Also call emergency services
              Alert.alert(
                'Emergency Alert Sent!',
                'Your emergency alert has been broadcast to all users. Would you also like to call 911?',
                [
                  { text: 'No', style: 'cancel' },
                  {
                    text: 'Call 911',
                    onPress: () => Linking.openURL('tel:911')
                  }
                ]
              );

              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 100);
            } catch (error) {
              Alert.alert('Error', 'Failed to send emergency alert');
            }
          }
        }
      ]
    );
  };

  const openLocationInMaps = (location) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    Linking.openURL(url);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Community Hub</Text>
          <View style={styles.onlineStatus}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>234 online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="information-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Emergency Banner */}
      <View style={styles.emergencyBanner}>
        <Ionicons name="warning" size={20} color="#FF9800" />
        <Text style={styles.emergencyBannerText}>
          Active Weather Alert: Heavy rainfall expected. Report emergencies immediately.
        </Text>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg}
            onLocationPress={openLocationInMaps}
          />
        ))}
      </ScrollView>

      {/* Attachment Preview */}
      {(selectedImage || attachedLocation) && (
        <View style={styles.attachmentPreview}>
          {selectedImage && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => setSelectedImage(null)}
              >
                <Ionicons name="close-circle" size={24} color="#E74C3C" />
              </TouchableOpacity>
            </View>
          )}
          {attachedLocation && (
            <View style={styles.locationPreview}>
              <Ionicons name="location" size={20} color="#1E90FF" />
              <Text style={styles.locationPreviewText} numberOfLines={1}>
                {attachedLocation.address}
              </Text>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => setAttachedLocation(null)}
              >
                <Ionicons name="close-circle" size={20} color="#E74C3C" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Quick Actions Bar */}
      <View style={styles.quickActionsBar}>
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={handleLocationShare}
          disabled={loadingLocation}
        >
          <Ionicons 
            name="location" 
            size={20} 
            color={loadingLocation ? "#999" : "#1E90FF"} 
          />
          <Text style={styles.quickActionText}>
            {loadingLocation ? 'Loading...' : 'Location'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={handlePhotoAttach}
        >
          <Ionicons name="camera" size={20} color="#1E90FF" />
          <Text style={styles.quickActionText}>Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickAction, styles.emergencyAction]}
          onPress={handleEmergency}
        >
          <Ionicons name="alert-circle" size={20} color="#E74C3C" />
          <Text style={[styles.quickActionText, styles.emergencyText]}>Emergency</Text>
        </TouchableOpacity>
      </View>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton, 
            (!message.trim() && !selectedImage && !attachedLocation) && styles.sendButtonDisabled
          ]}
          onPress={sendMessage}
          disabled={!message.trim() && !selectedImage && !attachedLocation}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function MessageBubble({ message, onLocationPress }) {
  if (message.isSystem) {
    return (
      <View style={styles.systemMessage}>
        <View style={styles.systemMessageIcon}>
          <Ionicons name="shield-checkmark" size={16} color="#1E90FF" />
        </View>
        <View style={styles.systemMessageContent}>
          <Text style={styles.systemMessageUser}>{message.user}</Text>
          <Text style={styles.systemMessageText}>{message.text}</Text>
          <Text style={styles.messageTime}>{message.timestamp}</Text>
        </View>
      </View>
    );
  }

  if (message.isUser) {
    return (
      <View style={styles.userMessageContainer}>
        <View style={styles.userMessage}>
          {message.image && (
            <Image source={{ uri: message.image }} style={styles.messageImage} />
          )}
          {message.text ? (
            <Text style={styles.userMessageText}>{message.text}</Text>
          ) : null}
          {message.location && (
            <TouchableOpacity 
              style={styles.locationCard}
              onPress={() => onLocationPress(message.location)}
            >
              <Ionicons name="location" size={24} color="#E74C3C" />
              <View style={styles.locationCardContent}>
                <Text style={styles.locationCardTitle}>Shared Location</Text>
                <Text style={styles.locationCardAddress} numberOfLines={1}>
                  {message.location.address}
                </Text>
                <Text style={styles.locationCardHint}>Tap to open in maps</Text>
              </View>
            </TouchableOpacity>
          )}
          <Text style={styles.userMessageTime}>{message.timestamp}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.messageContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{message.user[0]}</Text>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.messageUser}>{message.user}</Text>
        <View style={[styles.messageBubble, message.isEmergency && styles.emergencyBubble]}>
          {message.isEmergency && (
            <View style={styles.emergencyTag}>
              <Ionicons name="warning" size={12} color="#fff" />
              <Text style={styles.emergencyTagText}>URGENT</Text>
            </View>
          )}
          {message.image && (
            <Image source={{ uri: message.image }} style={styles.messageImage} />
          )}
          <Text style={[styles.messageText, message.isEmergency && styles.emergencyText]}>
            {message.text}
          </Text>
          {message.location && (
            <TouchableOpacity 
              style={styles.locationCard}
              onPress={() => onLocationPress(message.location)}
            >
              <Ionicons name="location" size={24} color="#E74C3C" />
              <View style={styles.locationCardContent}>
                <Text style={styles.locationCardTitle}>Shared Location</Text>
                <Text style={styles.locationCardAddress} numberOfLines={1}>
                  {message.location.address}
                </Text>
                <Text style={styles.locationCardHint}>Tap to open in maps</Text>
              </View>
            </TouchableOpacity>
          )}
          <Text style={[styles.messageTime, message.isEmergency && styles.emergencyTime]}>
            {message.timestamp}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1E90FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 12,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  onlineText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  headerButton: {
    padding: 8,
  },
  emergencyBanner: {
    backgroundColor: '#FFF8E1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE082',
  },
  emergencyBannerText: {
    flex: 1,
    fontSize: 13,
    color: '#F57C00',
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  systemMessage: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignSelf: 'center',
    maxWidth: '90%',
  },
  systemMessageIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  systemMessageContent: {
    flex: 1,
  },
  systemMessageUser: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 4,
  },
  systemMessageText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
  },
  messageUser: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  messageBubble: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderTopLeftRadius: 4,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  emergencyBubble: {
    backgroundColor: '#FFEBEE',
    borderLeftWidth: 3,
    borderLeftColor: '#E74C3C',
  },
  emergencyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 6,
    gap: 4,
  },
  emergencyTagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  emergencyText: {
    color: '#C0392B',
    fontWeight: '500',
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  emergencyTime: {
    color: '#E74C3C',
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
    maxWidth: '85%',
    alignSelf: 'flex-end',
  },
  userMessage: {
    backgroundColor: '#1E90FF',
    borderRadius: 12,
    borderTopRightRadius: 4,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  userMessageText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  userMessageTime: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
    textAlign: 'right',
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    gap: 10,
    alignItems: 'center',
  },
  locationCardContent: {
    flex: 1,
  },
  locationCardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  locationCardAddress: {
    fontSize: 11,
    color: '#333',
    marginTop: 2,
  },
  locationCardHint: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
  },
  attachmentPreview: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 12,
  },
  imagePreview: {
    position: 'relative',
    marginBottom: 8,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  locationPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 8,
    gap: 8,
  },
  locationPreviewText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  quickActionsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    padding: 8,
  },
  emergencyAction: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  quickActionText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  emergencyText: {
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
});