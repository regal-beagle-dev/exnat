import { DefaultTimeRanges } from '../../../services/TimeRangeService';

export interface IndividualTimeRangePickerProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (ranges: DefaultTimeRanges) => void;
  initialRanges?: DefaultTimeRanges;
  useMilitaryTime?: boolean;
  date?: Date;
}
