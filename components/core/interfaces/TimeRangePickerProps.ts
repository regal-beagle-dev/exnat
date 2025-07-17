import { TimeRange } from '../../TimeTracker/interfaces';

export interface TimeRangePickerProps {
  range: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  useMilitaryTime: boolean;
  label: string;
  timePeriod?: 'AM' | 'PM';
}
