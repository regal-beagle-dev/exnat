import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TimePickerFieldProps } from './interfaces/TimePickerTypes';
import { timePickerStyles } from './styles/TimePickerStyles';
import TimePickerModal from './TimePickerModal';

const TimePickerField: React.FC<TimePickerFieldProps> = ({
  label,
  value,
  onTimeChange,
  useMilitaryTime = false,
  placeholder = 'Select time',
  disabled = false,
  error,
  helpText,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formatTime = (date: Date): string => {
    if (useMilitaryTime) {
      return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handlePress = () => {
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    onTimeChange(selectedTime);
    setIsModalVisible(false);
  };

  const displayText = value ? formatTime(value) : placeholder;
  const hasError = Boolean(error);

  return (
    <View style={timePickerStyles.fieldContainer}>
      <Text style={timePickerStyles.fieldLabel}>{label}</Text>
      <TouchableOpacity
        style={[
          timePickerStyles.fieldButton,
          hasError && timePickerStyles.fieldButtonError,
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text
          style={[
            timePickerStyles.fieldText,
            !value && timePickerStyles.fieldPlaceholder,
          ]}
        >
          {displayText}
        </Text>
        <Text style={timePickerStyles.fieldIcon}>🕐</Text>
      </TouchableOpacity>
      
      {error && <Text style={timePickerStyles.fieldError}>{error}</Text>}
      {helpText && !error && (
        <Text style={timePickerStyles.fieldHelpText}>{helpText}</Text>
      )}

      <TimePickerModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleTimeConfirm}
        initialTime={value || new Date()}
        useMilitaryTime={useMilitaryTime}
      />
    </View>
  );
};

export default TimePickerField;
