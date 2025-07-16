import React from 'react';
import { View } from 'react-native';
import SubtleSkeleton from './SubtleSkeleton';
import { SkeletonProps } from './interfaces';
import { skeletonStyles } from './styles/SkeletonStyles';

/**
 * FormSkeletonAnimated - Animated skeleton with subtle motion effects
 * 
 * @description Same visual structure as FormSkeleton but with gentle fade animations.
 * Each element pulses softly (60-90% opacity, 800ms cycles) to indicate active loading.
 * Creates a polished "breathing" effect without being distracting.
 * 
 * @example
 * ```tsx
 * <FormSkeletonAnimated fieldCount={3} showActions={true} />
 * ```
 */
function FormSkeletonAnimated({ 
  fieldCount = 3, 
  showActions = true, 
  showHeader = false,
  style 
}: SkeletonProps) {
  return (
    <View style={[skeletonStyles.container, style]}>
      {showHeader && (
        <SubtleSkeleton 
          width="60%" 
          height={28} 
          borderRadius={8}
          style={{ marginBottom: 16 }}
        />
      )}
      
      {Array.from({ length: fieldCount }).map((_, index) => (
        <View key={index} style={skeletonStyles.fieldContainer}>
          <SubtleSkeleton 
            width="35%" 
            height={19} 
            borderRadius={8}
            style={{ marginBottom: 8 }}
          />
          <SubtleSkeleton 
            width="100%" 
            height={48} 
            borderRadius={8}
          />
        </View>
      ))}
      
      {showActions && (
        <View style={skeletonStyles.actionsContainer}>
          <SubtleSkeleton 
            width="100%" 
            height={50} 
            borderRadius={12}
          />
        </View>
      )}
    </View>
  );
}

export default FormSkeletonAnimated;
