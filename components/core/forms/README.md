# Form Component Documentation

## Overview

The `Form` component is a generic, reusable form wrapper built on top of React Hook Form. It provides a consistent, type-safe way to create forms throughout the Nature Buddy application with built-in validation, error handling, and consistent styling.

## Features

- **Type-safe**: Full TypeScript support with generic types
- **Validation**: Built-in validation using React Hook Form
- **Consistent UI**: Automatically styled according to app theme
- **Flexible**: Supports various input types and configurations
- **Error Handling**: Automatic error display with validation
- **Loading States**: Built-in loading/disabled states
- **Cancel Support**: Optional cancel button functionality

## Installation

The Form component uses React Hook Form as a dependency:

```bash
bun add react-hook-form
```

## Basic Usage

```tsx
import { Form, FormFieldConfig } from '@/components/core/forms';

interface MyFormData {
  name: string;
  email: string;
  message: string;
}

const formFields: FormFieldConfig<MyFormData>[] = [
  {
    name: 'name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    rules: {
      required: 'Name is required',
      minLength: { value: 2, message: 'Name must be at least 2 characters' }
    }
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    keyboardType: 'email-address',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    }
  }
];

function MyComponent() {
  const handleSubmit = (data: MyFormData) => {
    console.log('Form data:', data);
  };

  return (
    <Form<MyFormData>
      fields={formFields}
      onSubmit={handleSubmit}
      submitButtonText="Submit"
    />
  );
}
```

## API Reference

### Form Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `fields` | `FormFieldConfig<T>[]` | Yes | - | Array of field configurations |
| `onSubmit` | `(data: T) => void \| Promise<void>` | Yes | - | Form submission handler |
| `submitButtonText` | `string` | No | `"Submit"` | Text for submit button |
| `submitButtonTestId` | `string` | No | - | Test ID for submit button |
| `isLoading` | `boolean` | No | `false` | Shows loading state |
| `defaultValues` | `Partial<T>` | No | - | Default form values |
| `resetAfterSubmit` | `boolean` | No | `false` | Reset form after successful submit |
| `showCancelButton` | `boolean` | No | `false` | Show cancel button |
| `cancelButtonText` | `string` | No | `"Cancel"` | Text for cancel button |
| `onCancel` | `() => void` | No | - | Cancel button handler |
| `children` | `React.ReactNode` | No | - | Additional content between fields and buttons |
| `style` | `ViewStyle` | No | - | Custom container styles |

### FormFieldConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `Path<T>` | Yes | Field name (type-safe) |
| `label` | `string` | Yes | Field label |
| `placeholder` | `string` | No | Input placeholder |
| `rules` | `RegisterOptions<T>` | No | Validation rules |
| `inputProps` | `TextInputProps` | No | Additional TextInput props |
| `multiline` | `boolean` | No | Enable multiline input |
| `secureTextEntry` | `boolean` | No | Hide input (passwords) |
| `keyboardType` | `KeyboardTypeOptions` | No | Keyboard type |
| `autoCapitalize` | `AutoCapitalizeOptions` | No | Auto-capitalization |
| `autoComplete` | `AutoCompleteOptions` | No | Auto-complete hints |
| `maxLength` | `number` | No | Maximum character length |
| `helpText` | `string` | No | Help text below field |
| `containerStyle` | `ViewStyle` | No | Custom field container styles |

## Validation Rules

The component supports all React Hook Form validation rules:

```tsx
rules: {
  required: 'This field is required',
  minLength: { value: 3, message: 'Minimum 3 characters' },
  maxLength: { value: 50, message: 'Maximum 50 characters' },
  pattern: { value: /regex/, message: 'Invalid format' },
  validate: (value) => value.includes('@') || 'Must contain @'
}
```

## Examples

### Basic Contact Form

```tsx
const contactFields: FormFieldConfig<ContactFormData>[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Your name',
    rules: { required: 'Name is required' }
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'your@email.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email'
      }
    }
  },
  {
    name: 'message',
    label: 'Message',
    placeholder: 'Your message',
    multiline: true,
    rules: {
      required: 'Message is required',
      maxLength: { value: 500, message: 'Max 500 characters' }
    }
  }
];
```

### Form with Cancel Button

```tsx
<Form<FormData>
  fields={formFields}
  onSubmit={handleSubmit}
  showCancelButton={true}
  onCancel={() => navigation.goBack()}
  submitButtonText="Save"
  cancelButtonText="Cancel"
/>
```

### Form with Loading State

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  try {
    await submitToAPI(data);
  } finally {
    setIsSubmitting(false);
  }
};

<Form<FormData>
  fields={formFields}
  onSubmit={handleSubmit}
  isLoading={isSubmitting}
/>
```

## Styling

The component uses the app's global theme and styles. Custom styling can be applied through:

- `style` prop for container styling
- `containerStyle` in field config for individual field styling
- `inputProps.style` for input-specific styling

## Best Practices

1. **Type Safety**: Always define your form data interface and use it as the generic type
2. **Validation**: Use appropriate validation rules for each field
3. **Accessibility**: Provide clear labels and help text
4. **Error Handling**: Handle form submission errors gracefully
5. **Loading States**: Show loading indicators for async operations

## Integration Example

The Form has been integrated into the ActivityDetailManager component, replacing the previous manual form implementation:

```tsx
// Before
<TextInput
  style={[globalStyles.input, activityManagerStyles.input]}
  placeholder="Activity name (e.g., Morning Jog)"
  value={newActivity.name}
  onChangeText={(text) => setNewActivity(prev => ({ ...prev, name: text }))}
/>

// After
<Form<ActivityFormData>
  fields={getActivityFormFields({ mode: 'create' })}
  onSubmit={handleAddActivity}
  submitButtonText="Add Activity"
  showCancelButton={true}
  onCancel={() => setShowAddActivityForm(false)}
/>
```

This provides:
- Type safety for form data
- Automatic validation
- Consistent styling
- Better error handling
- Reduced boilerplate code
