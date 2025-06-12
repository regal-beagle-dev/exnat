import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BorderRadius, Colors, globalStyles, Spacing } from '../constants/Theme';
// import { useAuth } from '../context/AuthContext';
import TimeTracker from './TimeTracker';

const Dashboard: React.FC = () => {
  // const { user, logout } = useAuth();
  const user = { email: 'test@test.com' }; // temporary
  const logout = async () => {}; // temporary
  const [showTimeTracker, setShowTimeTracker] = useState(false);
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

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hello, {user?.email?.split('@')[0]}! 🌱</Text>
              <Text style={styles.date}>{getCurrentDate()}</Text>
            </View>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={[globalStyles.card, styles.welcomeCard]}>
            <Text style={styles.welcomeTitle}>Get out and enjoy the great outdoors!</Text>
            <Text style={styles.welcomeSubtitle}>
              Track your outdoor moments and connect with nature
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[globalStyles.button, styles.primaryAction]}
              onPress={() => handleTrackTime(false)}
            >
              <Text style={styles.actionIcon}>📅</Text>
              <Text style={[globalStyles.buttonText, styles.actionText]}>
                Track Today&apos;s Time
              </Text>
              <Text style={styles.actionSubtext}>
                Record your outdoor activities
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.button, styles.secondaryAction]}
              onPress={() => handleTrackTime(true)}
            >
              <Text style={styles.actionIcon}>⏰</Text>
              <Text style={[styles.actionText, styles.secondaryActionText]}>
                Track Yesterday
              </Text>
              <Text style={[styles.actionSubtext, styles.secondaryActionSubtext]}>
                {getYesterdayDate().split(',')[0]}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[globalStyles.card, styles.statsCard]}>
            <Text style={styles.statsTitle}>Coming Soon</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>🏃‍♂️</Text>
                <Text style={styles.statLabel}>Activity Tracking</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>👨‍👩‍👧‍👦</Text>
                <Text style={styles.statLabel}>Family Buddies</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>📈</Text>
                <Text style={styles.statLabel}>Progress Stats</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>🏆</Text>
                <Text style={styles.statLabel}>Achievements</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  date: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  logoutButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoutText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  welcomeCard: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionButtons: {
    marginBottom: Spacing.xl,
  },
  primaryAction: {
    marginBottom: Spacing.md,
    paddingVertical: Spacing.lg,
    flexDirection: 'column',
    alignItems: 'center',
  },
  secondaryAction: {
    paddingVertical: Spacing.lg,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.mustard, // Soft mustardy yellow
  },
  secondaryActionText: {
    color: Colors.surface, // White text for contrast
  },
  secondaryActionSubtext: {
    color: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  actionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  actionSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  statsCard: {
    marginBottom: Spacing.xl,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  statValue: {
    fontSize: 28,
    marginBottom: Spacing.sm,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Dashboard;
