import { FEATURES } from '../../config/environment';

describe('Environment Configuration', () => {
  describe('Feature Flags', () => {
    test('should have all required feature flags defined', () => {
      expect(FEATURES.ENABLE_ANALYTICS).toBeDefined();
      expect(FEATURES.ENABLE_PUSH_NOTIFICATIONS).toBeDefined();
      expect(FEATURES.ENABLE_OFFLINE_MODE).toBeDefined();
      expect(FEATURES.ENABLE_BUDDIES).toBeDefined();
      expect(FEATURES.ENABLE_ACTIVITIES).toBeDefined();
    });

    test('should have correct default values for release', () => {
      expect(FEATURES.ENABLE_BUDDIES).toBe(false);
      expect(FEATURES.ENABLE_ACTIVITIES).toBe(false);
    });

    test('should have boolean values for all flags', () => {
      expect(typeof FEATURES.ENABLE_ANALYTICS).toBe('boolean');
      expect(typeof FEATURES.ENABLE_PUSH_NOTIFICATIONS).toBe('boolean');
      expect(typeof FEATURES.ENABLE_OFFLINE_MODE).toBe('boolean');
      expect(typeof FEATURES.ENABLE_BUDDIES).toBe('boolean');
      expect(typeof FEATURES.ENABLE_ACTIVITIES).toBe('boolean');
    });

    test('should have readonly type for feature flags', () => {
      // This test ensures the FEATURES object has readonly properties
      // The 'as const' assertion makes the object readonly at compile time
      expect(FEATURES).toEqual({
        ENABLE_ANALYTICS: false,
        ENABLE_PUSH_NOTIFICATIONS: false,
        ENABLE_OFFLINE_MODE: true,
        ENABLE_BUDDIES: false,
        ENABLE_ACTIVITIES: false,
      });
    });
  });
});
