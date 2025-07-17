export interface TimePickerProps {
  value?: Date;
  onTimeChange: (time: Date) => void;
  useMilitaryTime?: boolean;
  placeholder?: string;
  disabled?: boolean;
}
