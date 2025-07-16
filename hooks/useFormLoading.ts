import { useCallback } from 'react';
import { LoadingStateType } from '../components/core/forms/LoadingState';

export interface UseFormLoadingOptions {
  skeletonType?: LoadingStateType;
  skeletonFieldCount?: number;
}

export function useFormLoading(
  isLoading: boolean, 
  options: UseFormLoadingOptions = {}
) {
  const { skeletonType = 'animated', skeletonFieldCount } = options;

  const withLoading = useCallback(
    (formElement: React.ReactElement, fieldCount?: number) => {
      if (!isLoading) return formElement;
      
      const LoadingState = require('../components/core/forms/LoadingState').default;
      
      return (
        <LoadingState
          isLoading={isLoading}
          type={skeletonType}
          fieldCount={skeletonFieldCount || fieldCount || 3}
        >
          {formElement}
        </LoadingState>
      );
    },
    [isLoading, skeletonType, skeletonFieldCount]
  );

  return {
    isLoading,
    withLoading,
  };
}
