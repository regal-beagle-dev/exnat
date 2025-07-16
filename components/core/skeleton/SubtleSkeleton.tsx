import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { AnimatedSkeletonProps } from './interfaces';
import { skeletonStyles } from './styles/SkeletonStyles';

/**
 * SubtleSkeleton - Low-level animated building block for custom skeletons
 * 
 * @description Fundamental animated skeleton element with customizable dimensions.
 * Creates gentle "breathing" effect (60-90% opacity, 800ms cycles) using native driver
 * for 60fps performance. Building block for other skeleton components.
 * 
 * @example
 * ```tsx
 * <SubtleSkeleton width="100%" height={48} borderRadius={8} />
 * ```
 */
function SubtleSkeleton({ 
  width = '100%', 
  height = 20, 
  borderRadius = 8, 
  style 
}: AnimatedSkeletonProps) {
  const fadeValue = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const createGentleAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(fadeValue, {
            toValue: 0.9,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(fadeValue, {
            toValue: 0.6,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation = createGentleAnimation();
    animation.start();

    return () => animation.stop();
  }, [fadeValue]);

  const skeletonStyle = {
    ...skeletonStyles.animatedSkeleton,
    width,
    height,
    borderRadius,
    ...(style as any),
  };

  return (
    <Animated.View
      style={[
        skeletonStyle,
        {
          opacity: fadeValue,
        },
      ]}
    />
  );
}

export default SubtleSkeleton;
