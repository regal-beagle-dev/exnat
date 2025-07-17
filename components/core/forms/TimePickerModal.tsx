import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
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
}) => {
  const [selectedTime, setSelectedTime] = React.useState(initialTime);

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      onClose();
      if (event.type === 'set' && selectedDate) {
        onConfirm(selectedDate);
      }
    } else {
      if (selectedDate) {
        setSelectedTime(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedTime);
    onClose();
  };

  if (Platform.OS === 'android') {
    return isVisible ? (
      <DateTimePicker
        value={selectedTime}
        mode={mode}
        is24Hour={useMilitaryTime}
        onChange={handleTimeChange}
        display="default"
        minimumDate={minimumTime}
        maximumDate={maximumTime}
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
            <TouchableOpacity onPress={onClose} style={timePickerStyles.modalButton}>
              <Text style={timePickerStyles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={timePickerStyles.modalTitle}>Select Time</Text>
            <TouchableOpacity onPress={handleConfirm} style={timePickerStyles.modalButton}>
              <Text style={[timePickerStyles.modalButtonText, timePickerStyles.confirmButton]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <View style={timePickerStyles.pickerContainer}>
            <DateTimePicker
              value={selectedTime}
              mode={mode}
              is24Hour={useMilitaryTime}
              onChange={handleTimeChange}
              display="spinner"
              style={timePickerStyles.picker}
              minimumDate={minimumTime}
              maximumDate={maximumTime}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimePickerModal;
