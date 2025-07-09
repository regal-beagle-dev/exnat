import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { timeTrackerStyles } from '../../styles/TimeTrackerStyles';
import { TimeTrackerHeaderProps } from './props';

const TimeTrackerHeader: React.FC<TimeTrackerHeaderProps> = ({
  title,
  date,
  onBack,
}) => {
  return (
    <View style={timeTrackerStyles.header}>
      <TouchableOpacity 
        style={timeTrackerStyles.backButton} 
        onPress={onBack}
        testID="back-button"
      >
        <Text style={timeTrackerStyles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <View style={timeTrackerStyles.headerContent}>
        <Text style={timeTrackerStyles.title}>{title}</Text>
        <Text style={timeTrackerStyles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default TimeTrackerHeader;
