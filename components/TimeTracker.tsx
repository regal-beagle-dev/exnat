import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BorderRadius, Colors, globalStyles, Spacing } from '../constants/Theme';

interface TimeTrackerProps {
  isYesterday?: boolean;
  onClose: () => void;
}

interface TimeSlot {
  time: number; // Time in hours (e.g., 1.33 for 01:20)
  isSelected: boolean;
}

interface TimeRange {
  start: number;
  end: number;
}

const MINUTES_PER_INTERVAL = 20;
const INTERVALS_PER_HOUR = 60 / MINUTES_PER_INTERVAL; // 3 intervals per hour
const TOTAL_INTERVALS = 24 * INTERVALS_PER_HOUR; // 72 total intervals in a day
const INTERVAL_HEIGHT = 50; // Height of each 20-minute interval slot

const TimeTracker: React.FC<TimeTrackerProps> = ({ isYesterday = false, onClose }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    Array.from({ length: TOTAL_INTERVALS }, (_, i) => ({
      time: i * (MINUTES_PER_INTERVAL / 60), // Convert interval index to hours
      isSelected: false,
    }))
  );
  const [selectedRanges, setSelectedRanges] = useState<TimeRange[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customStartTime, setCustomStartTime] = useState('');
  const [customEndTime, setCustomEndTime] = useState('');
  const [timeMode, setTimeMode] = useState<'AM' | 'PM'>('AM');

  const formatTime = (time: number): string => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const parseTimeInput = (timeStr: string): number | null => {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    
    if (hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) return null;
    
    return hours + minutes / 60;
  };

  const formatTimeRange = (start: number, end: number): string => {
    const formatTime = (time: number) => {
      const totalMinutes = Math.round(time * 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };
    
    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const handleSlotPress = useCallback(async (time: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!isSelecting) {
      setIsSelecting(true);
      setSelectionStart(time);
      setTimeSlots(prev =>
        prev.map(slot => ({
          ...slot,
          isSelected: slot.time === time,
        }))
      );
    } else if (selectionStart !== null) {
      const startInterval = Math.floor(Math.min(selectionStart, time) * INTERVALS_PER_HOUR);
      const endInterval = Math.floor(Math.max(selectionStart, time) * INTERVALS_PER_HOUR);

      const finalStart = startInterval * (MINUTES_PER_INTERVAL / 60);
      const finalEnd = (endInterval + 1) * (MINUTES_PER_INTERVAL / 60);

      setTimeSlots(prev =>
        prev.map(slot => ({
          ...slot,
          isSelected: slot.time >= finalStart && slot.time < finalEnd,
        }))
      );

      setTimeout(async () => {
        setSelectedRanges(prev => [...prev, { start: finalStart, end: finalEnd }]);
        setIsSelecting(false);
        setSelectionStart(null);
        setTimeSlots(prev => prev.map(slot => ({ ...slot, isSelected: false })));
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, 200);
    }
  }, [isSelecting, selectionStart]);


  const updateSelectionPreview = useCallback((time: number) => {
    if (isSelecting && selectionStart !== null) {
      const startInterval = Math.floor(Math.min(selectionStart, time) * INTERVALS_PER_HOUR);
      const endInterval = Math.floor(Math.max(selectionStart, time) * INTERVALS_PER_HOUR);

      const finalStart = startInterval * (MINUTES_PER_INTERVAL / 60);
      const finalEnd = (endInterval + 1) * (MINUTES_PER_INTERVAL / 60);
      
      setTimeSlots(prev => prev.map(slot => ({
        ...slot,
        isSelected: slot.time >= finalStart && slot.time < finalEnd
      })));
    }
  }, [isSelecting, selectionStart]);

  const isTimeInRange = (time: number): boolean => {
    return selectedRanges.some(range => time >= range.start && time < range.end);
  };

  const removeRange = async (index: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedRanges(prev => prev.filter((_, i) => i !== index));
  };

  const addCustomTimeRange = async () => {
    const start = parseTimeInput(customStartTime);
    const end = parseTimeInput(customEndTime);
    
    if (start === null || end === null) {
      Alert.alert('Invalid Time', 'Please enter time in HH:MM format (e.g., 14:30)');
      return;
    }
    
    if (start >= end) {
      Alert.alert('Invalid Range', 'End time must be after start time');
      return;
    }
    
    const newRange: TimeRange = { start, end };
    setSelectedRanges(prev => [...prev, newRange]);
    setCustomStartTime('');
    setCustomEndTime('');
    setShowCustomTime(false);
    
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const cancelSelection = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsSelecting(false);
    setSelectionStart(null);
    setTimeSlots(prev => prev.map(slot => ({ ...slot, isSelected: false })));
  };

  const handleSubmit = async () => {
    if (selectedRanges.length === 0) {
      Alert.alert('No Time Selected', 'Please select at least one time range to track your outdoor time.');
      return;
    }

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Calculate total time
    const totalHours = selectedRanges.reduce((sum, range) => sum + (range.end - range.start), 0);
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    
    Alert.alert(
      'Time Recorded! 🌿',
      `You spent ${hours}h ${minutes}m outside ${isYesterday ? 'yesterday' : 'today'}.\n\nGreat job connecting with nature!`,
      [{ text: 'Done', onPress: onClose }]
    );
  };

  const getCurrentDate = () => {
    const date = new Date();
    if (isYesterday) {
      date.setDate(date.getDate() - 1);
    }
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getFilteredTimeSlots = () => {
    return timeSlots.filter(slot => {
      const hour = Math.floor(slot.time);
      if (timeMode === 'AM') {
        return hour >= 0 && hour < 12;
      } else {
        return hour >= 12 && hour < 24;
      }
    });
  };

  const renderTimeSlot = (slot: TimeSlot, index: number) => {
    const isInRange = isTimeInRange(slot.time);
    const isCurrentlySelected = slot.isSelected;
    const isFirstIntervalOfHour = (slot.time * INTERVALS_PER_HOUR) % INTERVALS_PER_HOUR === 0;
    
    return (
      <View key={slot.time}>
        {/* Hour divider line */}
        {isFirstIntervalOfHour && index > 0 && (
          <View style={styles.hourDivider} />
        )}
        
        <TouchableOpacity
          style={[
            styles.calendarInterval,
            isInRange && styles.calendarIntervalInRange,
            isCurrentlySelected && styles.calendarIntervalSelected,
          ]}
          onPress={() => handleSlotPress(slot.time)}
          onPressIn={() => updateSelectionPreview(slot.time)}
        >
          <View style={styles.timeLabel}>
            <Text style={[
              styles.timeText,
              (isInRange || isCurrentlySelected) && styles.timeTextActive,
            ]}>
              {formatTime(slot.time)}
            </Text>
          </View>
          <View style={[
            styles.intervalContent,
            isInRange && styles.intervalContentInRange,
            isCurrentlySelected && styles.intervalContentSelected,
          ]}>
            {(isInRange || isCurrentlySelected) && (
              <Text style={styles.selectedIndicator}>🌿</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Track Your Time Outside</Text>
            <Text style={styles.date}>{getCurrentDate()}</Text>
          </View>
        </View>

        <View style={[globalStyles.card, styles.instructionCard]}>
          <Text style={styles.instructionTitle}>How to track your time:</Text>
          <Text style={styles.instructionText}>
            • Tap a start time and then an end time{'\n'}
            • Use &quot;Custom Time&quot; for precise timing{'\n'}
          </Text>
        </View>

        <View style={[globalStyles.card, styles.timeGrid]}>
          <Text style={styles.gridTitle}>Select Hours (24-hour format)</Text>
          
          {/* AM/PM Toggle Tabs */}
          <View style={styles.timeModeToggle}>
            <TouchableOpacity
              style={[
                styles.timeModeTab,
                timeMode === 'AM' && styles.timeModeTabActive
              ]}
              onPress={() => setTimeMode('AM')}
            >
              <Text style={[
                styles.timeModeTabText,
                timeMode === 'AM' && styles.timeModeTabTextActive
              ]}>
                AM (00:00 - 11:40)
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.timeModeTab,
                timeMode === 'PM' && styles.timeModeTabActive
              ]}
              onPress={() => setTimeMode('PM')}
            >
              <Text style={[
                styles.timeModeTabText,
                timeMode === 'PM' && styles.timeModeTabTextActive
              ]}>
                PM (12:00 - 23:40)
              </Text>
            </TouchableOpacity>
          </View>
          
          {isSelecting && (
            <View style={styles.selectionControls}>
              <Text style={styles.selectionHint}>
                Now tap the end time to complete your selection
              </Text>
              <TouchableOpacity
                style={styles.cancelSelectionButton}
                onPress={cancelSelection}
              >
                <Text style={styles.cancelSelectionText}>Cancel Selection</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <View style={styles.calendarContainer}>
            {getFilteredTimeSlots().map((slot, index) => renderTimeSlot(slot, index))}
          </View>
        </View>

        {selectedRanges.length > 0 && (
          <View style={[globalStyles.card, styles.selectedRanges]}>
            <Text style={styles.rangesTitle}>Selected Time Ranges:</Text>
            {selectedRanges.map((range, index) => (
              <View key={index} style={styles.rangeItem}>
                <Text style={styles.rangeText}>
                  {formatTimeRange(range.start, range.end)}
                </Text>
                <TouchableOpacity
                  style={styles.removeRange}
                  onPress={() => removeRange(index)}
                >
                  <Text style={styles.removeRangeText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[globalStyles.button, styles.customTimeButton]}
            onPress={() => setShowCustomTime(true)}
          >
            <Text style={[globalStyles.buttonText, styles.customTimeText]}>
              ⏱️ Custom Time
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={[globalStyles.buttonText, styles.submitText]}>
              🌿 Record Time Outside
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Custom Time Modal */}
      <Modal
        visible={showCustomTime}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCustomTime(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[globalStyles.card, styles.modalContent]}>
            <Text style={styles.modalTitle}>Add Custom Time Range</Text>
            
            <View style={styles.customTimeInputs}>
              <View style={styles.timeInputGroup}>
                <Text style={styles.modalTimeLabel}>Start Time (HH:MM)</Text>
                <TextInput
                  style={styles.timeInput}
                  value={customStartTime}
                  onChangeText={setCustomStartTime}
                  placeholder="14:30"
                  placeholderTextColor={Colors.textLight}
                  keyboardType="default"
                />
              </View>
              
              <View style={styles.timeInputGroup}>
                <Text style={styles.modalTimeLabel}>End Time (HH:MM)</Text>
                <TextInput
                  style={styles.timeInput}
                  value={customEndTime}
                  onChangeText={setCustomEndTime}
                  placeholder="16:45"
                  placeholderTextColor={Colors.textLight}
                  keyboardType="default"
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.button, globalStyles.secondaryButton, styles.modalCancelButton]}
                onPress={() => setShowCustomTime(false)}
              >
                <Text style={globalStyles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[globalStyles.button, styles.modalAddButton]}
                onPress={addCustomTimeRange}
              >
                <Text style={globalStyles.buttonText}>Add Range</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    ...globalStyles.input,
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

export default TimeTracker;