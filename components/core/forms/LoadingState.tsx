import React from 'react';
import { FormSkeleton, FormSkeletonAnimated } from '../skeleton';
import { SkeletonProps } from '../skeleton/interfaces';

export type LoadingStateType = 'static' | 'animated' | 'none';

export interface LoadingStateProps extends Omit<SkeletonProps, 'fieldCount'> {
  isLoading: boolean;
  type?: LoadingStateType;
  fieldCount?: number;
  children: React.ReactNode;
}

/**
 * LoadingState - Primary wrapper component for adding skeleton loading to any content
 * 
 * @description Smart wrapper that conditionally shows skeleton placeholder or actual content.
 * Preserves your original component logic while adding loading states with minimal code changes.
 * 
 * @example
 * ```tsx
 * <LoadingState isLoading={isDataLoading} fieldCount={3} type="animated">
 *   <Form fields={formFields} onSubmit={handleSubmit} />
 * </LoadingState>
 * ```
 */
function LoadingState({
  isLoading,
  type = 'animated',
  fieldCount = 3,
  showActions = true,
  showHeader = false,
  style,
  children,
}: LoadingStateProps) {
  if (!isLoading) {
    return <>{children}</>;
  }

  switch (type) {
    case 'static':
      return (
        <FormSkeleton
          fieldCount={fieldCount}
          showActions={showActions}
          showHeader={showHeader}
          style={style}
        />
      );
    case 'animated':
      return (
        <FormSkeletonAnimated
          fieldCount={fieldCount}
          showActions={showActions}
          showHeader={showHeader}
          style={style}
        />
      );
    case 'none':
    default:
      return <>{children}</>;
  }
}

export default LoadingState;
