import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, globalStyles, Spacing } from '../constants/Theme';
import { useTimeTracker, type TimeSlot as TimeSlotType } from '../hooks/useTimeTracker';
import { serviceProvider } from '../services';
import { DefaultTimeRanges } from '../services/TimeRangeService';
import { timeTrackerStyles } from '../styles/TimeTrackerStyles';
import { IndividualTimeRangePicker } from './core';
import {
  CustomTimeModal,
  InstructionCard,
  SelectedRangesList,
  TimeModeToggle,
  TimeSlot,
  TimeTrackerHeader,
} from './TimeTracker/';
import { TimeTrackerProps } from './TimeTracker/props';

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
    clearAllRanges,
  } = useTimeTracker();

  const [showCustomTime, setShowCustomTime] = useState(false);
  const [showDayRangeForm, setShowDayRangeForm] = useState(false);
  const [customStartTime, setCustomStartTime] = useState('');
  const [customEndTime, setCustomEndTime] = useState('');
  const [timeMode, setTimeMode] = useState<'AM' | 'PM'>('AM');
  const [lastPressTime, setLastPressTime] = useState(0);
  const [defaultTimeRanges, setDefaultTimeRanges] = useState<DefaultTimeRanges | null>(null);

  const timeRangeService = serviceProvider.getTimeRangeService();

  useEffect(() => {
    const loadDefaultTimeRanges = async () => {
      try {
        const ranges = await timeRangeService.getDefaultTimeRanges();
        setDefaultTimeRanges(ranges);
      } catch (error) {
        console.error('Failed to load default time ranges:', error);
      }
    };

    loadDefaultTimeRanges();
  }, [timeRangeService]);

  const handleApplyDefaultRanges = useCallback(async () => {
    if (!defaultTimeRanges) return;

    try {
      clearAllRanges();
      
      const morningResult = addCustomTimeRange(
        `${defaultTimeRanges.morning.start.toString().padStart(2, '0')}:00`,
        `${defaultTimeRanges.morning.end.toString().padStart(2, '0')}:00`
      );
      
      const eveningResult = addCustomTimeRange(
        `${defaultTimeRanges.evening.start.toString().padStart(2, '0')}:00`,
        `${defaultTimeRanges.evening.end.toString().padStart(2, '0')}:00`
      );

      if (!morningResult.success || !eveningResult.success) {
        Alert.alert('Error', 'Failed to apply default time ranges');
        return;
      }

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('Failed to apply default ranges:', error);
      Alert.alert('Error', 'Failed to apply default time ranges');
    }
  }, [defaultTimeRanges, clearAllRanges, addCustomTimeRange]);

  const handleApplyCustomDayRanges = useCallback(async (ranges: DefaultTimeRanges) => {
    try {
      clearAllRanges();
      
      const morningResult = addCustomTimeRange(
        `${ranges.morning.start.toString().padStart(2, '0')}:00`,
        `${ranges.morning.end.toString().padStart(2, '0')}:00`
      );
      
      const eveningResult = addCustomTimeRange(
        `${ranges.evening.start.toString().padStart(2, '0')}:00`,
        `${ranges.evening.end.toString().padStart(2, '0')}:00`
      );

      if (!morningResult.success || !eveningResult.success) {
        Alert.alert('Error', 'Failed to apply custom time ranges');
        return;
      }

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('Failed to apply custom day ranges:', error);
      Alert.alert('Error', 'Failed to apply custom time ranges');
    }
  }, [clearAllRanges, addCustomTimeRange]);

  const handleSlotPress = useCallback(async (time: number) => {
    // Debounce rapid successive touches
    const now = Date.now();
    if (now - lastPressTime < 300) {
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
    return date;
  };

  const getCurrentDateString = () => {
    return getCurrentDate().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderTimeSlot = (slot: TimeSlotType, index: number) => {
    const isInRange = isTimeInRange(slot.time);
    const isCurrentlySelected = slot.isSelected;
    const isFirstIntervalOfHour = Math.abs((slot.time * 3) % 3) < 0.001; // More robust floating point comparison
    
    return (
      <TimeSlot
        key={slot.time}
        time={slot.time}
        isInRange={isInRange}
        isSelected={isCurrentlySelected}
        isFirstIntervalOfHour={isFirstIntervalOfHour}
        showHourDivider={index > 0}
        formatTime={formatTime}
        onPress={handleSlotPress}
        onPressIn={isSelecting ? updateSelectionPreview : undefined}
      />
    );
  };

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={timeTrackerStyles.container}
    >
      <ScrollView contentContainerStyle={timeTrackerStyles.scrollContent}>
        <TimeTrackerHeader
          title="Track Your Time Outside"
          date={getCurrentDateString()}
          onBack={onClose}
        />

        <InstructionCard />

        {defaultTimeRanges && (
          <View style={{ paddingHorizontal: Spacing.lg, marginVertical: Spacing.sm }}>
            <TouchableOpacity
              style={[globalStyles.button, timeTrackerStyles.customTimeButton]}
              onPress={() => setShowDayRangeForm(true)}
            >
              <Text style={[globalStyles.buttonText, timeTrackerStyles.customTimeText]}>
                📅 Alter AM/PM Ranges
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[globalStyles.card, timeTrackerStyles.timeGrid]}>
          <Text style={timeTrackerStyles.gridTitle}>Select Hours (24-hour format)</Text>
          {isSelecting && (
            <Text style={timeTrackerStyles.selectionHint}>
              Now tap the end time to complete your selection
            </Text>
          )}
          
          <TimeModeToggle
            timeMode={timeMode}
            onToggle={setTimeMode}
          />
          
          <View style={timeTrackerStyles.calendarContainer}>
            {getFilteredTimeSlots(timeMode).map((slot, index) => renderTimeSlot(slot, index))}
          </View>
        </View>

        <SelectedRangesList
          selectedRanges={selectedRanges}
          formatTimeRange={formatTimeRange}
          onRemoveRange={handleRemoveRange}
        />

        <View style={timeTrackerStyles.actionButtons}>
          <TouchableOpacity
            style={[globalStyles.button, timeTrackerStyles.customTimeButton]}
            onPress={() => setShowCustomTime(true)}
          >
            <Text style={[globalStyles.buttonText, timeTrackerStyles.customTimeText]}>
              ⏱️ Enter a Custom Time
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

      {/* Sticky Cancel Button - only show when selecting */}
      {isSelecting && (
        <View style={timeTrackerStyles.stickyCancelContainer}>
          <TouchableOpacity
            style={timeTrackerStyles.stickyCancelButton}
            onPress={handleCancelSelection}
          >
            <Text style={timeTrackerStyles.stickyCancelText}>Cancel Selection</Text>
          </TouchableOpacity>
        </View>
      )}

      <CustomTimeModal
        visible={showCustomTime}
        customStartTime={customStartTime}
        customEndTime={customEndTime}
        onCustomStartTimeChange={setCustomStartTime}
        onCustomEndTimeChange={setCustomEndTime}
        onClose={() => setShowCustomTime(false)}
        onAdd={handleAddCustomTimeRange}
      />

      <IndividualTimeRangePicker
        isVisible={showDayRangeForm}
        onClose={() => setShowDayRangeForm(false)}
        onApply={handleApplyCustomDayRanges}
        initialRanges={defaultTimeRanges || undefined}
        date={getCurrentDate()}
      />
    </LinearGradient>
  );
};

export default TimeTracker;