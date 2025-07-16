import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../../../../constants/Theme';

export const skeletonStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spacing.lg,
  },
  headerSkeleton: {
    height: 28,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
    width: '60%',
  },
  fieldContainer: {
    marginBottom: Spacing.md,
  },
  labelSkeleton: {
    height: 19,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
    width: '35%',
  },
  inputSkeleton: {
    height: 48,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.textLight,
  },
  actionsContainer: {
    marginTop: 'auto',
    paddingTop: Spacing.xl,
    gap: Spacing.md,
  },
  buttonSkeleton: {
    height: 50,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.md,
  },
  animatedSkeleton: {
    backgroundColor: Colors.surfaceSecondary,
  },
});
