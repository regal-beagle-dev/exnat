import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from '../../constants/Theme';
import { timeTrackerStyles } from '../../styles/TimeTrackerStyles';

const InstructionCard: React.FC = () => {
  return (
    <View style={[globalStyles.card, timeTrackerStyles.instructionCard]}>
      <Text style={timeTrackerStyles.instructionTitle}>How to track your time:</Text>
      <Text style={timeTrackerStyles.instructionText}>
        • Tap a start time and then an end time{'\n'}
        • Use &quot;Custom Time&quot; for precise timing
      </Text>
    </View>
  );
};

export default InstructionCard;
