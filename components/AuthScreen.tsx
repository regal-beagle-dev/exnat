import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, globalStyles } from '../constants/Theme';
import { useAuth } from '../context/AuthContext';
import { authScreenStyles } from '../styles/AuthScreenStyles';

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
      style={authScreenStyles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authScreenStyles.keyboardContainer}
      >
        <View style={authScreenStyles.content}>
          <View style={authScreenStyles.header}>
            <Text style={authScreenStyles.logo}>🌿</Text>
            <Text style={globalStyles.title}>Nature Buddy</Text>
            <Text style={authScreenStyles.tagline}>
              {isLogin ? 'Welcome back!' : 'Start your outdoor journey'}
            </Text>
          </View>

          <View style={authScreenStyles.form}>
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
              style={[globalStyles.button, authScreenStyles.submitButton, isLoading && authScreenStyles.disabled]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={globalStyles.buttonText}>
                {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={authScreenStyles.toggleButton}
              onPress={handleToggleMode}
            >
              <Text style={authScreenStyles.toggleText}>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <Text style={authScreenStyles.toggleTextBold}>
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

export default AuthScreen;
