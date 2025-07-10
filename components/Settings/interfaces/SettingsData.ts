import { TimeRange } from '../../TimeTracker/interfaces';
import { Activity } from './Activity';
import { Buddy } from './Buddy';

export interface SettingsData {
  useMilitaryTime: boolean;
  defaultTimeRanges: {
    morning: TimeRange;
    evening: TimeRange;
  };
  activities: Activity[];
  buddies: Buddy[];
}
