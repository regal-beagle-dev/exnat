import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../../../../constants/Theme';

export const formStyles = StyleSheet.create({
  formContainer: {
    gap: Spacing.md,
  },
  fieldContainer: {
    marginBottom: Spacing.sm,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  fieldInput: {
    marginVertical: 0,
  },
  fieldInputError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: Spacing.md,
  },
  helpText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
  actionsContainer: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
});
