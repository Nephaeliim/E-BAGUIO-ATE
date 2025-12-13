# 🚨 E-BAGUIO-ATE

**Emergency Alert & Response System for Baguio City**

A comprehensive mobile application designed to provide real-time emergency alerts, disaster management, and community coordination for residents of Baguio City, Philippines.

[![React Native](https://img.shields.io/badge/React%20Native-0.76-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-52.0-black.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📱 Features

### 🌊 Real-Time Emergency Alerts
- **PAGASA Typhoon Alerts** - Live weather warnings and signal updates
- **Power Outage Monitoring** - BENECO outage reports and schedules
- **Landslide & Flood Warnings** - Location-based hazard alerts
- **Internet Service Status** - ISP outage tracking for PLDT, Globe, and Converge

### 🗺️ Evacuation Center Finder
- **Real-Time GPS Navigation** - Google Maps integration for turn-by-turn directions
- **Live Capacity Tracking** - See available space in evacuation centers
- **Facility Information** - Medical stations, restrooms, food distribution points
- **Distance Calculation** - Automatic distance from your current location

### 🏥 First Aid Library
- **Interactive Guides** - Step-by-step emergency medical procedures
- **CPR Instructions** - Life-saving techniques with visual aids
- **Wound Care** - Proper bandaging and treatment methods
- **Emergency Contact Integration** - One-tap calling to emergency services

### 👥 Community Hub
- **Real-Time Chat** - Emergency communication with local community
- **📍 Location Sharing** - Share your GPS coordinates in emergencies
- **📷 Photo Sharing** - Document and report incidents with images
- **🚨 Emergency SOS Button** - Broadcast urgent alerts to all users and call 911
- **Verified Reports** - Community-validated incident reporting

### 📊 Report Submission
- **Multi-Type Reporting** - Floods, landslides, medical emergencies, fires
- **Photo Attachments** - Visual documentation of incidents
- **GPS Tagging** - Automatic location capture
- **Urgency Levels** - Critical, High, and Moderate priority ratings

### 🔐 User Authentication
- **Email/Password Login** - Secure account management
- **Google Sign-In** - OAuth 2.0 integration
- **Guest Mode** - Limited access without registration
- **Server Sync** - ngrok-powered remote authentication

---

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development framework and build tools
- **React Navigation** - Seamless screen transitions
- **Expo Location** - GPS and geocoding services
- **Expo Image Picker** - Camera and gallery integration
- **Google Sign-In** - OAuth authentication

### Backend
- **PHP** - RESTful API endpoints
- **MySQL** - User and report data storage
- **WAMP Server** - Local development environment
- **ngrok** - Secure tunneling for remote access

### APIs & Services
- **Google Maps API** - Navigation and mapping
- **PAGASA Integration** - Weather alert system (planned)
- **BENECO Facebook API** - Power outage updates (planned)

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Android Studio (for Android development)
- WAMP Server (for backend)
- ngrok account (for remote testing)

### Clone Repository
```bash
git clone https://github.com/yourusername/e-baguio-ate.git
cd e-baguio-ate
```

### Install Dependencies
```bash
npm install
```

### Install Additional Packages
```bash
npm install expo-auth-session expo-web-browser expo-location expo-image-picker expo-checkbox
```

---

## ⚙️ Configuration

### 1. Google Sign-In Setup

#### Get OAuth Credentials:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: "E-Baguio-Ate"
3. Enable **Google Identity Services API**
4. Create OAuth 2.0 credentials (Android & Web)
5. Get your SHA-1 fingerprint:
   ```bash
   cd android
   ./gradlew signingReport
   ```

#### Update LoginScreen.js:
```javascript
const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
});
```

### 2. Backend Setup (WAMP + ngrok)

#### Install WAMP:
1. Download from [wampserver.com](https://www.wampserver.com/)
2. Install to `C:\wamp64\`
3. Start all services (icon should be green)

#### Create Database:
1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Create database: `ebaguio_db`
3. Run SQL:
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Setup API Files:
1. Create folder: `C:\wamp64\www\ebaguio-api\`
2. Add `login.php` and `register.php` (see `/backend` folder)
3. Test: http://localhost/ebaguio-api/register.php

#### Setup ngrok:
1. Download from [ngrok.com](https://ngrok.com/download)
2. Sign up and get auth token
3. Start tunnel:
   ```bash
   ngrok http 80
   ```
4. Copy HTTPS URL (e.g., `https://abc123.ngrok.io`)

#### Update API URLs:
In `screens/LoginScreen.js` and `screens/SignupScreen.js`:
```javascript
const API_URL = 'https://YOUR-NGROK-URL.ngrok.io/ebaguio-api';
```

### 3. Update app.json
```json
{
  "expo": {
    "android": {
      "package": "com.ebaguioate.app",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ]
    }
  }
}
```

---

## 🚀 Running the App

### Development Mode (Expo Go)
```bash
npx expo start
```
Scan QR code with Expo Go app

### Android Emulator
```bash
npx expo run:android
```

### Build Production APK
```bash
cd android
./gradlew assembleDebug
# APK location: android/app/build/outputs/apk/debug/app-debug.apk
```

### Build with EAS (Recommended)
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

---

## 📂 Project Structure

```
e-baguio-ate/
├── App.js                          # Main app component
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── assets/                         # Images and static files
│   └── ebaguioate-logo.jpg
├── screens/                        # All app screens
│   ├── AlertsScreen.js            # Emergency alerts
│   ├── OutagesScreen.js           # Power & internet outages
│   ├── HomeScreen.js              # Dashboard
│   ├── EvacuationScreen.js        # Evacuation centers list
│   ├── EvacDetailScreen.js        # Evacuation center details
│   ├── HelpScreen.js              # Emergency services
│   ├── FirstAidScreen.js          # First aid guides
│   ├── CommunityHubScreen.js      # Real-time chat & alerts
│   ├── SubmitReportScreen.js      # Report incidents
│   ├── InternetOutageReportsScreen.js  # ISP outage reports
│   ├── WelcomeScreen.js           # Onboarding
│   ├── LoginScreen.js             # Authentication
│   ├── SignupScreen.js            # Registration
│   └── CustomHeader.js            # Reusable header component
├── backend/                        # PHP backend files
│   ├── login.php                  # Login endpoint
│   ├── register.php               # Registration endpoint
│   └── database.sql               # Database schema
└── android/                        # Android native code