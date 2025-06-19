import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, globalStyles } from '../constants/Theme';
import { useTimeTracker, type TimeSlot } from '../hooks/useTimeTracker';
import { timeTrackerStyles } from '../styles/TimeTrackerStyles';

interface TimeTrackerProps {
  isYesterday?: boolean;
  onClose: () => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ isYesterday = false, onClose }) => {
  const {
    selectedRanges,
    isSelecting,
    selectionStart,
    formatTime,
    formatTimeRange,
    calculateTotalTime,
    updateSelectionPreview,
    startSelection,
    completeSelection,
    cancelSelection,
    isTimeInRange,
    addCustomTimeRange,
    removeRange,
    getFilteredTimeSlots,
  } = useTimeTracker();

  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customStartTime, setCustomStartTime] = useState('');
  const [customEndTime, setCustomEndTime] = useState('');
  const [timeMode, setTimeMode] = useState<'AM' | 'PM'>('AM');
  const [lastPressTime, setLastPressTime] = useState(0);

  const handleSlotPress = useCallback(async (time: number) => {
    // Debounce rapid successive touches
    const now = Date.now();
    if (now - lastPressTime < 300) { // 300ms debounce
      return;
    }
    setLastPressTime(now);

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!isSelecting) {
      if (__DEV__) {
        console.log('Starting selection at:', formatTime(time));
      }
      startSelection(time);
    } else {
      if (__DEV__) {
        console.log('Completing selection from:', formatTime(selectionStart!), 'to:', formatTime(time));
      }
      completeSelection(time);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [isSelecting, selectionStart, startSelection, completeSelection, formatTime, lastPressTime]);

  const handleRemoveRange = async (index: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    removeRange(index);
  };

  const handleAddCustomTimeRange = async () => {
    const result = addCustomTimeRange(customStartTime, customEndTime);
    
    if (!result.success) {
      Alert.alert('Invalid Time', result.error);
      return;
    }
    
    setCustomStartTime('');
    setCustomEndTime('');
    setShowCustomTime(false);
    
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleCancelSelection = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    cancelSelection();
  };

  const handleSubmit = async () => {
    if (selectedRanges.length === 0) {
      Alert.alert('No Time Selected', 'Please select at least one time range to track your outdoor time.');
      return;
    }

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    const { hours, minutes } = calculateTotalTime();
    
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

  const renderTimeSlot = (slot: TimeSlot, index: number) => {
    const isInRange = isTimeInRange(slot.time);
    const isCurrentlySelected = slot.isSelected;
    const isFirstIntervalOfHour = Math.abs((slot.time * 3) % 3) < 0.001; // More robust floating point comparison
    
    return (
      <View key={slot.time}>
        {/* Hour divider line */}
        {isFirstIntervalOfHour && index > 0 && (
          <View style={timeTrackerStyles.hourDivider} />
        )}
        
        <TouchableOpacity
          style={[
            timeTrackerStyles.calendarInterval,
            isInRange && timeTrackerStyles.calendarIntervalInRange,
            isCurrentlySelected && timeTrackerStyles.calendarIntervalSelected,
          ]}
          onPress={() => handleSlotPress(slot.time)}
          onPressIn={() => {
            // Only update preview if we're in the middle of a selection
            if (isSelecting) {
              updateSelectionPreview(slot.time);
            }
          }}
          activeOpacity={0.7}
        >
          <View style={timeTrackerStyles.timeLabel}>
            <Text style={[
              timeTrackerStyles.timeText,
              (isInRange || isCurrentlySelected) && timeTrackerStyles.timeTextActive,
            ]}>
              {formatTime(slot.time)}
            </Text>
          </View>
          <View style={[
            timeTrackerStyles.intervalContent,
            isInRange && timeTrackerStyles.intervalContentInRange,
            isCurrentlySelected && timeTrackerStyles.intervalContentSelected,
          ]}>
            {(isInRange || isCurrentlySelected) && (
              <Text style={timeTrackerStyles.selectedIndicator}>🌿</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={timeTrackerStyles.container}
    >
      <ScrollView contentContainerStyle={timeTrackerStyles.scrollContent}>
        <View style={timeTrackerStyles.header}>
          <TouchableOpacity style={timeTrackerStyles.backButton} onPress={onClose}>
            <Text style={timeTrackerStyles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <View style={timeTrackerStyles.headerContent}>
            <Text style={timeTrackerStyles.title}>Track Your Time Outside</Text>
            <Text style={timeTrackerStyles.date}>{getCurrentDate()}</Text>
          </View>
        </View>

        <View style={[globalStyles.card, timeTrackerStyles.instructionCard]}>
          <Text style={timeTrackerStyles.instructionTitle}>How to track your time:</Text>
          <Text style={timeTrackerStyles.instructionText}>
            • Tap a start time and then an end time{'\n'}
            • Use &quot;Custom Time&quot; for precise timing{'\n'}
          </Text>
        </View>

        <View style={[globalStyles.card, timeTrackerStyles.timeGrid]}>
          <Text style={timeTrackerStyles.gridTitle}>Select Hours (24-hour format)</Text>
          
          {/* AM/PM Toggle Tabs */}
          <View style={timeTrackerStyles.timeModeToggle}>
            <TouchableOpacity
              style={[
                timeTrackerStyles.timeModeTab,
                timeMode === 'AM' && timeTrackerStyles.timeModeTabActive
              ]}
              onPress={() => setTimeMode('AM')}
            >
              <Text style={[
                timeTrackerStyles.timeModeTabText,
                timeMode === 'AM' && timeTrackerStyles.timeModeTabTextActive
              ]}>
                AM
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                timeTrackerStyles.timeModeTab,
                timeMode === 'PM' && timeTrackerStyles.timeModeTabActive
              ]}
              onPress={() => setTimeMode('PM')}
            >
              <Text style={[
                timeTrackerStyles.timeModeTabText,
                timeMode === 'PM' && timeTrackerStyles.timeModeTabTextActive
              ]}>
                PM
              </Text>
            </TouchableOpacity>
          </View>
          
          {isSelecting && (
            <View style={timeTrackerStyles.selectionControls}>
              <Text style={timeTrackerStyles.selectionHint}>
                Now tap the end time to complete your selection
              </Text>
              <TouchableOpacity
                style={timeTrackerStyles.cancelSelectionButton}
                onPress={handleCancelSelection}
              >
                <Text style={timeTrackerStyles.cancelSelectionText}>Cancel Selection</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <View style={timeTrackerStyles.calendarContainer}>
            {getFilteredTimeSlots(timeMode).map((slot, index) => renderTimeSlot(slot, index))}
          </View>
        </View>

        {selectedRanges.length > 0 && (
          <View style={[globalStyles.card, timeTrackerStyles.selectedRanges]}>
            <Text style={timeTrackerStyles.rangesTitle}>Selected Time Ranges:</Text>
            {selectedRanges.map((range, index) => (
              <View key={index} style={timeTrackerStyles.rangeItem}>
                <Text style={timeTrackerStyles.rangeText}>
                  {formatTimeRange(range.start, range.end)}
                </Text>
                <TouchableOpacity
                  style={timeTrackerStyles.removeRange}
                  onPress={() => handleRemoveRange(index)}
                >
                  <Text style={timeTrackerStyles.removeRangeText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={timeTrackerStyles.actionButtons}>
          <TouchableOpacity
            style={[globalStyles.button, timeTrackerStyles.customTimeButton]}
            onPress={() => setShowCustomTime(true)}
          >
            <Text style={[globalStyles.buttonText, timeTrackerStyles.customTimeText]}>
              ⏱️ Custom Time
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.button, timeTrackerStyles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={[globalStyles.buttonText, timeTrackerStyles.submitText]}>
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
        <View style={timeTrackerStyles.modalOverlay}>
          <View style={[globalStyles.card, timeTrackerStyles.modalContent]}>
            <Text style={timeTrackerStyles.modalTitle}>Add Custom Time Range</Text>
            
            <View style={timeTrackerStyles.customTimeInputs}>
              <View style={timeTrackerStyles.timeInputGroup}>
                <Text style={timeTrackerStyles.modalTimeLabel}>Start Time (HH:MM)</Text>
                <TextInput
                  style={[globalStyles.input, timeTrackerStyles.timeInput]}
                  value={customStartTime}
                  onChangeText={setCustomStartTime}
                  placeholder="14:30"
                  placeholderTextColor={Colors.textLight}
                  keyboardType="default"
                />
              </View>
              
              <View style={timeTrackerStyles.timeInputGroup}>
                <Text style={timeTrackerStyles.modalTimeLabel}>End Time (HH:MM)</Text>
                <TextInput
                  style={[globalStyles.input, timeTrackerStyles.timeInput]}
                  value={customEndTime}
                  onChangeText={setCustomEndTime}
                  placeholder="16:45"
                  placeholderTextColor={Colors.textLight}
                  keyboardType="default"
                />
              </View>
            </View>

            <View style={timeTrackerStyles.modalButtons}>
              <TouchableOpacity
                style={[globalStyles.button, globalStyles.secondaryButton, timeTrackerStyles.modalCancelButton]}
                onPress={() => setShowCustomTime(false)}
              >
                <Text style={globalStyles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[globalStyles.button, timeTrackerStyles.modalAddButton]}
                onPress={handleAddCustomTimeRange}
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

export default TimeTracker;