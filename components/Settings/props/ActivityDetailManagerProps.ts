import { Activity, ActivityCategory } from '../interfaces';

export interface ActivityDetailManagerProps {
  onClose: () => void;
  activities: Activity[];
  categories: ActivityCategory[];
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
  onRemoveActivity: (id: string) => void;
  onToggleActivityVisibility: (id: string) => void;
  onAddCategory: (category: Omit<ActivityCategory, 'id'>) => void;
  onRemoveCategory: (id: string) => void;
}
