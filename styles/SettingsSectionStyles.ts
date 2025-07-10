import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';

export const settingsSectionStyles = StyleSheet.create({
  section: {
    marginHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
});
