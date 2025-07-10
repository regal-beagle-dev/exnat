import * as Haptics from 'expo-haptics';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Theme';
import { timeFormatToggleStyles } from '../../styles/TimeFormatToggleStyles';
import { TimeFormatToggleProps } from './props';

const TimeFormatToggle: React.FC<TimeFormatToggleProps> = ({ 
  useMilitaryTime, 
  onToggle 
}) => {
  const handleToggle = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(!useMilitaryTime);
  };

  return (
    <View style={timeFormatToggleStyles.container}>
      <View style={timeFormatToggleStyles.labelContainer}>
        <Text style={timeFormatToggleStyles.label}>Time Format</Text>
        <Text style={timeFormatToggleStyles.description}>
          {useMilitaryTime ? '24-hour format (14:30)' : '12-hour format (2:30 PM)'}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          timeFormatToggleStyles.toggle,
          { backgroundColor: useMilitaryTime ? Colors.primary : Colors.surfaceSecondary }
        ]}
        onPress={handleToggle}
      >
        <View style={[
          timeFormatToggleStyles.toggleThumb,
          { transform: [{ translateX: useMilitaryTime ? 24 : 2 }] }
        ]} />
      </TouchableOpacity>
    </View>
  );
};

export default TimeFormatToggle;
