export interface TimeModeToggleProps {
  timeMode: 'AM' | 'PM';
  onToggle: (mode: 'AM' | 'PM') => void;
}
