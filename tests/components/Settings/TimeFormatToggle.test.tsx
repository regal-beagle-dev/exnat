import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import TimeFormatToggle from '../../../components/Settings/TimeFormatToggle';

describe('TimeFormatToggle Component', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it('displays 12-hour format when useMilitaryTime is false', () => {
    const { getByText } = render(
      <TimeFormatToggle useMilitaryTime={false} onToggle={mockOnToggle} />
    );
    
    expect(getByText('12-hour format (2:30 PM)')).toBeTruthy();
  });

  it('displays 24-hour format when useMilitaryTime is true', () => {
    const { getByText } = render(
      <TimeFormatToggle useMilitaryTime={true} onToggle={mockOnToggle} />
    );
    
    expect(getByText('24-hour format (14:30)')).toBeTruthy();
  });

  it('calls onToggle when pressed', () => {
    const { getByText } = render(
      <TimeFormatToggle useMilitaryTime={false} onToggle={mockOnToggle} />
    );
    
    const toggleContainer = getByText('Time Format').parent?.parent;
    if (toggleContainer) {
      fireEvent.press(toggleContainer);
      expect(mockOnToggle).toHaveBeenCalledWith(true);
    }
  });
});
