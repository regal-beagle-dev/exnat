import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Theme';
import { headerStyles } from '../../../styles/HeaderStyles';
import { HeaderProps } from './props';

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onBack, 
  backgroundColor = Colors.primary,
  subtitle 
}) => {
  return (
    <View style={[headerStyles.header, { backgroundColor }]}>
      <TouchableOpacity 
        onPress={onBack}
        style={headerStyles.backButton}
      >
        <Text style={headerStyles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <View style={headerStyles.headerContent}>
        <Text style={headerStyles.title}>{title}</Text>
        {subtitle && (
          <Text style={headerStyles.subtitle}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
};

export default Header;
