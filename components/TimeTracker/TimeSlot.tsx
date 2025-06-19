import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { timeTrackerStyles } from '../../styles/TimeTrackerStyles';

interface TimeSlotProps {
  time: number;
  isInRange: boolean;
  isSelected: boolean;
  isFirstIntervalOfHour: boolean;
  showHourDivider: boolean;
  formatTime: (time: number) => string;
  onPress: (time: number) => void;
  onPressIn?: (time: number) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  time,
  isInRange,
  isSelected,
  isFirstIntervalOfHour,
  showHourDivider,
  formatTime,
  onPress,
  onPressIn,
}) => {
  return (
    <View>
      {/* Hour divider line */}
      {showHourDivider && isFirstIntervalOfHour && (
        <View style={timeTrackerStyles.hourDivider} />
      )}
      
      <TouchableOpacity
        style={[
          timeTrackerStyles.calendarInterval,
          isInRange && timeTrackerStyles.calendarIntervalInRange,
          isSelected && timeTrackerStyles.calendarIntervalSelected,
        ]}
        onPress={() => onPress(time)}
        onPressIn={() => onPressIn?.(time)}
        activeOpacity={0.7}
        testID={`time-slot-${time}`}
      >
        <View style={timeTrackerStyles.timeLabel}>
          <Text style={[
            timeTrackerStyles.timeText,
            (isInRange || isSelected) && timeTrackerStyles.timeTextActive,
          ]}>
            {formatTime(time)}
          </Text>
        </View>
        <View style={[
          timeTrackerStyles.intervalContent,
          isInRange && timeTrackerStyles.intervalContentInRange,
          isSelected && timeTrackerStyles.intervalContentSelected,
        ]}>
          {(isInRange || isSelected) && (
            <Text style={timeTrackerStyles.selectedIndicator}>🌿</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TimeSlot;
