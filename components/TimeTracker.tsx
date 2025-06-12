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
import { timeTrackerStyles } from '../styles/TimeTrackerStyles';

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
          <View style={timeTrackerStyles.hourDivider} />
        )}
        
        <TouchableOpacity
          style={[
            timeTrackerStyles.calendarInterval,
            isInRange && timeTrackerStyles.calendarIntervalInRange,
            isCurrentlySelected && timeTrackerStyles.calendarIntervalSelected,
          ]}
          onPress={() => handleSlotPress(slot.time)}
          onPressIn={() => updateSelectionPreview(slot.time)}
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
                AM (00:00 - 11:40)
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
                PM (12:00 - 23:40)
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
                onPress={cancelSelection}
              >
                <Text style={timeTrackerStyles.cancelSelectionText}>Cancel Selection</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <View style={timeTrackerStyles.calendarContainer}>
            {getFilteredTimeSlots().map((slot, index) => renderTimeSlot(slot, index))}
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
                  onPress={() => removeRange(index)}
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

export default TimeTracker;