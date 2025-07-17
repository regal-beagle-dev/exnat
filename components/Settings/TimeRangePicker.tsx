import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { defaultTimeRangesStyles } from '../../styles/DefaultTimeRangesStyles';
import TimePickerModal from '../core/forms/TimePickerModal';
import { TimeRange } from '../TimeTracker/interfaces';

interface TimeRangePickerProps {
  range: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  useMilitaryTime: boolean;
  label: string;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  range,
  onRangeChange,
  useMilitaryTime,
  label,
}) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatTime = (hour: number): string => {
    if (useMilitaryTime) {
      return `${hour.toString().padStart(2, '0')}:00`;
    }
    
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  const createTimeFromHour = (hour: number): Date => {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    return date;
  };

  const extractHourFromTime = (time: Date): number => {
    return time.getHours();
  };

  const handleStartTimeChange = (time: Date) => {
    const startHour = extractHourFromTime(time);
    const newRange = { ...range, start: startHour };
    
    if (startHour >= range.end) {
      newRange.end = Math.min(startHour + 1, 23);
    }
    
    onRangeChange(newRange);
    setShowStartPicker(false);
  };

  const handleEndTimeChange = (time: Date) => {
    const endHour = extractHourFromTime(time);
    const newRange = { ...range, end: endHour };
    
    if (endHour <= range.start) {
      newRange.start = Math.max(endHour - 1, 0);
    }
    
    onRangeChange(newRange);
    setShowEndPicker(false);
  };

  return (
    <View style={defaultTimeRangesStyles.rangeContainer}>
      <Text style={defaultTimeRangesStyles.rangeLabel}>{label}</Text>
      
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity 
          style={[defaultTimeRangesStyles.rangeButton, { flex: 1 }]}
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={defaultTimeRangesStyles.rangeText}>
            Start: {formatTime(range.start)}
          </Text>
          <Text style={defaultTimeRangesStyles.editIcon}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[defaultTimeRangesStyles.rangeButton, { flex: 1 }]}
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={defaultTimeRangesStyles.rangeText}>
            End: {formatTime(range.end)}
          </Text>
          <Text style={defaultTimeRangesStyles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <TimePickerModal
        isVisible={showStartPicker}
        onClose={() => setShowStartPicker(false)}
        onConfirm={handleStartTimeChange}
        initialTime={createTimeFromHour(range.start)}
        useMilitaryTime={useMilitaryTime}
      />

      <TimePickerModal
        isVisible={showEndPicker}
        onClose={() => setShowEndPicker(false)}
        onConfirm={handleEndTimeChange}
        initialTime={createTimeFromHour(range.end)}
        useMilitaryTime={useMilitaryTime}
      />
    </View>
  );
};

export default TimeRangePicker;
