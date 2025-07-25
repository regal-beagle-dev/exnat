import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../../../../constants/Theme';

export const timePickerStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    paddingBottom: Spacing.lg,
    ...Shadows.lg,
  },
  modalHeader: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceSecondary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  pickerContainer: {
    paddingHorizontal: Spacing.lg,
  },
  picker: {
    backgroundColor: Colors.surface,
  },
  hourOnlyHint: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    fontStyle: 'italic',
  },
  fieldContainer: {
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  fieldButton: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceSecondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldButtonError: {
    borderColor: Colors.error,
  },
  fieldText: {
    fontSize: 16,
    color: Colors.text,
  },
  fieldPlaceholder: {
    color: Colors.textSecondary,
  },
  fieldIcon: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  fieldError: {
    fontSize: 14,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  fieldHelpText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
