import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FormActions from './FormActions';
import { HourPickerProps } from './interfaces';
import { hourPickerStyles } from './styles/HourPickerStyles';

const HourPicker: React.FC<HourPickerProps> = ({
  isVisible,
  onClose,
  onConfirm,
  initialHour = 12,
  useMilitaryTime = true,
  minimumHour = 0,
  maximumHour = 23,
  title = 'Select Hour',
}) => {
  const [selectedHour, setSelectedHour] = useState(initialHour);

  const formatHour = (hour: number): string => {
    if (useMilitaryTime) {
      return hour.toString().padStart(2, '0');
    }
    
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const generateHours = (): number[] => {
    const hours: number[] = [];
    for (let i = minimumHour; i <= maximumHour; i++) {
      hours.push(i);
    }
    return hours;
  };

  const isHourDisabled = (hour: number): boolean => {
    return hour < minimumHour || hour > maximumHour;
  };

  const handleHourPress = (hour: number) => {
    if (!isHourDisabled(hour)) {
      setSelectedHour(hour);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedHour);
    onClose();
  };

  const hours = generateHours();

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={hourPickerStyles.modalOverlay}>
        <View style={hourPickerStyles.modalContent}>
          <View style={hourPickerStyles.modalHeader}>
            <Text style={hourPickerStyles.modalTitle}>{title}</Text>
          </View>

          <ScrollView style={hourPickerStyles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={hourPickerStyles.hourGrid}>
              {hours.map((hour) => {
                const isSelected = hour === selectedHour;
                const isDisabled = isHourDisabled(hour);
                
                return (
                  <TouchableOpacity
                    key={hour}
                    style={[
                      hourPickerStyles.hourButton,
                      isSelected && hourPickerStyles.hourButtonSelected,
                      isDisabled && hourPickerStyles.hourButtonDisabled,
                    ]}
                    onPress={() => handleHourPress(hour)}
                    disabled={isDisabled}
                  >
                    <Text
                      style={[
                        hourPickerStyles.hourText,
                        isSelected && hourPickerStyles.hourTextSelected,
                        isDisabled && hourPickerStyles.hourTextDisabled,
                      ]}
                    >
                      {formatHour(hour)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

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

export default HourPicker;
