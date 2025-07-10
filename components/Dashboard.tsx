import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, globalStyles } from '../constants/Theme';
// import { useAuth } from '../context/AuthContext';
import { dashboardStyles } from '../styles/DashboardStyles';
import Settings from './Settings';
import TimeTracker from './TimeTracker';

const Dashboard: React.FC = () => {
  // const { user, logout } = useAuth();
  const user = { email: 'test@test.com' }; // temporary
  const logout = async () => {}; // temporary
  const [showTimeTracker, setShowTimeTracker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isYesterday, setIsYesterday] = useState(false);

  const handleLogout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            logout();
          }
        },
      ]
    );
  };

  const handleTrackTime = async (yesterday: boolean = false) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsYesterday(yesterday);
    setShowTimeTracker(true);
  };

  const handleCloseTimeTracker = () => {
    setShowTimeTracker(false);
  };

  const handleOpenSettings = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (showTimeTracker) {
    return (
      <TimeTracker 
        isYesterday={isYesterday}
        onClose={handleCloseTimeTracker}
      />
    );
  }

  if (showSettings) {
    return (
      <Settings 
        onClose={handleCloseSettings}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={dashboardStyles.container}
    >
      <ScrollView contentContainerStyle={dashboardStyles.scrollContent}>
        <View style={dashboardStyles.header}>
          <View style={dashboardStyles.headerContent}>
            <View>
              <Text style={dashboardStyles.greeting}>Hello, {user?.email?.split('@')[0]}! 🌱</Text>
              <Text style={dashboardStyles.date}>{getCurrentDate()}</Text>
            </View>
            <View style={dashboardStyles.headerButtons}>
              <TouchableOpacity 
                style={dashboardStyles.settingsButton}
                onPress={handleOpenSettings}
              >
                <Text style={dashboardStyles.settingsText}>⚙️</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={dashboardStyles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={dashboardStyles.logoutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={dashboardStyles.content}>
          <View style={[globalStyles.card, dashboardStyles.welcomeCard]}>
            <Text style={dashboardStyles.welcomeTitle}>Get out and enjoy the great outdoors!</Text>
            <Text style={dashboardStyles.welcomeSubtitle}>
              Track your outdoor moments and connect with nature
            </Text>
          </View>

          <View style={dashboardStyles.actionButtons}>
            <TouchableOpacity
              style={[globalStyles.button, dashboardStyles.primaryAction]}
              onPress={() => handleTrackTime(false)}
            >
              <Text style={dashboardStyles.actionIcon}>🗓️</Text>
              <Text style={[globalStyles.buttonText, dashboardStyles.actionText]}>
                Track Today&apos;s Time
              </Text>
              <Text style={dashboardStyles.actionSubtext}>
                Record your outdoor activities
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.button, dashboardStyles.secondaryAction]}
              onPress={() => handleTrackTime(true)}
            >
              <Text style={dashboardStyles.actionIcon}>⏰</Text>
              <Text style={[dashboardStyles.actionText, dashboardStyles.secondaryActionText]}>
                Track Yesterday
              </Text>
              <Text style={[dashboardStyles.actionSubtext, dashboardStyles.secondaryActionSubtext]}>
                {getYesterdayDate().split(',')[0]}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[globalStyles.card, dashboardStyles.statsCard]}>
            <Text style={dashboardStyles.statsTitle}>Coming Soon</Text>
            <View style={dashboardStyles.statsGrid}>
              <View style={dashboardStyles.statItem}>
                <Text style={dashboardStyles.statValue}>🏃‍♂️</Text>
                <Text style={dashboardStyles.statLabel}>Activity Tracking</Text>
              </View>
              <View style={dashboardStyles.statItem}>
                <Text style={dashboardStyles.statValue}>👨‍👩‍👧‍👦</Text>
                <Text style={dashboardStyles.statLabel}>Family Buddies</Text>
              </View>
              <View style={dashboardStyles.statItem}>
                <Text style={dashboardStyles.statValue}>📈</Text>
                <Text style={dashboardStyles.statLabel}>Progress Stats</Text>
              </View>
              <View style={dashboardStyles.statItem}>
                <Text style={dashboardStyles.statValue}>🏆</Text>
                <Text style={dashboardStyles.statLabel}>Achievements</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Dashboard;
