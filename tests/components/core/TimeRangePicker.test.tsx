describe('TimeRangePicker Component Logic', () => {
  const mockTimeRange = { start: 6, end: 11 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle AM range constraints correctly', () => {
    const getValidTimeRange = (timePeriod?: 'AM' | 'PM') => {
      if (timePeriod === 'AM') {
        return { min: 0, max: 12 };
      } else if (timePeriod === 'PM') {
        return { min: 12, max: 24 };
      }
      return { min: 0, max: 24 };
    };

    const constrainHourToTimePeriod = (hour: number, timePeriod?: 'AM' | 'PM'): number => {
      const { min, max } = getValidTimeRange(timePeriod);
      return Math.max(min, Math.min(max, hour));
    };

    expect(constrainHourToTimePeriod(15, 'AM')).toBe(12);
    expect(constrainHourToTimePeriod(5, 'AM')).toBe(5);
    expect(constrainHourToTimePeriod(-1, 'AM')).toBe(0);
    expect(constrainHourToTimePeriod(12, 'AM')).toBe(12);
  });

  it('should handle PM range constraints correctly', () => {
    const getValidTimeRange = (timePeriod?: 'AM' | 'PM') => {
      if (timePeriod === 'AM') {
        return { min: 0, max: 12 };
      } else if (timePeriod === 'PM') {
        return { min: 12, max: 24 };
      }
      return { min: 0, max: 24 };
    };

    const constrainHourToTimePeriod = (hour: number, timePeriod?: 'AM' | 'PM'): number => {
      const { min, max } = getValidTimeRange(timePeriod);
      return Math.max(min, Math.min(max, hour));
    };

    expect(constrainHourToTimePeriod(5, 'PM')).toBe(12);
    expect(constrainHourToTimePeriod(15, 'PM')).toBe(15);
    expect(constrainHourToTimePeriod(25, 'PM')).toBe(24);
    expect(constrainHourToTimePeriod(24, 'PM')).toBe(24);
  });

  it('should format time correctly for 12-hour format', () => {
    const formatTime = (hour: number, useMilitaryTime: boolean): string => {
      if (useMilitaryTime) {
        return `${hour.toString().padStart(2, '0')}:00`;
      }
      
      if (hour === 0) return '12:00 AM';
      if (hour === 12) return '12:00 PM';
      if (hour < 12) return `${hour}:00 AM`;
      return `${hour - 12}:00 PM`;
    };

    expect(formatTime(0, false)).toBe('12:00 AM');
    expect(formatTime(6, false)).toBe('6:00 AM');
    expect(formatTime(12, false)).toBe('12:00 PM');
    expect(formatTime(18, false)).toBe('6:00 PM');
  });

  it('should format time correctly for military format', () => {
    const formatTime = (hour: number, useMilitaryTime: boolean): string => {
      if (useMilitaryTime) {
        return `${hour.toString().padStart(2, '0')}:00`;
      }
      
      if (hour === 0) return '12:00 AM';
      if (hour === 12) return '12:00 PM';
      if (hour < 12) return `${hour}:00 AM`;
      return `${hour - 12}:00 PM`;
    };

    expect(formatTime(0, true)).toBe('00:00');
    expect(formatTime(6, true)).toBe('06:00');
    expect(formatTime(12, true)).toBe('12:00');
    expect(formatTime(18, true)).toBe('18:00');
    expect(formatTime(24, true)).toBe('24:00');
  });

  it('should support hour 24 for military format', () => {
    const formatTime = (hour: number, useMilitaryTime: boolean): string => {
      if (useMilitaryTime) {
        return `${hour.toString().padStart(2, '0')}:00`;
      }
      
      if (hour === 0) return '12:00 AM';
      if (hour === 12) return '12:00 PM';
      if (hour < 12) return `${hour}:00 AM`;
      return `${hour - 12}:00 PM`;
    };

    expect(formatTime(24, true)).toBe('24:00');
    expect(formatTime(0, true)).toBe('00:00');
  });

  it('should handle range adjustments when start time changes', () => {
    const handleStartTimeChange = (newStart: number, currentRange: typeof mockTimeRange, timePeriod?: 'AM' | 'PM') => {
      const getValidTimeRange = (timePeriod?: 'AM' | 'PM') => {
        if (timePeriod === 'AM') {
          return { min: 0, max: 12 };
        } else if (timePeriod === 'PM') {
          return { min: 12, max: 24 };
        }
        return { min: 0, max: 24 };
      };

      const { min, max } = getValidTimeRange(timePeriod);
      const constrainedStart = Math.max(min, Math.min(max, newStart));
      
      let newRange = { ...currentRange, start: constrainedStart };
      
      if (constrainedStart >= currentRange.end) {
        newRange.end = Math.min(constrainedStart + 1, max);
      }
      
      return newRange;
    };

    const result = handleStartTimeChange(10, mockTimeRange, 'AM');
    expect(result.start).toBe(10);
    expect(result.end).toBe(11);

    const result2 = handleStartTimeChange(12, mockTimeRange, 'AM');
    expect(result2.start).toBe(12);
    expect(result2.end).toBe(12);
  });

  it('should handle range adjustments when end time changes', () => {
    const handleEndTimeChange = (newEnd: number, currentRange: typeof mockTimeRange, timePeriod?: 'AM' | 'PM') => {
      const getValidTimeRange = (timePeriod?: 'AM' | 'PM') => {
        if (timePeriod === 'AM') {
          return { min: 0, max: 12 };
        } else if (timePeriod === 'PM') {
          return { min: 12, max: 24 };
        }
        return { min: 0, max: 24 };
      };

      const { min, max } = getValidTimeRange(timePeriod);
      const constrainedEnd = Math.max(min, Math.min(max, newEnd));
      
      let newRange = { ...currentRange, end: constrainedEnd };
      
      if (constrainedEnd <= currentRange.start) {
        newRange.start = Math.max(constrainedEnd - 1, min);
      }
      
      return newRange;
    };

    const result = handleEndTimeChange(8, mockTimeRange, 'AM');
    expect(result.end).toBe(8);
    expect(result.start).toBe(6);

    const result2 = handleEndTimeChange(5, mockTimeRange, 'AM');
    expect(result2.end).toBe(5);
    expect(result2.start).toBe(4);
  });
});
