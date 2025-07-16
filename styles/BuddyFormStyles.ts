import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';

export const buddyFormStyles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
  },
  formSection: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  helpText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  button: {
    flex: 1,
  },
});
