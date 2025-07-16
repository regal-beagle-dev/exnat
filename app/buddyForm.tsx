import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormHeader } from '../components/common';
import { Form, LoadingState } from '../components/core/forms';
import {
    BuddyFormConfig,
    BuddyFormData,
    getBuddyFormDefaultValues,
    getBuddyFormFields,
} from '../components/Settings/forms/BuddyForms';
import { Buddy } from '../components/Settings/interfaces';
import { globalStyles } from '../constants/Theme';
import { serviceProvider } from '../services';

export default function BuddyFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buddyData, setBuddyData] = useState<Buddy | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  
  const mode = (params.mode as 'create' | 'update') || 'create';
  const buddyId = params.buddyId as string;
  
  const buddyService = serviceProvider.getBuddyService();

  useEffect(() => {
    if (mode === 'update' && buddyId) {
      setIsLoading(true);
      buddyService.getBuddy(buddyId)
        .then(setBuddyData)
        .catch(error => {
          console.error('Failed to load buddy:', error);
          Alert.alert('Error', 'Failed to load buddy data');
        })
        .finally(() => setIsLoading(false));
    }
  }, [mode, buddyId, buddyService]);

  const config: BuddyFormConfig = useMemo(() => ({
    mode,
    initialData: buddyData,
  }), [mode, buddyData]);
  
  const formFields = useMemo(() => getBuddyFormFields(config), [config]);
  const defaultValues = useMemo(() => getBuddyFormDefaultValues(config), [config]);
  
  const handleSubmit = useCallback(async (data: BuddyFormData) => {
    setIsSubmitting(true);
    
    try {
      if (mode === 'create') {
        const newBuddy = {
          name: data.name.trim(),
          relationship: data.relationship.trim(),
        };
        
        await buddyService.createBuddy(newBuddy);
        Alert.alert('Success', 'Buddy created successfully');
      } else {
        const updates = {
          name: data.name.trim(),
          relationship: data.relationship.trim(),
        };
        
        await buddyService.updateBuddy(buddyId, updates);
        Alert.alert('Success', 'Buddy updated successfully');
      }
      
      router.back();
    } catch (error) {
      console.error('Error submitting buddy:', error);
      Alert.alert('Error', 'Failed to save buddy. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [mode, buddyId, buddyService, router]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.container}>
        <FormHeader 
          title={mode === 'create' ? 'New Buddy' : 'Edit Buddy'}
          onBack={handleCancel}
        />
        
        <View style={globalStyles.content}>
          <LoadingState 
            isLoading={isLoading}
            fieldCount={formFields.length}
            type="animated"
            buttonLayout="double"
          >
            <Form<BuddyFormData>
              fields={formFields}
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              submitButtonText={mode === 'create' ? 'Create Buddy' : 'Update Buddy'}
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
