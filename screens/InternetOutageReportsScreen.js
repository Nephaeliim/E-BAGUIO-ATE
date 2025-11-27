import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function InternetOutageReportsScreen({ navigation, route }) {
  const [selectedProvider, setSelectedProvider] = useState(route?.params?.provider || null);
  const [showProviderModal, setShowProviderModal] = useState(!selectedProvider);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Maria Santos', text: 'PLDT talaga!', time: '2 hours ago' },
    { id: 2, user: 'Juan Dela Cruz', text: 'PLDT ano na naman bayad pero walang wala', time: '3 hours ago' },
  ]);

  const providers = [
    { id: 'pldt', name: 'PLDT', color: '#C41E3A' },
    { id: 'globe', name: 'Globe', color: '#0033A0' },
    { id: 'converge', name: 'Converge', color: '#00A651' },
  ];

  const problemTypes = [
    { label: 'No Internet', percentage: 45, color: '#E74C3C' },
    { label: 'Slow Connection', percentage: 30, color: '#F1C40F' },
    { label: 'Intermittent', percentage: 15, color: '#3498DB' },
    { label: 'Other', percentage: 10, color: '#95A5A6' },
  ];

  const outageData = [
    { time: '12 AM', reports: 5 },
    { time: '3 AM', reports: 8 },
    { time: '6 AM', reports: 15 },
    { time: '9 AM', reports: 45 },
    { time: '12 PM', reports: 120 },
    { time: '3 PM', reports: 85 },
    { time: '6 PM', reports: 60 },
    { time: '9 PM', reports: 30 },
  ];

  const maxReports = Math.max(...outageData.map(d => d.reports));

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        {
          id: comments.length + 1,
          user: 'You',
          text: newComment,
          time: 'Just now',
          isUser: true
        },
        ...comments
      ]);
      setNewComment('');
    }
  };

  const handleReportOutage = () => {
    alert('Thank you for reporting! Your report has been submitted.');
  };

  if (showProviderModal) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>E-BAGUIO-ATE</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="warning-outline" size={24} color="#333" style={{ marginRight: 10 }} />
            <Ionicons name="globe-outline" size={24} color="#333" />
          </View>
        </View>

        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Internet Outage Reports</Text>
          <Text style={styles.modalSubtitle}>Please select your provider</Text>

          <ScrollView contentContainerStyle={styles.providerList}>
            {providers.map((provider) => (
              <View key={provider.id} style={styles.providerCard}>
                <View style={[styles.providerIcon, { backgroundColor: provider.color }]}>
                  <Text style={styles.providerIconText}>
                    {provider.name === 'PLDT' ? '📡' : provider.name === 'Globe' ? '🌐' : '📶'}
                  </Text>
                </View>
                <Text style={styles.providerName}>{provider.name}</Text>
                <TouchableOpacity
                  style={[styles.selectButton, { backgroundColor: provider.color }]}
                  onPress={() => {
                    setSelectedProvider(provider);
                    setShowProviderModal(false);
                  }}
                >
                  <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowProviderModal(true)}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-BAGUIO-ATE</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="warning-outline" size={24} color="#333" style={{ marginRight: 10 }} />
          <Ionicons name="globe-outline" size={24} color="#333" />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Provider Header */}
        <View style={[styles.providerHeader, { backgroundColor: selectedProvider?.color }]}>
          <View style={styles.providerHeaderContent}>
            <Text style={styles.providerHeaderIcon}>
              {selectedProvider?.name === 'PLDT' ? '📡' : selectedProvider?.name === 'Globe' ? '🌐' : '📶'}
            </Text>
            <Text style={styles.providerHeaderText}>{selectedProvider?.name}</Text>
          </View>
        </View>

        {/* Announcement */}
        <View style={styles.announcementCard}>
          <Text style={styles.announcementTitle}>Hi {selectedProvider?.name} Customers!</Text>
          <Text style={styles.announcementText}>
            These are the scheduled maintenance activities for the week of September 8, 2025. 
            We're performing preventive maintenance to keep your connection strong and reliable. 
            This helps us check and maintain our... <Text style={styles.seeMore}>See More</Text>
          </Text>
          <TouchableOpacity style={styles.reportButton} onPress={handleReportOutage}>
            <Text style={styles.reportButtonText}>Report outage</Text>
          </TouchableOpacity>
        </View>

        {/* Outage Graph */}
        <View style={styles.graphCard}>
          <Text style={styles.graphTitle}>Recent Outages (Last 24 Hours)</Text>
          <View style={styles.graph}>
            {outageData.map((data, index) => (
              <View key={index} style={styles.graphBar}>
                <View style={styles.graphBarContainer}>
                  <View
                    style={[
                      styles.graphBarFill,
                      {
                        height: `${(data.reports / maxReports) * 100}%`,
                        backgroundColor: data.reports > 80 ? '#E74C3C' : data.reports > 40 ? '#F1C40F' : '#3498DB'
                      }
                    ]}
                  />
                </View>
                <Text style={styles.graphLabel}>{data.time}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.graphNote}>Peak: {maxReports} reports at 12 PM</Text>
        </View>

        {/* Problem Types */}
        <View style={styles.problemsCard}>
          <Text style={styles.problemsTitle}>Most Reported Problems</Text>
          <View style={styles.problemsList}>
            {problemTypes.map((problem, index) => (
              <View key={index} style={styles.problemItem}>
                <View style={styles.problemInfo}>
                  <View style={[styles.problemDot, { backgroundColor: problem.color }]} />
                  <Text style={styles.problemLabel}>{problem.label}</Text>
                </View>
                <Text style={styles.problemPercentage}>{problem.percentage}%</Text>
              </View>
            ))}
          </View>
          <View style={styles.problemsChart}>
            {problemTypes.map((problem, index) => (
              <View
                key={index}
                style={[
                  styles.problemsChartSegment,
                  {
                    width: `${problem.percentage}%`,
                    backgroundColor: problem.color
                  }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsCard}>
          <Text style={styles.commentsTitle}>Comments:</Text>

          {/* Add Comment */}
          <View style={styles.addCommentContainer}>
            <View style={styles.commentAvatar}>
              <Ionicons name="person" size={20} color="#999" />
            </View>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="#999"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
              <Ionicons name="send" size={20} color="#1E90FF" />
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          {comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <View style={styles.commentAvatar}>
                <Text style={styles.commentAvatarText}>{comment.user[0]}</Text>
              </View>
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUser}>{comment.user}</Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
                <View style={[styles.commentBubble, comment.isUser && styles.commentBubbleUser]}>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7E0',
  },
  header: {
    backgroundColor: '#FFF7E0',
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
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  providerList: {
    gap: 16,
  },
  providerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  providerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerIconText: {
    fontSize: 40,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  selectButton: {
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 20,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  providerHeader: {
    padding: 20,
    alignItems: 'center',
  },
  providerHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  providerHeaderIcon: {
    fontSize: 32,
  },
  providerHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  announcementCard: {
    backgroundColor: '#E3F2FD',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  announcementText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  seeMore: {
    color: '#1E90FF',
    fontWeight: '600',
  },
  reportButton: {
    backgroundColor: '#4A9B8E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  graphCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  graph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 8,
  },
  graphBar: {
    flex: 1,
    alignItems: 'center',
  },
  graphBarContainer: {
    width: '80%',
    height: 100,
    justifyContent: 'flex-end',
  },
  graphBarFill: {
    width: '100%',
    borderRadius: 4,
  },
  graphLabel: {
    fontSize: 9,
    color: '#666',
    marginTop: 4,
  },
  graphNote: {
    fontSize: 12,
    color: '#E74C3C',
    textAlign: 'center',
    fontWeight: '600',
  },
  problemsCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
  },
  problemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  problemsList: {
    marginBottom: 12,
  },
  problemItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  problemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  problemDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  problemLabel: {
    fontSize: 14,
    color: '#333',
  },
  problemPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  problemsChart: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  problemsChartSegment: {
    height: '100%',
  },
  commentsCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    marginBottom: 80,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    maxHeight: 80,
  },
  sendButton: {
    padding: 8,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  commentTime: {
    fontSize: 11,
    color: '#999',
  },
  commentBubble: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 12,
  },
  commentBubbleUser: {
    backgroundColor: '#E3F2FD',
  },
  commentText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
});