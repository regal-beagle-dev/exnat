import React from 'react';
import { Text, View } from 'react-native';
import { timeTrackerStyles } from '../../styles/TimeTrackerStyles';

interface TerminalHourDividerProps {
  hour: number;
  useMilitaryTime?: boolean;
}

const TerminalHourDivider: React.FC<TerminalHourDividerProps> = ({
  hour,
  useMilitaryTime = false,
}) => {
  const formatHour = (hour: number): string => {
    if (useMilitaryTime) {
      return hour.toString().padStart(2, '0');
    }
    
    if (hour === 12) return 'noon';
    if (hour === 0) return '12';
    if (hour < 12) return hour.toString();
    return (hour - 12).toString();
  };

  return (
    <View style={timeTrackerStyles.terminalDividerContainer}>
      <View style={timeTrackerStyles.hourDivider} />
      <View style={timeTrackerStyles.terminalHourLabel}>
        <Text style={timeTrackerStyles.terminalHourText}>
          {formatHour(hour)}
        </Text>
      </View>
    </View>
  );
};

export default TerminalHourDivider;
