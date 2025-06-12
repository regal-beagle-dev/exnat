import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AuthScreen from '../components/AuthScreen';
import Dashboard from '../components/Dashboard';
import { Colors, globalStyles } from '../constants/Theme';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={globalStyles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.safeArea}>
        {user ? (
          <Dashboard />
        ) : (
          <AuthScreen 
            isLogin={isLoginMode} 
            onToggleMode={() => setIsLoginMode(!isLoginMode)} 
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
