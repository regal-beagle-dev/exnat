import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Colors, globalStyles } from '../../../constants/Theme';
import { FormActionsProps } from './interfaces';
import { formStyles } from './styles/FormStyles';

const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  onCancel,
  submitButtonText,
  cancelButtonText = 'Cancel',
  submitButtonTestId,
  isLoading = false,
  showCancelButton = false,
  isValid = true,
}) => {
  return (
    <View style={formStyles.actionsContainer}>
      {showCancelButton && onCancel ? (
        <View style={formStyles.actionsRow}>
          <TouchableOpacity
            style={[
              globalStyles.button,
              globalStyles.secondaryButton,
              formStyles.actionButton,
            ]}
            onPress={onCancel}
            disabled={isLoading}
            testID="form-cancel-button"
          >
            <Text style={globalStyles.secondaryButtonText}>{cancelButtonText}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              globalStyles.button,
              formStyles.actionButton,
              (!isValid || isLoading) && { opacity: 0.6 },
            ]}
            onPress={onSubmit}
            disabled={!isValid || isLoading}
            testID={submitButtonTestId || 'form-submit-button'}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.surface} />
            ) : (
              <Text style={globalStyles.buttonText}>{submitButtonText}</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            globalStyles.button,
            (!isValid || isLoading) && { opacity: 0.6 },
          ]}
          onPress={onSubmit}
          disabled={!isValid || isLoading}
          testID={submitButtonTestId || 'form-submit-button'}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.surface} />
          ) : (
            <Text style={globalStyles.buttonText}>{submitButtonText}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormActions;
