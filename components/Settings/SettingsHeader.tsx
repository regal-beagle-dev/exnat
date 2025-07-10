import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { settingsHeaderStyles } from '../../styles/SettingsHeaderStyles';
import { SettingsHeaderProps } from './props';

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onClose, title = 'Settings' }) => {
  return (
    <View style={settingsHeaderStyles.header}>
      <TouchableOpacity 
        onPress={onClose}
        style={settingsHeaderStyles.backButton}
      >
        <Text style={settingsHeaderStyles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <View style={settingsHeaderStyles.headerContent}>
        <Text style={settingsHeaderStyles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default SettingsHeader;
