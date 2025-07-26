import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Modal, Platform, Text, View } from 'react-native';
import FormActions from './FormActions';
import { TimePickerModalProps } from './interfaces';
import { timePickerStyles } from './styles/TimePickerStyles';

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  initialTime = new Date(),
  mode = 'time',
  useMilitaryTime = false,
  minimumTime,
  maximumTime,
  hourOnly = false,
}) => {
  const [selectedTime, setSelectedTime] = React.useState(() => {
    const time = new Date(initialTime);
    if (hourOnly) {
      time.setMinutes(0, 0, 0);
    }
    return time;
  });

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const newTime = new Date(selectedDate);
      if (hourOnly) {
        newTime.setMinutes(0, 0, 0);
      }

      if (Platform.OS === 'android') {
        onClose();
        if (event.type === 'set') {
          onConfirm(newTime);
        }
      } else {
        setSelectedTime(newTime);
      }
    }
  };

  const handleConfirm = () => {
    const finalTime = new Date(selectedTime);
    if (hourOnly) {
      finalTime.setMinutes(0, 0, 0);
    }
    onConfirm(finalTime);
    onClose();
  };

  const getMinimumTime = () => {
    if (!minimumTime) return undefined;
    const min = new Date(minimumTime);
    if (hourOnly) {
      min.setMinutes(0, 0, 0);
    }
    return min;
  };

  const getMaximumTime = () => {
    if (!maximumTime) return undefined;
    const max = new Date(maximumTime);
    if (hourOnly) {
      max.setMinutes(59, 59, 999);
    }
    return max;
  };

  if (Platform.OS === 'android') {
    return isVisible ? (
      <DateTimePicker
        value={selectedTime}
        mode={mode}
        is24Hour={useMilitaryTime}
        onChange={handleTimeChange}
        display="default"
        minimumDate={getMinimumTime()}
        maximumDate={getMaximumTime()}
      />
    ) : null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={timePickerStyles.modalOverlay}>
        <View style={timePickerStyles.modalContent}>
          <View style={timePickerStyles.modalHeader}>
            <Text style={timePickerStyles.modalTitle}>
              {hourOnly ? 'Select Hour' : 'Select Time'}
            </Text>
          </View>
          <View style={timePickerStyles.pickerContainer}>
            <DateTimePicker
              value={selectedTime}
              mode={mode}
              is24Hour={useMilitaryTime}
              onChange={handleTimeChange}
              display="spinner"
              style={timePickerStyles.picker}
              minimumDate={getMinimumTime()}
              maximumDate={getMaximumTime()}
            />
          </View>
          {hourOnly && (
            <Text style={timePickerStyles.hourOnlyHint}>
              Minutes will be set to :00
            </Text>
          )}
          <FormActions
            onSubmit={handleConfirm}
            onCancel={onClose}
            submitButtonText="Done"
            cancelButtonText="Cancel"
            showCancelButton={true}
            isValid={true}
          />
        </View>
      </View>
    </Modal>
  );
};

export default TimePickerModal;
