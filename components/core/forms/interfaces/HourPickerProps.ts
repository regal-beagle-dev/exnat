export interface HourPickerProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (hour: number) => void;
  initialHour?: number;
  useMilitaryTime?: boolean;
  minimumHour?: number;
  maximumHour?: number;
  title?: string;
}
