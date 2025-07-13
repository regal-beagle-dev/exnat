import React from 'react';
import { Header } from '../core/header';
import { SettingsHeaderProps } from './props';

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onClose, title = 'Settings' }) => {
  return (
    <Header title={title} onBack={onClose} />
  );
};

export default SettingsHeader;
