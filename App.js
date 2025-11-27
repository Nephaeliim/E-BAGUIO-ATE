import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AlertsScreen from './screens/AlertsScreen';
import OutagesScreen from './screens/OutagesScreen';
import HomeScreen from './screens/HomeScreen';
import EvacuationScreen from './screens/EvacuationScreen';
import HelpScreen from './screens/HelpScreen';
import FirstAidScreen from './screens/FirstAidScreen';
import CommunityHubScreen from './screens/CommunityHubScreen';
import EvacuationDetailScreen from './screens/EvacuationDetailScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create a Stack Navigator for the Evacuation flow
function EvacuationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EvacuationMain" component={EvacuationScreen} />
      <Stack.Screen name="EvacuationDetail" component={EvacuationDetailScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#fff', 
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0'
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: '#666',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Outages') iconName = focused ? 'warning' : 'warning-outline';
          else if (route.name === 'Alerts') iconName = focused ? 'flash' : 'flash-outline';
          else if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Evacuation') iconName = focused ? 'navigate' : 'navigate-outline';
          else if (route.name === 'Help') iconName = focused ? 'help-circle' : 'help-circle-outline';
          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Outages" component={OutagesScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Evacuation" component={EvacuationStack} />
      <Tab.Screen name="Help" component={HelpScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="FirstAid" component={FirstAidScreen} />
        <Stack.Screen name="CommunityHub" component={CommunityHubScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}