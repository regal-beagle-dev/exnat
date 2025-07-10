import { Activity } from '../interfaces';

export interface ActivityManagerProps {
  activities: Activity[];
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
  onRemoveActivity: (id: string) => void;
}
