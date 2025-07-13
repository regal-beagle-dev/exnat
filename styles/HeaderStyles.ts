import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';

export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  backButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    marginRight: Spacing.xl,
  },
  title: {
    color: Colors.surface,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
