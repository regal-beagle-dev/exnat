import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, Spacing, globalStyles } from '../constants/Theme';
import { useAuth } from '../context/AuthContext';

interface AuthScreenProps {
  isLogin: boolean;
  onToggleMode: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ isLogin, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      const success = isLogin ? await login(email, password) : await register(email, password);
      
      if (success) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Error', isLogin ? 'Invalid credentials' : 'Registration failed');
      }
    } catch {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMode = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggleMode();
  };

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>🌿</Text>
            <Text style={globalStyles.title}>Nature Buddy</Text>
            <Text style={styles.tagline}>
              {isLogin ? 'Welcome back!' : 'Start your outdoor journey'}
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={globalStyles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            
            <TextInput
              style={globalStyles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete={isLogin ? 'password' : 'new-password'}
            />

            <TouchableOpacity
              style={[globalStyles.button, styles.submitButton, isLoading && styles.disabled]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={globalStyles.buttonText}>
                {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={handleToggleMode}
            >
              <Text style={styles.toggleText}>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <Text style={styles.toggleTextBold}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logo: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  submitButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  disabled: {
    opacity: 0.6,
  },
  toggleButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  toggleText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  toggleTextBold: {
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default AuthScreen;
