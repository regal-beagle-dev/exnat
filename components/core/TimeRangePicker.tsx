import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { defaultTimeRangesStyles } from '../../styles/DefaultTimeRangesStyles';
import TimePickerModal from './forms/TimePickerModal';
import { TimeRangePickerProps } from './interfaces';

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  range,
  onRangeChange,
  useMilitaryTime,
  label,
  timePeriod,
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

  const createMinMaxTimes = () => {
    const { min, max } = getValidTimeRange();
    const today = new Date();
    
    const minTime = new Date(today);
    minTime.setHours(min, 0, 0, 0);
    
    const maxTime = new Date(today);
    maxTime.setHours(max, 59, 59, 999);
    
    return { minTime, maxTime };
  };

  const extractHourFromTime = (time: Date): number => {
    return time.getHours();
  };

  const getValidTimeRange = () => {
    if (timePeriod === 'AM') {
      return { min: 0, max: 11 };
    } else if (timePeriod === 'PM') {
      return { min: 12, max: 23 };
    }
    return { min: 0, max: 23 };
  };

  const constrainHourToTimePeriod = (hour: number): number => {
    const { min, max } = getValidTimeRange();
    return Math.max(min, Math.min(max, hour));
  };

  const handleStartTimeChange = (time: Date) => {
    const rawStartHour = extractHourFromTime(time);
    const startHour = constrainHourToTimePeriod(rawStartHour);
    const { min, max } = getValidTimeRange();
    
    let newRange = { ...range, start: startHour };
    
    if (startHour >= range.end) {
      newRange.end = Math.min(startHour + 1, max);
    }
    
    if (newRange.end < min) {
      newRange.end = min;
    }
    if (newRange.end > max) {
      newRange.end = max;
    }
    
    onRangeChange(newRange);
    setShowStartPicker(false);
  };

  const handleEndTimeChange = (time: Date) => {
    const rawEndHour = extractHourFromTime(time);
    const endHour = constrainHourToTimePeriod(rawEndHour);
    const { min, max } = getValidTimeRange();
    
    let newRange = { ...range, end: endHour };
    
    if (endHour <= range.start) {
      newRange.start = Math.max(endHour - 1, min);
    }
    
    if (newRange.start < min) {
      newRange.start = min;
    }
    if (newRange.start > max) {
      newRange.start = max;
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
        </TouchableOpacity>

        <TouchableOpacity 
          style={[defaultTimeRangesStyles.rangeButton, { flex: 1 }]}
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={defaultTimeRangesStyles.rangeText}>
            End: {formatTime(range.end)}
          </Text>
        </TouchableOpacity>
      </View>

      <TimePickerModal
        isVisible={showStartPicker}
        onClose={() => setShowStartPicker(false)}
        onConfirm={handleStartTimeChange}
        initialTime={createTimeFromHour(range.start)}
        useMilitaryTime={useMilitaryTime}
        minimumTime={timePeriod ? createMinMaxTimes().minTime : undefined}
        maximumTime={timePeriod ? createMinMaxTimes().maxTime : undefined}
      />

      <TimePickerModal
        isVisible={showEndPicker}
        onClose={() => setShowEndPicker(false)}
        onConfirm={handleEndTimeChange}
        initialTime={createTimeFromHour(range.end)}
        useMilitaryTime={useMilitaryTime}
        minimumTime={timePeriod ? createMinMaxTimes().minTime : undefined}
        maximumTime={timePeriod ? createMinMaxTimes().maxTime : undefined}
      />
    </View>
  );
};

export default TimeRangePicker;
