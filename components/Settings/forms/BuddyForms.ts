import { FormFieldConfig } from '../../core/forms';
import { Buddy } from '../interfaces';

export interface BuddyFormData {
  name: string;
  relationship: string;
}

export interface BuddyFormConfig {
  mode: 'create' | 'update';
  initialData?: Buddy;
}

export const getBuddyFormFields = (config: BuddyFormConfig): FormFieldConfig<BuddyFormData>[] => [
  {
    name: 'name',
    label: 'Buddy Name',
    placeholder: "Buddy's name (e.g., Sarah, Dad, Alex)",
    rules: {
      required: 'Buddy name is required',
      minLength: {
        value: 2,
        message: 'Buddy name must be at least 2 characters',
      },
      maxLength: {
        value: 30,
        message: 'Buddy name must be less than 30 characters',
      },
    },
  },
  {
    name: 'relationship',
    label: 'Relationship',
    placeholder: 'Relationship (e.g., Sister, Friend, Spouse)',
    rules: {
      required: 'Relationship is required',
      minLength: {
        value: 2,
        message: 'Relationship must be at least 2 characters',
      },
      maxLength: {
        value: 30,
        message: 'Relationship must be less than 30 characters',
      },
    },
  },
];

export const getBuddyFormDefaultValues = (config: BuddyFormConfig): Partial<BuddyFormData> => ({
  name: config.initialData?.name || '',
  relationship: config.initialData?.relationship || '',
});
