import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { View } from 'react-native';
import FormActions from './FormActions';
import FormField from './FormField';
import { FormProps } from './interfaces';
import { formStyles } from './styles/FormStyles';

function Form<T extends FieldValues>({
  fields,
  onSubmit,
  submitButtonText = 'Submit',
  submitButtonTestId,
  isLoading = false,
  defaultValues,
  resetAfterSubmit = false,
  showCancelButton = false,
  cancelButtonText = 'Cancel',
  onCancel,
  children,
  style,
}: FormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<T>({
    defaultValues: defaultValues as any,
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: T) => {
    try {
      await onSubmit(data);
      if (resetAfterSubmit) {
        reset();
      }
    } catch (error) {
      // Error handling can be done by the parent component
      console.error('Form submission error:', error);
    }
  };

  return (
    <View style={[formStyles.formContainer, style]}>
      {fields.map((field) => (
        <FormField
          key={String(field.name)}
          field={field}
          control={control}
          error={errors[field.name]?.message as string}
        />
      ))}
      
      {children}
      
      <FormActions
        onSubmit={handleSubmit(handleFormSubmit)}
        onCancel={onCancel}
        submitButtonText={submitButtonText}
        cancelButtonText={cancelButtonText}
        submitButtonTestId={submitButtonTestId}
        isLoading={isLoading}
        showCancelButton={showCancelButton}
        isValid={isValid}
      />
    </View>
  );
}

export default Form;
