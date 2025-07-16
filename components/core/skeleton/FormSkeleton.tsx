import React from 'react';
import { View } from 'react-native';
import { SkeletonProps } from './interfaces';
import { skeletonStyles } from './styles/SkeletonStyles';

/**
 * FormSkeleton - Static skeleton placeholder that mimics form structure
 * 
 * @description Renders static gray rectangles representing form labels, inputs, and buttons.
 * No animation - ideal for users who prefer minimal distraction or reduced motion.
 * Uses theme colors and spacing for visual consistency.
 * 
 * @example
 * ```tsx
 * <FormSkeleton fieldCount={4} showActions={true} showHeader={false} />
 * ```
 */
function FormSkeleton({ 
  fieldCount = 3, 
  showActions = true, 
  showHeader = false,
  buttonLayout = 'single',
  style 
}: SkeletonProps) {
  return (
    <View style={[skeletonStyles.container, style]}>
      {showHeader && (
        <View style={skeletonStyles.headerSkeleton} />
      )}
      
      {Array.from({ length: fieldCount }).map((_, index) => (
        <View key={index} style={skeletonStyles.fieldContainer}>
          <View style={skeletonStyles.labelSkeleton} />
          <View style={skeletonStyles.inputSkeleton} />
        </View>
      ))}
      
      {showActions && (
        <View style={skeletonStyles.actionsContainer}>
          {buttonLayout === 'double' ? (
            <View style={skeletonStyles.buttonRow}>
              <View style={skeletonStyles.buttonSkeletonHalf} />
              <View style={skeletonStyles.buttonSkeletonHalf} />
            </View>
          ) : (
            <View style={skeletonStyles.buttonSkeleton} />
          )}
        </View>
      )}
    </View>
  );
}

export default FormSkeleton;
