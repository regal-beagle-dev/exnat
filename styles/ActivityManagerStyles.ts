import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';

export const activityManagerStyles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.lg,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  pageDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.surface,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.text,
  },
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
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
  activitiesList: {
    maxHeight: 300,
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
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.lg,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
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
