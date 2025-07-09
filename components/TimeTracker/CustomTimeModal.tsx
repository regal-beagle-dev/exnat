import React from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, globalStyles } from '../../constants/Theme';
import { timeTrackerStyles } from '../../styles/TimeTrackerStyles';
import { CustomTimeModalProps } from './props';

const CustomTimeModal: React.FC<CustomTimeModalProps> = ({
  visible,
  customStartTime,
  customEndTime,
  onCustomStartTimeChange,
  onCustomEndTimeChange,
  onClose,
  onAdd,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={timeTrackerStyles.modalOverlay}>
        <View style={[globalStyles.card, timeTrackerStyles.modalContent]}>
          <Text style={timeTrackerStyles.modalTitle}>Add Custom Time Range</Text>
          
          <View style={timeTrackerStyles.customTimeInputs}>
            <View style={timeTrackerStyles.timeInputGroup}>
              <Text style={timeTrackerStyles.modalTimeLabel}>Start Time (HH:MM)</Text>
              <TextInput
                style={[globalStyles.input, timeTrackerStyles.timeInput]}
                value={customStartTime}
                onChangeText={onCustomStartTimeChange}
                placeholder="14:30"
                placeholderTextColor={Colors.textLight}
                keyboardType="default"
                testID="custom-start-time-input"
              />
            </View>
            
            <View style={timeTrackerStyles.timeInputGroup}>
              <Text style={timeTrackerStyles.modalTimeLabel}>End Time (HH:MM)</Text>
              <TextInput
                style={[globalStyles.input, timeTrackerStyles.timeInput]}
                value={customEndTime}
                onChangeText={onCustomEndTimeChange}
                placeholder="16:45"
                placeholderTextColor={Colors.textLight}
                keyboardType="default"
                testID="custom-end-time-input"
              />
            </View>
          </View>

          <View style={timeTrackerStyles.modalButtons}>
            <TouchableOpacity
              style={[globalStyles.button, globalStyles.secondaryButton, timeTrackerStyles.modalCancelButton]}
              onPress={onClose}
              testID="modal-cancel-button"
            >
              <Text style={globalStyles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[globalStyles.button, timeTrackerStyles.modalAddButton]}
              onPress={onAdd}
              testID="modal-add-button"
            >
              <Text style={globalStyles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomTimeModal;
