import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { Colors, globalStyles } from '../../../constants/Theme';
import { FormFieldProps } from './interfaces';
import { formStyles } from './styles/FormStyles';
import TimePickerField from './TimePickerField';

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
    fieldType = 'text',
    useMilitaryTime = false,
  } = field;

  if (fieldType === 'time') {
    return (
      <View style={[formStyles.fieldContainer, containerStyle]}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <TimePickerField
              label={label}
              value={value}
              onTimeChange={onChange}
              placeholder={placeholder}
              useMilitaryTime={useMilitaryTime}
              error={error}
              helpText={helpText}
            />
          )}
        />
      </View>
    );
  }

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
