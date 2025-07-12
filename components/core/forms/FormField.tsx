import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { Colors, globalStyles } from '../../../constants/Theme';
import { FormFieldProps } from './interfaces';
import { formStyles } from './styles/FormStyles';

function FormField<T extends FieldValues>({ 
  field, 
  control, 
  error 
}: FormFieldProps<T>) {
  const {
    name,
    label,
    placeholder,
    rules,
    inputProps,
    multiline = false,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    autoComplete,
    maxLength,
    helpText,
    containerStyle,
  } = field;

  return (
    <View style={[formStyles.fieldContainer, containerStyle]}>
      <Text style={formStyles.fieldLabel}>{label}</Text>
      
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              globalStyles.input,
              formStyles.fieldInput,
              multiline && formStyles.multilineInput,
              error && formStyles.fieldInputError
            ]}
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={Colors.textSecondary}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            maxLength={maxLength}
            testID={`form-field-${String(name)}`}
            {...inputProps}
          />
        )}
      />
      
      {helpText && !error && (
        <Text style={formStyles.helpText}>{helpText}</Text>
      )}
      
      {error && (
        <Text style={formStyles.errorText}>{error}</Text>
      )}
    </View>
  );
}

export default FormField;
