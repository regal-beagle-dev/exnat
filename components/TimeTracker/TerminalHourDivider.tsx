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
      if (hour === 24) return '24:00';
      return `${hour.toString().padStart(2, '0')}:00`;
    }
    
    if (hour === 12) return '12 PM';
    if (hour === 0) return '12 AM';
    if (hour === 24) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  return (
    <View style={timeTrackerStyles.terminalDividerContainer}>
      <View style={timeTrackerStyles.terminalHourDivider} />
      <View style={timeTrackerStyles.terminalHourLabel}>
        <Text style={timeTrackerStyles.terminalHourTextInverted}>
          {formatHour(hour)}
        </Text>
      </View>
    </View>
  );
};

export default TerminalHourDivider;
