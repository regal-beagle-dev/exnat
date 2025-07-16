import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormHeader } from '../components/common';
import { Form, LoadingState } from '../components/core/forms';
import {
  ActivityFormConfig,
  ActivityFormData,
  getActivityFormDefaultValues,
  getActivityFormFields,
} from '../components/Settings/forms/ActivityForms';
import { Activity } from '../components/Settings/interfaces';
import { globalStyles } from '../constants/Theme';
import { serviceProvider } from '../services';

export default function ActivityFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activityData, setActivityData] = useState<Activity | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  
  const mode = (params.mode as 'create' | 'update') || 'create';
  const activityId = params.activityId as string;
  
  const activityService = serviceProvider.getActivityService();

  useEffect(() => {
    if (mode === 'update' && activityId) {
      setIsLoading(true);
      activityService.getActivity(activityId)
        .then(setActivityData)
        .catch(error => {
          console.error('Failed to load activity:', error);
          Alert.alert('Error', 'Failed to load activity data');
        })
        .finally(() => setIsLoading(false));
    }
  }, [mode, activityId, activityService]);

  const config: ActivityFormConfig = useMemo(() => ({
    mode,
    initialData: activityData,
  }), [mode, activityData]);
  
  const formFields = useMemo(() => getActivityFormFields(config), [config]);
  const defaultValues = useMemo(() => getActivityFormDefaultValues(config), [config]);
  
  const handleSubmit = useCallback(async (data: ActivityFormData) => {
    setIsSubmitting(true);
    
    try {
      if (mode === 'create') {
        const newActivity = {
          name: data.name.trim(),
          emoji: data.emoji.trim(),
          category: data.categoryName.trim() ? { 
            id: `cat_${Date.now()}`, 
            name: data.categoryName.trim(), 
            emoji: '📁' 
          } : undefined,
        };
        
        await activityService.createActivity(newActivity);
        Alert.alert('Success', 'Activity created successfully');
      } else {
        const updates = {
          name: data.name.trim(),
          emoji: data.emoji.trim(),
          category: data.categoryName.trim() ? { 
            id: activityData?.category?.id || `cat_${Date.now()}`, 
            name: data.categoryName.trim(), 
            emoji: activityData?.category?.emoji || '📁' 
          } : undefined,
        };
        
        await activityService.updateActivity(activityId, updates);
        Alert.alert('Success', 'Activity updated successfully');
      }
      
      router.back();
    } catch (error) {
      console.error('Error submitting activity:', error);
      Alert.alert('Error', 'Failed to save activity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [mode, activityId, activityData, activityService, router]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.container}>
        <FormHeader 
          title={mode === 'create' ? 'New Activity' : 'Edit Activity'}
          onBack={handleCancel}
        />
        
        <View style={globalStyles.content}>
          <LoadingState 
            isLoading={isLoading}
            fieldCount={formFields.length}
            type="animated"
          >
            <Form<ActivityFormData>
              fields={formFields}
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              submitButtonText={mode === 'create' ? 'Create Activity' : 'Update Activity'}
              showCancelButton={true}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          </LoadingState>
        </View>
      </View>
    </SafeAreaView>
  );
}
