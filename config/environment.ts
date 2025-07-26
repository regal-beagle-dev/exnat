// Environment configuration for Nature Buddy

// Set to false when you want to use real backend services
export const USE_MOCK_SERVICES = true;

// Update this URL when you have a real backend
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.naturebuddy.com';

// Other environment configurations
export const API_TIMEOUT = 10000; // 10 seconds
export const ENABLE_LOGGING = typeof __DEV__ !== 'undefined' ? __DEV__ : false;

// Feature flags - easily toggle features
export const FEATURES = {
  ENABLE_ANALYTICS: false,
  ENABLE_PUSH_NOTIFICATIONS: false,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_BUDDIES: false,
  ENABLE_ACTIVITIES: false,
} as const;
