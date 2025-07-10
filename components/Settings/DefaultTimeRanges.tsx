import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { defaultTimeRangesStyles } from '../../styles/DefaultTimeRangesStyles';
import { DefaultTimeRangesProps } from './props';

const DefaultTimeRanges: React.FC<DefaultTimeRangesProps> = ({
  morningRange,
  eveningRange,
  onMorningRangeChange,
  onEveningRangeChange,
  useMilitaryTime,
}) => {
  const formatTime = (hour: number): string => {
    if (useMilitaryTime) {
      return `${hour.toString().padStart(2, '0')}:00`;
    }
    
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  const formatRange = (start: number, end: number): string => {
    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const handleEditRange = (type: 'morning' | 'evening') => {
    Alert.alert(
      `Edit ${type === 'morning' ? 'Morning' : 'Evening'} Range`,
      'Time picker functionality would go here',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={defaultTimeRangesStyles.container}>
      <Text style={defaultTimeRangesStyles.description}>
        Set default time ranges that will be pre-selected when tracking time
      </Text>
      
      <View style={defaultTimeRangesStyles.rangeContainer}>
        <Text style={defaultTimeRangesStyles.rangeLabel}>Morning Range</Text>
        <TouchableOpacity 
          style={defaultTimeRangesStyles.rangeButton}
          onPress={() => handleEditRange('morning')}
        >
          <Text style={defaultTimeRangesStyles.rangeText}>
            {formatRange(morningRange.start, morningRange.end)}
          </Text>
          <Text style={defaultTimeRangesStyles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={defaultTimeRangesStyles.rangeContainer}>
        <Text style={defaultTimeRangesStyles.rangeLabel}>Evening Range</Text>
        <TouchableOpacity 
          style={defaultTimeRangesStyles.rangeButton}
          onPress={() => handleEditRange('evening')}
        >
          <Text style={defaultTimeRangesStyles.rangeText}>
            {formatRange(eveningRange.start, eveningRange.end)}
          </Text>
          <Text style={defaultTimeRangesStyles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DefaultTimeRanges;
