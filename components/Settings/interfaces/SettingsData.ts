import { TimeRange } from '../../TimeTracker/interfaces';
import { Activity } from './Activity';

export interface SettingsData {
  useMilitaryTime: boolean;
  defaultTimeRanges: {
    morning: TimeRange;
    evening: TimeRange;
  };
  activities: Activity[];
}
