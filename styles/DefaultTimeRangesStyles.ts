import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';

export const defaultTimeRangesStyles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  rangeContainer: {
    gap: Spacing.sm,
  },
  rangeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  rangeButton: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rangeText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
});
