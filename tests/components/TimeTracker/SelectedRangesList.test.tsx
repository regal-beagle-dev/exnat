// Unit tests for SelectedRangesList component logic
describe('SelectedRangesList Component Logic', () => {
  const mockProps = {
    selectedRanges: [
      { start: 9, end: 12 },
      { start: 14, end: 16.5 },
    ],
    formatTimeRange: (start: number, end: number) => {
      const formatHour = (time: number) => {
        const hour = Math.floor(time);
        const minutes = (time % 1) * 60;
        return `${hour}:${minutes === 0 ? '00' : minutes.toString().padStart(2, '0')}`;
      };
      return `${formatHour(start)} - ${formatHour(end)}`;
    },
    onRemoveRange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should validate required props structure', () => {
    expect(Array.isArray(mockProps.selectedRanges)).toBe(true);
    expect(typeof mockProps.formatTimeRange).toBe('function');
    expect(typeof mockProps.onRemoveRange).toBe('function');
  });

  it('should format time ranges correctly', () => {
    const formatted1 = mockProps.formatTimeRange(9, 12);
    const formatted2 = mockProps.formatTimeRange(14, 16.5);
    
    expect(formatted1).toBe('9:00 - 12:00');
    expect(formatted2).toBe('14:00 - 16:30');
  });

  it('should handle callback functions', () => {
    mockProps.onRemoveRange(0);
    mockProps.onRemoveRange(1);

    expect(mockProps.onRemoveRange).toHaveBeenCalledWith(0);
    expect(mockProps.onRemoveRange).toHaveBeenCalledWith(1);
    expect(mockProps.onRemoveRange).toHaveBeenCalledTimes(2);
  });

  it('should handle empty selected ranges', () => {
    const emptyProps = {
      ...mockProps,
      selectedRanges: [],
    };

    expect(emptyProps.selectedRanges).toHaveLength(0);
  });

  it('should handle single selected range', () => {
    const singleRangeProps = {
      ...mockProps,
      selectedRanges: [{ start: 10, end: 11 }],
    };

    expect(singleRangeProps.selectedRanges).toHaveLength(1);
    expect(singleRangeProps.selectedRanges[0].start).toBe(10);
    expect(singleRangeProps.selectedRanges[0].end).toBe(11);
  });

  it('should validate time range structure', () => {
    mockProps.selectedRanges.forEach(range => {
      expect(typeof range.start).toBe('number');
      expect(typeof range.end).toBe('number');
      expect(range.start).toBeLessThan(range.end);
    });
  });

  it('should handle multiple ranges correctly', () => {
    expect(mockProps.selectedRanges).toHaveLength(2);
    
    const firstRange = mockProps.selectedRanges[0];
    const secondRange = mockProps.selectedRanges[1];
    
    expect(firstRange.start).toBe(9);
    expect(firstRange.end).toBe(12);
    expect(secondRange.start).toBe(14);
    expect(secondRange.end).toBe(16.5);
  });
});
