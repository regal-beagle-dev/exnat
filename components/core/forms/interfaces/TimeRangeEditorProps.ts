import { TimeRange } from '../../../TimeTracker/interfaces';

export interface TimeRangeEditorProps {
  range: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  useMilitaryTime?: boolean;
  label: string;
  isLoading?: boolean;
}

export interface TimeRangeFormData {
  startTime: Date;
  endTime: Date;
}
