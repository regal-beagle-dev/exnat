import { TimeRange } from '../../TimeTracker/interfaces';
import { Activity, ActivityCategory } from './Activity';
import { Buddy } from './Buddy';

export interface SettingsData {
  useMilitaryTime: boolean;
  defaultTimeRanges: {
    morning: TimeRange;
    evening: TimeRange;
  };
  activities: Activity[];
  activityCategories: ActivityCategory[];
  buddies: Buddy[];
}
