import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
