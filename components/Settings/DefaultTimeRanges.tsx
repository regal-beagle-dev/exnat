import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { serviceProvider } from '../../services';
import { defaultTimeRangesStyles } from '../../styles/DefaultTimeRangesStyles';
import { DefaultTimeRangesProps } from './props';
import TimeRangePicker from './TimeRangePicker';

const DefaultTimeRanges: React.FC<DefaultTimeRangesProps> = ({
  morningRange,
  eveningRange,
  onMorningRangeChange,
  onEveningRangeChange,
  useMilitaryTime,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const timeRangeService = serviceProvider.getTimeRangeService();

  const handleMorningRangeChange = async (range: typeof morningRange) => {
    setIsUpdating(true);
    try {
      await timeRangeService.updateMorningRange(range);
      onMorningRangeChange(range);
    } catch (error) {
      console.error('Failed to update morning range:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEveningRangeChange = async (range: typeof eveningRange) => {
    setIsUpdating(true);
    try {
      await timeRangeService.updateEveningRange(range);
      onEveningRangeChange(range);
    } catch (error) {
      console.error('Failed to update evening range:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <View style={defaultTimeRangesStyles.container}>
      <Text style={defaultTimeRangesStyles.description}>
        Set default time ranges that will be pre-selected when tracking time
      </Text>
      
      <TimeRangePicker
        range={morningRange}
        onRangeChange={handleMorningRangeChange}
        useMilitaryTime={useMilitaryTime}
        label="Morning Range"
      />

      <TimeRangePicker
        range={eveningRange}
        onRangeChange={handleEveningRangeChange}
        useMilitaryTime={useMilitaryTime}
        label="Evening Range"
      />
    </View>
  );
};

export default DefaultTimeRanges;
