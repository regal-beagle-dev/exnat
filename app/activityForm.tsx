import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormHeader } from '../components/common';
import { Form } from '../components/core/forms';
import {
  ActivityFormConfig,
  ActivityFormData,
  getActivityFormDefaultValues,
  getActivityFormFields,
} from '../components/Settings/forms/ActivityForms';
import { globalStyles } from '../constants/Theme';

// Mock activity storage - replace with actual backend calls
const mockActivities = new Map([
  ['activity1', { id: 'activity1', name: 'Jog', emoji: '🏃‍♂️', category: { id: 'cat1', name: 'Exercise', emoji: '💪' } }],
  ['activity2', { id: 'activity2', name: 'Reading', emoji: '📚', category: { id: 'cat2', name: 'Relax', emoji: '🧠' } }],
]);

export default function ActivityFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mode = (params.mode as 'create' | 'update') || 'create';
  const activityId = params.activityId as string;
  
  // Memoized activity data - in real app, this would come from a data store/context
  const activityData = useMemo(() => {
    if (mode === 'update' && activityId) {
      return mockActivities.get(activityId);
    }
    return undefined;
  }, [mode, activityId]);

  const config: ActivityFormConfig = useMemo(() => ({
    mode,
    initialData: activityData,
  }), [mode, activityData]);
  
  const formFields = useMemo(() => getActivityFormFields(config), [config]);
  const defaultValues = useMemo(() => getActivityFormDefaultValues(config), [config]);
  
  // Memoized submit handler
  const handleSubmit = useCallback(async (data: ActivityFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (mode === 'create') {
        const newActivity = {
          id: `activity_${Date.now()}`,
          name: data.name.trim(),
          emoji: data.emoji.trim(),
          category: data.categoryName.trim() ? { 
            id: `cat_${Date.now()}`, 
            name: data.categoryName.trim(), 
            emoji: '📁' 
          } : undefined,
        };
        
        // TODO: Replace with actual API call
        console.log('Creating activity:', newActivity);
        Alert.alert('Success', 'Activity created successfully');
      } else {
        const updatedActivity = {
          id: activityId,
          name: data.name.trim(),
          emoji: data.emoji.trim(),
          category: data.categoryName.trim() ? { 
            id: activityData?.category?.id || `cat_${Date.now()}`, 
            name: data.categoryName.trim(), 
            emoji: activityData?.category?.emoji || '📁' 
          } : undefined,
        };
        
        // TODO: Replace with actual API call  
        console.log('Updating activity:', updatedActivity);
        Alert.alert('Success', 'Activity updated successfully');
      }
      
      router.back();
    } catch (error) {
      console.error('Error submitting activity:', error);
      Alert.alert('Error', 'Failed to save activity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [mode, activityId, activityData, router]);

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
          <Form<ActivityFormData>
            fields={formFields}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            submitButtonText={mode === 'create' ? 'Create Activity' : 'Update Activity'}
            showCancelButton={true}
            onCancel={handleCancel}
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
