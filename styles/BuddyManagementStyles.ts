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
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  moreText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  manageButton: {
    marginTop: Spacing.sm,
  },
  buddiesList: {
    gap: Spacing.sm,
  },
  buddyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  buddyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buddyEmoji: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  buddyDetails: {
    flex: 1,
  },
  buddyRelationship: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyState: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 8,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
