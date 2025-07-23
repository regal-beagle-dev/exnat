import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { defaultTimeRangesStyles } from '../../styles/DefaultTimeRangesStyles';
import { HourPicker } from './forms';
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
      if (hour === 24) return '24:00';
      return `${hour.toString().padStart(2, '0')}:00`;
    }
    
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour === 24) return '12:00 AM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  const getValidTimeRange = () => {
    if (timePeriod === 'AM') {
      return { min: 0, max: 12 };
    } else if (timePeriod === 'PM') {
      return { min: 12, max: 24 };
    }
    return { min: 0, max: 24 };
  };

  const constrainHourToTimePeriod = (hour: number): number => {
    const { min, max } = getValidTimeRange();
    return Math.max(min, Math.min(max, hour));
  };

  const handleStartHourChange = (hour: number) => {
    const startHour = constrainHourToTimePeriod(hour);
    const { min, max } = getValidTimeRange();
    
    let newRange = { ...range, start: startHour };
    
    if (startHour > range.end) {
      newRange.end = Math.min(startHour + 1, max);
    }
    
    if (newRange.end < min) {
      newRange.end = min;
    }
    if (newRange.end > max) {
      newRange.end = max;
    }
    
    onRangeChange(newRange);
  };

  const handleEndHourChange = (hour: number) => {
    const endHour = constrainHourToTimePeriod(hour);
    const { min, max } = getValidTimeRange();
    
    let newRange = { ...range, end: endHour };
    
    if (endHour < range.start) {
      newRange.start = Math.max(endHour - 1, min);
    }
    
    if (newRange.start < min) {
      newRange.start = min;
    }
    if (newRange.start > max) {
      newRange.start = max;
    }
    
    onRangeChange(newRange);
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

      <HourPicker
        isVisible={showStartPicker}
        onClose={() => setShowStartPicker(false)}
        onConfirm={handleStartHourChange}
        initialHour={range.start}
        useMilitaryTime={useMilitaryTime}
        minimumHour={timePeriod ? getValidTimeRange().min : 0}
        maximumHour={timePeriod ? getValidTimeRange().max : 24}
        title="Select Start Hour"
      />

      <HourPicker
        isVisible={showEndPicker}
        onClose={() => setShowEndPicker(false)}
        onConfirm={handleEndHourChange}
        initialHour={range.end}
        useMilitaryTime={useMilitaryTime}
        minimumHour={timePeriod ? getValidTimeRange().min : 0}
        maximumHour={timePeriod ? getValidTimeRange().max : 24}
        title="Select End Hour"
      />
    </View>
  );
};

export default TimeRangePicker;
