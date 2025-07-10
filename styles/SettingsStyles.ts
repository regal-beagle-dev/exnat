import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../constants/Theme';

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingBottom: Spacing.xl,
  },
  section: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  toggleLabel: {
    flex: 1,
    marginRight: Spacing.md,
  },
  toggleLabelText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  toggleDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
