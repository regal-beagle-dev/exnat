export interface CustomTimeModalProps {
  visible: boolean;
  customStartTime: string;
  customEndTime: string;
  onCustomStartTimeChange: (time: string) => void;
  onCustomEndTimeChange: (time: string) => void;
  onClose: () => void;
  onAdd: () => void;
}
