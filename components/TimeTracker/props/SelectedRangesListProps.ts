import { TimeRange } from '../interfaces/TimeRange';

export interface SelectedRangesListProps {
  selectedRanges: TimeRange[];
  formatTimeRange: (start: number, end: number) => string;
  onRemoveRange: (index: number) => void;
}
