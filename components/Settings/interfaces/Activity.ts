export interface ActivityCategory {
  id: string;
  name: string;
  emoji: string;
}

export interface Activity {
  id: string;
  name: string;
  emoji: string;
  category?: ActivityCategory;
  hidden?: boolean;
}
