import { Buddy } from '../interfaces';

export interface BuddyManagerProps {
  onClose: () => void;
  buddies: Buddy[];
  onAddBuddy: (buddy: Omit<Buddy, 'id'>) => void;
  onRemoveBuddy: (id: string) => void;
}
