import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FirstAidScreen({ navigation }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const firstAidTopics = [
    {
      id: 'bandaging',
      title: 'Bandaging a wound',
      icon: 'bandage',
      steps: [
        { step: 1, text: 'Clean your hands with soap and water or hand sanitizer', icon: 'hand-left' },
        { step: 2, text: 'Stop the bleeding by applying gentle pressure with a clean cloth', icon: 'water' },
        { step: 3, text: 'Clean the wound with clean water. Avoid using hydrogen peroxide', icon: 'medical' },
        { step: 4, text: 'Apply antibiotic ointment to reduce risk of infection', icon: 'eyedrop' },
        { step: 5, text: 'Cover with sterile bandage or gauze pad', icon: 'bandage' },
        { step: 6, text: 'Change bandage daily and watch for signs of infection', icon: 'calendar' },
      ],
      warning: 'Seek medical attention if bleeding doesn\'t stop, wound is deep, or shows signs of infection (redness, swelling, pus, fever)'
    },
    {
      id: 'cpr',
      title: 'Performing CPR',
      icon: 'heart',
      steps: [
        { step: 1, text: 'Check if person is responsive. Tap shoulders and shout "Are you okay?"', icon: 'hand-right' },
        { step: 2, text: 'Call emergency services (911) immediately', icon: 'call' },
        { step: 3, text: 'Position person on firm, flat surface. Kneel beside them', icon: 'person' },
        { step: 4, text: 'Place heel of one hand on center of chest, other hand on top', icon: 'hand-left' },
        { step: 5, text: 'Push hard and fast - compress chest at least 2 inches deep', icon: 'arrow-down' },
        { step: 6, text: 'Give 30 chest compressions at rate of 100-120 per minute', icon: 'pulse' },
        { step: 7, text: 'Give 2 rescue breaths by tilting head back and lifting chin', icon: 'medkit' },
        { step: 8, text: 'Continue cycles of 30 compressions and 2 breaths until help arrives', icon: 'repeat' },
      ],
      warning: 'CPR can save lives but should only be performed when person is unresponsive and not breathing. Take a certified CPR course for proper training.'
    },
    {
      id: 'choking',
      title: 'Helping a choking Person',
      icon: 'alert-circle',
      steps: [
        { step: 1, text: 'Ask "Are you choking?" If they can\'t speak or cough, take action', icon: 'chatbubble' },
        { step: 2, text: 'Stand behind the person and wrap arms around their waist', icon: 'people' },
        { step: 3, text: 'Make a fist with one hand, place it above navel', icon: 'hand-right' },
        { step: 4, text: 'Grasp fist with other hand and give quick upward thrust', icon: 'arrow-up' },
        { step: 5, text: 'Repeat thrusts until object is expelled or person becomes unconscious', icon: 'repeat' },
        { step: 6, text: 'If person becomes unconscious, lower to ground and begin CPR', icon: 'medkit' },
        { step: 7, text: 'Call emergency services if object doesn\'t come out', icon: 'call' },
      ],
      warning: 'For infants under 1 year, use back blows and chest thrusts instead of abdominal thrusts. For pregnant women, position hands higher on chest.'
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>First Aid Library</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner}>
          <Ionicons name="medical" size={40} color="#E74C3C" />
          <Text style={styles.bannerTitle}>Emergency First Aid Guide</Text>
          <Text style={styles.bannerSubtitle}>
            Learn essential first aid techniques. These guides are for emergency situations only.
          </Text>
        </View>

        {firstAidTopics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.topicCard}
            onPress={() => setSelectedTopic(topic)}
          >
            <View style={styles.topicIcon}>
              <Ionicons name={topic.icon} size={32} color="#E74C3C" />
            </View>
            <View style={styles.topicContent}>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicSubtitle}>Tap to view step-by-step instructions</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}

        <View style={styles.disclaimer}>
          <Ionicons name="information-circle" size={24} color="#FF9800" />
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Important:</Text> These instructions are for emergency guidance only. Always call emergency services for serious injuries. Consider taking a certified first aid course for proper training.
          </Text>
        </View>
      </ScrollView>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <Modal
          visible={true}
          animationType="slide"
          onRequestClose={() => setSelectedTopic(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedTopic(null)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedTopic.title}</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalContent}>
              <View style={styles.topicIconLarge}>
                <Ionicons name={selectedTopic.icon} size={60} color="#E74C3C" />
              </View>

              <Text style={styles.stepsTitle}>Step-by-Step Instructions</Text>

              {selectedTopic.steps.map((step) => (
                <View key={step.step} style={styles.stepCard}>
                  <View style={styles.stepHeader}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{step.step}</Text>
                    </View>
                    <Ionicons name={step.icon} size={24} color="#E74C3C" style={styles.stepIcon} />
                  </View>
                  <Text style={styles.stepText}>{step.text}</Text>
                </View>
              ))}

              <View style={styles.warningCard}>
                <Ionicons name="warning" size={28} color="#FF9800" />
                <Text style={styles.warningText}>{selectedTopic.warning}</Text>
              </View>

              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={() => alert('Calling Emergency Services...')}
              >
                <Ionicons name="call" size={20} color="#fff" />
                <Text style={styles.emergencyButtonText}>Call Emergency Services (911)</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  banner: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginTop: 12,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  topicCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topicIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FFEBEE',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  topicSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  disclaimer: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    gap: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  disclaimerBold: {
    fontWeight: 'bold',
    color: '#FF9800',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  modalHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  modalScroll: {
    flex: 1,
  },
  modalContent: {
    padding: 16,
  },
  topicIconLarge: {
    width: 100,
    height: 100,
    backgroundColor: '#FFEBEE',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  stepsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    backgroundColor: '#E74C3C',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepIcon: {
    marginLeft: 'auto',
  },
  stepText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  warningCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: '#C0392B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});