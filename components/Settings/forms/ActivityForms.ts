import { FormFieldConfig } from '../../core/forms';

export interface NewActivityFormData {
  categoryName: string;
  name: string;
  emoji: string;
}

export interface NewCategoryFormData {
  name: string;
  emoji: string;
}

export const newActivityFormFields: FormFieldConfig<NewActivityFormData>[] = [
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
      validate: (value: string) => {
        // Basic emoji validation - check if it contains emoji-like characters
        const emojiRegex = /[\u2600-\u26FF\u2700-\u27BF\u1F300-\u1F5FF\u1F600-\u1F64F\u1F680-\u1F6FF\u1F1E0-\u1F1FF]/;
        return emojiRegex.test(value) || 'Please enter a valid emoji';
      },
    },
  },
];

export const newCategoryFormFields: FormFieldConfig<NewCategoryFormData>[] = [
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
      validate: (value: string) => {
        // Basic emoji validation - check if it contains emoji-like characters
        const emojiRegex = /[\u2600-\u26FF\u2700-\u27BF\u1F300-\u1F5FF\u1F600-\u1F64F\u1F680-\u1F6FF\u1F1E0-\u1F1FF]/;
        return emojiRegex.test(value) || 'Please enter a valid emoji';
      },
    },
  },
];
