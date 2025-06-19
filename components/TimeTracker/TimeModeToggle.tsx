import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { timeTrackerStyles } from '../../styles/TimeTrackerStyles';

interface TimeModeToggleProps {
  timeMode: 'AM' | 'PM';
  onToggle: (mode: 'AM' | 'PM') => void;
}

const TimeModeToggle: React.FC<TimeModeToggleProps> = ({
  timeMode,
  onToggle,
}) => {
  return (
    <View style={timeTrackerStyles.timeModeToggle}>
      <TouchableOpacity
        style={[
          timeTrackerStyles.timeModeTab,
          timeMode === 'AM' && timeTrackerStyles.timeModeTabActive
        ]}
        onPress={() => onToggle('AM')}
        testID="am-toggle"
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
        onPress={() => onToggle('PM')}
        testID="pm-toggle"
      >
        <Text style={[
          timeTrackerStyles.timeModeTabText,
          timeMode === 'PM' && timeTrackerStyles.timeModeTabTextActive
        ]}>
          PM
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimeModeToggle;
