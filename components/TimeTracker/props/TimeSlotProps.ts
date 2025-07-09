export interface TimeSlotProps {
  time: number;
  isInRange: boolean;
  isSelected: boolean;
  isFirstIntervalOfHour: boolean;
  showHourDivider: boolean;
  formatTime: (time: number) => string;
  onPress: (time: number) => void;
  onPressIn?: (time: number) => void;
}
