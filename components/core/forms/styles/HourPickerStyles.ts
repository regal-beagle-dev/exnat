import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../../../../constants/Theme';

export const hourPickerStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    margin: Spacing.lg,
    maxHeight: '80%',
    width: '90%',
    ...Shadows.lg,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceSecondary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: 300,
  },
  hourGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hourButton: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  hourButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
  },
  hourButtonDisabled: {
    backgroundColor: Colors.surfaceSecondary,
    opacity: 0.5,
  },
  hourText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  hourTextSelected: {
    color: Colors.surface,
    fontWeight: '600',
  },
  hourTextDisabled: {
    color: Colors.textLight,
  },
});
