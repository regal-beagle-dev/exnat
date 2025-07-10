import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ActivityManager from '../../../components/Settings/ActivityManager';
import { Activity } from '../../../components/Settings/interfaces';

describe('ActivityManager Component', () => {
  const mockOnAddActivity = jest.fn();
  const mockOnRemoveActivity = jest.fn();

  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'Exercise',
      name: 'Morning Jog',
      emoji: '🏃‍♂️',
    },
    {
      id: '2',
      type: 'Work',
      name: 'Deep Focus',
      emoji: '💻',
    },
  ];

  beforeEach(() => {
    mockOnAddActivity.mockClear();
    mockOnRemoveActivity.mockClear();
  });

  it('displays existing activities', () => {
    const { getByText } = render(
      <ActivityManager 
        activities={mockActivities}
        onAddActivity={mockOnAddActivity}
        onRemoveActivity={mockOnRemoveActivity}
      />
    );
    
    expect(getByText('Morning Jog')).toBeTruthy();
    expect(getByText('Exercise')).toBeTruthy();
    expect(getByText('Deep Focus')).toBeTruthy();
    expect(getByText('Work')).toBeTruthy();
    expect(getByText('🏃‍♂️')).toBeTruthy();
    expect(getByText('💻')).toBeTruthy();
  });

  it('shows add activity button initially', () => {
    const { getByText } = render(
      <ActivityManager 
        activities={mockActivities}
        onAddActivity={mockOnAddActivity}
        onRemoveActivity={mockOnRemoveActivity}
      />
    );
    
    expect(getByText('+ Add New Activity')).toBeTruthy();
  });

  it('shows add form when add button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <ActivityManager 
        activities={mockActivities}
        onAddActivity={mockOnAddActivity}
        onRemoveActivity={mockOnRemoveActivity}
      />
    );
    
    const addButton = getByText('+ Add New Activity');
    fireEvent.press(addButton);
    
    expect(getByPlaceholderText('Activity type (e.g., Exercise, Work)')).toBeTruthy();
    expect(getByPlaceholderText('Activity name (e.g., Morning Jog)')).toBeTruthy();
    expect(getByPlaceholderText('Emoji (e.g., 🏃‍♂️)')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Add Activity')).toBeTruthy();
  });
});
