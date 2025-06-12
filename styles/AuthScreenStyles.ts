import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';

export const authScreenStyles = StyleSheet.create({
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
