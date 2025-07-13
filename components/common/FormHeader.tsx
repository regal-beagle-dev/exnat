import { useRouter } from 'expo-router';
import React from 'react';
import { Header } from '../core/header';
import { FormHeaderProps } from './props';

export const FormHeader: React.FC<FormHeaderProps> = ({ title, onBack }) => {
  const router = useRouter();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return <Header title={title} onBack={handleBack} />;
};

export default FormHeader;
