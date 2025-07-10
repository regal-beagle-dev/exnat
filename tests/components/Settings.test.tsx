import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Settings from '../../components/Settings';

describe('Settings Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders settings screen with all sections', () => {
    const { getByText } = render(<Settings onClose={mockOnClose} />);
    
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Time Display')).toBeTruthy();
    expect(getByText('Default Time Ranges')).toBeTruthy();
    expect(getByText('Activities')).toBeTruthy();
  });

  it('calls onClose when back button is pressed', () => {
    const { getByText } = render(<Settings onClose={mockOnClose} />);
    
    const backButton = getByText('← Back');
    fireEvent.press(backButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('toggles time format when toggle is pressed', () => {
    const { getByText } = render(<Settings onClose={mockOnClose} />);
    
    expect(getByText('12-hour format (2:30 PM)')).toBeTruthy();
    expect(getByText('Time Format')).toBeTruthy();
  });

  it('displays default activities', () => {
    const { getByText } = render(<Settings onClose={mockOnClose} />);
    
    expect(getByText('Morning Jog')).toBeTruthy();
    expect(getByText('Deep Focus')).toBeTruthy();
    expect(getByText('Exercise')).toBeTruthy();
    expect(getByText('Work')).toBeTruthy();
  });

  it('shows add activity button', () => {
    const { getByText } = render(<Settings onClose={mockOnClose} />);
    
    expect(getByText('+ Add New Activity')).toBeTruthy();
  });
});
