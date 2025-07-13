import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#4A7C59',      // Forest green
  primaryLight: '#6B9C7A',  // Light forest green
  primaryDark: '#2E4B37',   // Dark forest green
  
  secondary: '#8FBC8F',     // Sage green
  accent: '#FFD700',        // Warm gold
  mustard: '#D4A574',       // Soft mustardy yellow
  mustardLight: '#E8C397',  // Light mustard for backgrounds
  
  background: '#F8FFF8',    // Very light mint
  surface: '#FFFFFF',       // Pure white
  surfaceSecondary: '#F0F8F0', // Light mint
  
  text: '#2C3E2E',         // Dark forest text
  textSecondary: '#5A6B5C', // Medium forest text
  textLight: '#8A9B8C',     // Light forest text
  
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  
  // Gradient colors
  gradientStart: '#E8F5E8',
  gradientEnd: '#D4EDDA',
  
  // Time picker colors
  timeSlot: '#E8F5E8',
  timeSlotActive: '#4A7C59',
  timeSlotText: '#2C3E2E',
  timeSlotActiveText: '#FFFFFF',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 50,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 10,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.32,
    elevation: 16,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
    ...Shadows.md,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    color: Colors.primary,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceSecondary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceSecondary,
    backgroundColor: Colors.surface,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    flex: 1,
  },
  headerButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minWidth: 60,
  },
  headerButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  backButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minWidth: 60,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  headerSpacer: {
    width: 60,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
});
