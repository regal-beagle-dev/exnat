import { TimePickerProps } from './TimePickerProps';

export interface TimePickerFieldProps extends TimePickerProps {
  label: string;
  error?: string;
  helpText?: string;
}

export interface TimePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (time: Date) => void;
  initialTime?: Date;
  mode?: 'time' | 'date' | 'datetime';
  useMilitaryTime?: boolean;
  minimumTime?: Date;
  maximumTime?: Date;
  hourOnly?: boolean;
}
