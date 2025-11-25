import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
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

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        
        <View style={styles.weatherSection}>
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>18°C</Text>
            <Text style={styles.weatherCondition}>Rain</Text>
            <Text style={styles.weatherDate}>12/7/25</Text>
          </View>
          
          <TouchableOpacity style={styles.barangayButton}>
            <Ionicons name="business-outline" size={16} color="#fff" />
            <Text style={styles.barangayText}>Barangay Central</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, styles.actionCardRed]}
            onPress={() => navigation.navigate('Help', { screen: 'FirstAid' })}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: '#E74C3C' }]}>
              <Ionicons name="medical-outline" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>First Aid Library</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, styles.actionCardBlue]}
            onPress={() => navigation.navigate('CommunityHub')}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: '#1E90FF' }]}>
              <Ionicons name="people-outline" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>Community Hub</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* System Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Status</Text>
        <View style={styles.statusContainer}>
          <StatusItem label="Weather Monitoring" status="ACTIVE" color="green" />
          <StatusItem label="Power Grid Status" status="GOOD" color="green" />
          <StatusItem label="Internet Coverage" status="GOOD" color="green" />
          <StatusItem label="Emergency Services" status="AVAILABLE" color="green" />
        </View>
      </View>

      {/* Latest Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Updates</Text>
        <View style={styles.newsContainer}>
          <NewsItem 
            title="Signal No. 4 Raised: Typhoon 'Kiko' Threatens Northern Philippines With Violent Winds"
            time="2 hours ago"
          />
          <NewsItem 
            title="Severe Thunderstorm Batters Baguio City: PAGASA Issues Heavy Rainfall Warning"
            time="3 hours ago"
          />
        </View>
      </View>
    </ScrollView>
  );
}

function StatusItem({ label, status, color }) {
  const statusColors = {
    green: { bg: '#D4EDDA', text: '#155724' },
    yellow: { bg: '#FFF3CD', text: '#856404' },
    red: { bg: '#F8D7DA', text: '#721C24' }
  };

  return (
    <View style={styles.statusItem}>
      <Text style={styles.statusLabel}>{label}</Text>
      <View style={[styles.statusBadge, { backgroundColor: statusColors[color].bg }]}>
        <Text style={[styles.statusText, { color: statusColors[color].text }]}>{status}</Text>
      </View>
    </View>
  );
}

function NewsItem({ title, time }) {
  return (
    <View style={styles.newsItem}>
      <View style={styles.newsIndicator} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{title}</Text>
        <Text style={styles.newsTime}>{time}</Text>
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
  welcomeCard: {
    backgroundColor: '#1E90FF',
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  weatherSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherInfo: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  weatherCondition: {
    fontSize: 16,
    color: '#fff',
  },
  weatherDate: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  barangayButton: {
    backgroundColor: '#0A369D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  barangayText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionCardRed: {
    backgroundColor: '#FFEBEE',
  },
  actionCardBlue: {
    backgroundColor: '#E3F2FD',
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  newsContainer: {
    backgroundColor: '#E8EAF6',
    borderRadius: 12,
    padding: 16,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  newsIndicator: {
    width: 4,
    backgroundColor: '#1E90FF',
    marginRight: 12,
    borderRadius: 2,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  newsTime: {
    fontSize: 11,
    color: '#666',
  },
});