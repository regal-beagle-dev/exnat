import { TimeRange } from '../../TimeTracker/interfaces';

export interface DefaultTimeRangesProps {
  morningRange: TimeRange;
  eveningRange: TimeRange;
  onMorningRangeChange: (range: TimeRange) => void;
  onEveningRangeChange: (range: TimeRange) => void;
  useMilitaryTime: boolean;
}
