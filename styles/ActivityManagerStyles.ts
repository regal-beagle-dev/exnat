import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';

export const activityManagerStyles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  activitiesList: {
    maxHeight: 200,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityEmoji: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  activityDetails: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  activityType: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  removeButton: {
    backgroundColor: Colors.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: Colors.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  addForm: {
    gap: Spacing.sm,
  },
  input: {
    marginVertical: 0,
  },
  formButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  cancelButton: {
    flex: 1,
  },
  addButton: {
    flex: 1,
  },
  showFormButton: {
    marginTop: Spacing.sm,
  },
});
