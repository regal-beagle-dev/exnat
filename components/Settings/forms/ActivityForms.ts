import { FormFieldConfig } from '../../core/forms';
import { Activity, ActivityCategory } from '../interfaces';

export interface ActivityFormData {
  categoryName: string;
  name: string;
  emoji: string;
}

export interface CategoryFormData {
  name: string;
  emoji: string;
}

export interface ActivityFormConfig {
  mode: 'create' | 'update';
  initialData?: Activity;
  categories?: ActivityCategory[];
}

export interface CategoryFormConfig {
  mode: 'create' | 'update';
  initialData?: ActivityCategory;
}

export const getActivityFormFields = (config: ActivityFormConfig): FormFieldConfig<ActivityFormData>[] => [
  {
    name: 'categoryName',
    label: 'Category',
    placeholder: 'Category (optional, e.g., Exercise, Work, Hobby)',
    helpText: 'Choose an existing category or leave empty',
  },
  {
    name: 'name',
    label: 'Activity Name',
    placeholder: 'Activity name (e.g., Morning Jog)',
    rules: {
      required: 'Activity name is required',
      minLength: {
        value: 2,
        message: 'Activity name must be at least 2 characters',
      },
      maxLength: {
        value: 50,
        message: 'Activity name must be less than 50 characters',
      },
    },
  },
  {
    name: 'emoji',
    label: 'Emoji',
    placeholder: 'Emoji (e.g., 🏃‍♂️)',
    maxLength: 2,
    rules: {
      required: 'Emoji is required',
    },
  },
];

export const getActivityFormDefaultValues = (config: ActivityFormConfig): Partial<ActivityFormData> => ({
  categoryName: config.initialData?.category?.name || '',
  name: config.initialData?.name || '',
  emoji: config.initialData?.emoji || '',
});

export const getCategoryFormFields = (config: CategoryFormConfig): FormFieldConfig<CategoryFormData>[] => [
  {
    name: 'name',
    label: 'Category Name',
    placeholder: 'Category name (e.g., Fitness, Work, Hobbies)',
    rules: {
      required: 'Category name is required',
      minLength: {
        value: 2,
        message: 'Category name must be at least 2 characters',
      },
      maxLength: {
        value: 30,
        message: 'Category name must be less than 30 characters',
      },
    },
  },
  {
    name: 'emoji',
    label: 'Emoji',
    placeholder: 'Emoji (e.g., 💪)',
    maxLength: 2,
    rules: {
      required: 'Emoji is required',
    },
  },
];

export const getCategoryFormDefaultValues = (config: CategoryFormConfig): Partial<CategoryFormData> => ({
  name: config.initialData?.name || '',
  emoji: config.initialData?.emoji || '',
});
