import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormHeader } from '../components/common';
import { Form, LoadingState } from '../components/core/forms';
import {
  CategoryFormConfig,
  CategoryFormData,
  getCategoryFormDefaultValues,
  getCategoryFormFields,
} from '../components/Settings/forms/ActivityForms';
import { ActivityCategory } from '../components/Settings/interfaces';
import { globalStyles } from '../constants/Theme';
import { serviceProvider } from '../services';

export default function CategoryFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryData, setCategoryData] = useState<ActivityCategory | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  
  const mode = (params.mode as 'create' | 'update') || 'create';
  const categoryId = params.categoryId as string;
  
  const categoryService = serviceProvider.getCategoryService();

  useEffect(() => {
    if (mode === 'update' && categoryId) {
      setIsLoading(true);
      categoryService.getCategory(categoryId)
        .then(setCategoryData)
        .catch(error => {
          console.error('Failed to load category:', error);
          Alert.alert('Error', 'Failed to load category data');
        })
        .finally(() => setIsLoading(false));
    }
  }, [mode, categoryId, categoryService]);

  const config: CategoryFormConfig = useMemo(() => ({
    mode,
    initialData: categoryData,
  }), [mode, categoryData]);
  
  const formFields = useMemo(() => getCategoryFormFields(config), [config]);
  const defaultValues = useMemo(() => getCategoryFormDefaultValues(config), [config]);
  
  const handleSubmit = useCallback(async (data: CategoryFormData) => {
    setIsSubmitting(true);
    
    try {
      if (mode === 'create') {
        const newCategory = {
          name: data.name.trim(),
          emoji: data.emoji.trim(),
        };
        
        await categoryService.createCategory(newCategory);
        Alert.alert('Success', 'Category created successfully');
      } else {
        const updates = {
          name: data.name.trim(),
          emoji: data.emoji.trim(),
        };
        
        await categoryService.updateCategory(categoryId, updates);
        Alert.alert('Success', 'Category updated successfully');
      }
      
      router.back();
    } catch (error) {
      console.error('Error submitting category:', error);
      Alert.alert('Error', 'Failed to save category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [mode, categoryId, categoryService, router]);

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
          <LoadingState 
            isLoading={isLoading}
            fieldCount={formFields.length}
            type="animated"
          >
            <Form<CategoryFormData>
              fields={formFields}
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              submitButtonText={mode === 'create' ? 'Create Category' : 'Update Category'}
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
