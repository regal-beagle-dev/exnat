import { Buddy } from '../interfaces';

export interface BuddyManagementProps {
  buddies: Buddy[];
  onNavigateToBuddyManager: () => void;
  onEditBuddy?: (buddy: Buddy) => void;
}
