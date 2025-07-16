import { ViewStyle } from 'react-native';

export interface SkeletonProps {
  fieldCount?: number;
  showActions?: boolean;
  showHeader?: boolean;
  buttonLayout?: 'single' | 'double';
  style?: ViewStyle;
}

export interface AnimatedSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}
