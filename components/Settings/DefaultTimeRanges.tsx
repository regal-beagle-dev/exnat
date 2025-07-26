import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { serviceProvider } from '../../services';
import { defaultTimeRangesStyles } from '../../styles/DefaultTimeRangesStyles';
import TimeRangePicker from '../core/TimeRangePicker';
import { DefaultTimeRangesProps } from './props';

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
        Define which time ranges appear as options when tracking your outdoor time
      </Text>
      
      <TimeRangePicker
        range={morningRange}
        onRangeChange={handleMorningRangeChange}
        useMilitaryTime={useMilitaryTime}
        label="AM Range"
        timePeriod="AM"
      />

      <TimeRangePicker
        range={eveningRange}
        onRangeChange={handleEveningRangeChange}
        useMilitaryTime={useMilitaryTime}
        label="PM Range"
        timePeriod="PM"
      />
    </View>
  );
};

export default DefaultTimeRanges;
