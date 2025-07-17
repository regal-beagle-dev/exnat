import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { TextInputProps, ViewStyle } from 'react-native';

export type FormFieldType = 'text' | 'time';

export interface FormFieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  rules?: RegisterOptions<T>;
  inputProps?: Omit<TextInputProps, 'value' | 'onChangeText'>;
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  maxLength?: number;
  helpText?: string;
  containerStyle?: ViewStyle;
  fieldType?: FormFieldType;
  useMilitaryTime?: boolean;
}

export interface FormProps<T extends FieldValues> {
  fields: FormFieldConfig<T>[];
  onSubmit: (data: T) => void | Promise<void>;
  submitButtonText?: string;
  submitButtonTestId?: string;
  isLoading?: boolean;
  defaultValues?: Partial<T>;
  resetAfterSubmit?: boolean;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  onCancel?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export interface FormFieldProps<T extends FieldValues> {
  field: FormFieldConfig<T>;
  control: Control<T>;
  error?: string;
}

export interface FormActionsProps {
  onSubmit: () => void;
  onCancel?: () => void;
  submitButtonText: string;
  cancelButtonText?: string;
  submitButtonTestId?: string;
  isLoading?: boolean;
  showCancelButton?: boolean;
  isValid?: boolean;
}
