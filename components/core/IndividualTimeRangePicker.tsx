import React, { useEffect, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { DefaultTimeRanges } from '../../services/TimeRangeService';
import { individualTimeRangePickerStyles } from '../../styles/IndividualTimeRangePickerStyles';
import { FormActions } from './forms';
import TimeRangePicker from './TimeRangePicker';
import { IndividualTimeRangePickerProps } from './interfaces';

const IndividualTimeRangePicker: React.FC<IndividualTimeRangePickerProps> = ({
  isVisible,
  onClose,
  onApply,
  initialRanges,
  useMilitaryTime = true,
  date = new Date(),
}) => {
  const [ranges, setRanges] = useState<DefaultTimeRanges>({
    morning: { start: 6, end: 12 },
    evening: { start: 12, end: 22 },
  });

  useEffect(() => {
    if (initialRanges) {
      setRanges(initialRanges);
    }
  }, [initialRanges]);

  const handleMorningRangeChange = (range: { start: number; end: number }) => {
    setRanges(prev => ({
      ...prev,
      morning: range,
    }));
  };

  const handleEveningRangeChange = (range: { start: number; end: number }) => {
    setRanges(prev => ({
      ...prev,
      evening: range,
    }));
  };

  const handleApply = () => {
    onApply(ranges);
    onClose();
  };

  const getFormattedDate = (): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={individualTimeRangePickerStyles.modalOverlay}>
        <View style={individualTimeRangePickerStyles.modalContent}>
          <View style={individualTimeRangePickerStyles.modalHeader}>
            <Text style={individualTimeRangePickerStyles.modalTitle}>Customize Day Schedule</Text>
          </View>

          <Text style={individualTimeRangePickerStyles.dateText}>
            {getFormattedDate()}
          </Text>

          <View style={individualTimeRangePickerStyles.rangeSection}>
            <TimeRangePicker
              range={ranges.morning}
              onRangeChange={handleMorningRangeChange}
              useMilitaryTime={useMilitaryTime}
              label="🌅 AM Range"
              timePeriod="AM"
            />
          </View>

          <View style={individualTimeRangePickerStyles.rangeSection}>
            <TimeRangePicker
              range={ranges.evening}
              onRangeChange={handleEveningRangeChange}
              useMilitaryTime={useMilitaryTime}
              label="🌆 PM Range"
              timePeriod="PM"
            />
          </View>

          <FormActions
            onSubmit={handleApply}
            onCancel={onClose}
            submitButtonText="Apply"
            cancelButtonText="Cancel"
            showCancelButton={true}
            isValid={true}
          />
        </View>
      </View>
    </Modal>
  );
};

export default IndividualTimeRangePicker;
