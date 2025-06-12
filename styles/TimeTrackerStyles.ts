import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/Theme';

const INTERVAL_HEIGHT = 50; // Height of each 20-minute interval slot

export const timeTrackerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: Spacing.xl,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BorderRadius.sm,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  date: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  instructionCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  instructionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  timeGrid: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  gridTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  timeModeToggle: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.md,
    padding: 4,
  },
  timeModeTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeModeTabActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  timeModeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  timeModeTabTextActive: {
    color: Colors.surface,
    fontWeight: 'bold',
  },
  selectionHint: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    fontStyle: 'italic',
  },
  selectionControls: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cancelSelectionButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.sm,
  },
  cancelSelectionText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: '500',
  },
  calendarContainer: {
    flex: 1,
  },
  hourDivider: {
    height: 2,
    backgroundColor: Colors.primary,
    opacity: 0.6,
    marginVertical: 4,
    borderRadius: 1,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  calendarInterval: {
    flexDirection: 'row',
    height: INTERVAL_HEIGHT,
    marginBottom: 4, // Add padding between hours
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  calendarIntervalSelected: {
    backgroundColor: Colors.primaryLight,
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    transform: [{ scale: 1.02 }],
  },
  calendarIntervalInRange: {
    backgroundColor: Colors.timeSlotActive,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  timeLabel: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    borderRightWidth: 1,
    borderRightColor: Colors.timeSlot,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  timeTextActive: {
    color: Colors.primary, // Changed to ensure visibility
    fontWeight: 'bold',
  },
  intervalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    position: 'relative',
  },
  intervalContentSelected: {
    backgroundColor: 'rgba(74, 124, 89, 0.1)',
  },
  intervalContentInRange: {
    backgroundColor: 'rgba(74, 124, 89, 0.2)',
  },
  selectedIndicator: {
    fontSize: 18,
    zIndex: 1,
  },
  selectedRanges: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  rangesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  rangeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  rangeText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  removeRange: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeRangeText: {
    fontSize: 16,
    color: Colors.surface,
    fontWeight: 'bold',
  },
  actionButtons: {
    paddingHorizontal: Spacing.lg,
  },
  customTimeButton: {
    marginBottom: Spacing.md,
    backgroundColor: Colors.mustard, // Soft mustardy yellow to match Dashboard
  },
  customTimeText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.surface, // White text for contrast
  },
  submitButton: {
    paddingVertical: Spacing.lg,
  },
  submitText: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  customTimeInputs: {
    marginBottom: Spacing.lg,
  },
  timeInputGroup: {
    marginBottom: Spacing.md,
  },
  modalTimeLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  timeInput: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  modalAddButton: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
});
