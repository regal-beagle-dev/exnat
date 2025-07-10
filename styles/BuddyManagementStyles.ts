import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';

export const buddyManagementStyles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  summary: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  buddyPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  buddyName: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  moreText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  manageButton: {
    marginTop: Spacing.sm,
  },
});
