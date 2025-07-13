import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormHeader } from '../components/common';
import { Form } from '../components/core/forms';
import {
  CategoryFormConfig,
  CategoryFormData,
  getCategoryFormDefaultValues,
  getCategoryFormFields,
} from '../components/Settings/forms/ActivityForms';
import { globalStyles } from '../constants/Theme';

// Mock category storage - replace with actual backend calls
const mockCategories = new Map([
  ['cat1', { id: 'cat1', name: 'Exercise', emoji: '💪' }],
  ['cat2', { id: 'cat2', name: 'Learning', emoji: '🧠' }],
  ['cat3', { id: 'cat3', name: 'Work', emoji: '💼' }],
]);

export default function CategoryFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mode = (params.mode as 'create' | 'update') || 'create';
  const categoryId = params.categoryId as string;
  
  // Memoized category data - in real app, this would come from a data store/context
  const categoryData = useMemo(() => {
    if (mode === 'update' && categoryId) {
      return mockCategories.get(categoryId);
    }
    return undefined;
  }, [mode, categoryId]);

  const config: CategoryFormConfig = useMemo(() => ({
    mode,
    initialData: categoryData,
  }), [mode, categoryData]);
  
  const formFields = useMemo(() => getCategoryFormFields(config), [config]);
  const defaultValues = useMemo(() => getCategoryFormDefaultValues(config), [config]);
  
  // Memoized submit handler
  const handleSubmit = useCallback(async (data: CategoryFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (mode === 'create') {
        const newCategory = {
          id: `category_${Date.now()}`,
          name: data.name.trim(),
          emoji: data.emoji.trim(),
        };
        
        // TODO: Replace with actual API call
        console.log('Creating category:', newCategory);
        Alert.alert('Success', 'Category created successfully');
      } else {
        const updatedCategory = {
          id: categoryId,
          name: data.name.trim(),
          emoji: data.emoji.trim(),
        };
        
        // TODO: Replace with actual API call  
        console.log('Updating category:', updatedCategory);
        Alert.alert('Success', 'Category updated successfully');
      }
      
      router.back();
    } catch (error) {
      console.error('Error submitting category:', error);
      Alert.alert('Error', 'Failed to save category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [mode, categoryId, router]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.container}>
        <FormHeader 
          title={mode === 'create' ? 'New Category' : 'Edit Category'}
          onBack={handleCancel}
        />
        
        <View style={globalStyles.content}>
          <Form<CategoryFormData>
            fields={formFields}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            submitButtonText={mode === 'create' ? 'Create Category' : 'Update Category'}
            showCancelButton={true}
            onCancel={handleCancel}
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
