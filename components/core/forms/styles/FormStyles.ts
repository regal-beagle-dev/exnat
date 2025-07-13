import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../../../../constants/Theme';

export const formStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: Spacing.lg,
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
  fieldInput: {
    marginVertical: 0,
    fontSize: 16,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  fieldInputError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: Spacing.md,
  },
  helpText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    marginTop: Spacing.sm,
    fontWeight: '500',
  },
  actionsContainer: {
    marginTop: 'auto',
    paddingTop: Spacing.xl,
    gap: Spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
    minHeight: 50,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
});
