# Service Layer Architecture

This document explains the service layer architecture for Nature Buddy, which makes it easy to switch between mock data and real backend integration.

## Overview

The service layer provides a clean abstraction between the UI components and data sources. This design allows you to:

1. **Develop with mock data** during early development
2. **Switch to real APIs** with minimal code changes
3. **Test with different data sources** easily
4. **Maintain consistent interfaces** across the app

## Structure

```
services/
├── ActivityService.ts     # Activity data operations
├── CategoryService.ts     # Category data operations
├── ServiceProvider.ts     # Service factory and configuration
└── index.ts              # Public exports

config/
└── environment.ts        # Environment configuration
```

## Quick Setup

### Using Mock Data (Default)
No setup required! The app uses mock data by default.

### Switching to Real Backend

1. **Update environment configuration:**
   ```typescript
   // config/environment.ts
   export const USE_MOCK_SERVICES = false;
   export const API_BASE_URL = 'https://your-api.com';
   ```

2. **That's it!** All components will automatically use the real API.

## Service Interfaces

### ActivityService
```typescript
interface ActivityService {
  getActivity(id: string): Promise<Activity | undefined>;
  getAllActivities(): Promise<Activity[]>;
  createActivity(activity: Omit<Activity, 'id'>): Promise<Activity>;
  updateActivity(id: string, activity: Partial<Activity>): Promise<Activity>;
  deleteActivity(id: string): Promise<void>;
}
```

### CategoryService
```typescript
interface CategoryService {
  getCategory(id: string): Promise<ActivityCategory | undefined>;
  getAllCategories(): Promise<ActivityCategory[]>;
  createCategory(category: Omit<ActivityCategory, 'id'>): Promise<ActivityCategory>;
  updateCategory(id: string, category: Partial<ActivityCategory>): Promise<ActivityCategory>;
  deleteCategory(id: string): Promise<void>;
}
```

## Usage in Components

```typescript
import { serviceProvider } from '../services';

// In your component
const activityService = serviceProvider.getActivityService();

// Use the service
const activity = await activityService.getActivity('123');
const newActivity = await activityService.createActivity({
  name: 'Running',
  emoji: '🏃‍♀️',
  category: { id: '1', name: 'Fitness', emoji: '💪' }
});
```

## Benefits

### Before (Scattered Mocks)
```typescript
// In Component A
const mockActivities = new Map([...]);

// In Component B 
const activities = [
  { id: '1', name: 'Running' },
  // ...
];

// In Component C
const MOCK_DATA = {
  activities: [...],
  categories: [...]
};
```

### After (Centralized Services)
```typescript
// In any component
const activityService = serviceProvider.getActivityService();
const activities = await activityService.getAllActivities();
```

## Backend Integration

When you're ready to integrate with a real backend:

1. **Set up your API endpoints** to match the expected interface
2. **Update the configuration** in `config/environment.ts`
3. **Test the integration** - no component code changes needed!

### Expected API Endpoints

```
GET    /activities           # Get all activities
GET    /activities/:id       # Get specific activity
POST   /activities           # Create new activity
PATCH  /activities/:id       # Update activity
DELETE /activities/:id       # Delete activity

GET    /categories           # Get all categories  
GET    /categories/:id       # Get specific category
POST   /categories           # Create new category
PATCH  /categories/:id       # Update category
DELETE /categories/:id       # Delete category
```

## Error Handling

The service layer handles errors consistently:

- **404 errors** return `undefined` for get operations
- **Other errors** throw with descriptive messages
- **Network timeouts** are handled by the API service
- **Component error handling** remains the same

## Development Workflow

1. **Start with mocks** - develop features quickly
2. **Define the interface** - ensure clean contracts
3. **Implement API service** - when backend is ready
4. **Switch configuration** - test real integration
5. **Deploy** - no code changes needed

This architecture ensures your components never need to know whether they're using mock data or a real API!
