import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from '../../constants/Theme';
import { settingsSectionStyles } from '../../styles/SettingsSectionStyles';
import { SettingsSectionProps } from './props';

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  return (
    <View style={[globalStyles.card, settingsSectionStyles.section]}>
      <Text style={settingsSectionStyles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

export default SettingsSection;
