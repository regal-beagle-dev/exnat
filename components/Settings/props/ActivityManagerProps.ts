import { Activity, ActivityCategory } from '../interfaces';

export interface ActivityManagerProps {
  activities: Activity[];
  categories: ActivityCategory[];
  onNavigateToActivityManager: () => void;
  onEditActivity?: (activity: Activity) => void;
}
