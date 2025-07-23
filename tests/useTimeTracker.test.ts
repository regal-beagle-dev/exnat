import { INTERVALS_PER_HOUR, MINUTES_PER_INTERVAL } from '../hooks/useTimeTracker';

describe('useTimeTracker Logic', () => {
  describe('Time Selection Math', () => {
    const calculateIntervalBounds = (startTime: number, endTime: number) => {
      const startInterval = Math.floor(Math.min(startTime, endTime) * INTERVALS_PER_HOUR);
      const endInterval = Math.floor(Math.max(startTime, endTime) * INTERVALS_PER_HOUR);
      
      const finalStart = startInterval * (MINUTES_PER_INTERVAL / 60);
      const finalEnd = (endInterval + 1) * (MINUTES_PER_INTERVAL / 60);
      
      return { finalStart, finalEnd };
    };

    test('Test Case 1: 08:00 + 08:00 should result in 08:00 - 08:20', () => {
      const time08_00 = 8.0;  // 08:00
      
      const { finalStart, finalEnd } = calculateIntervalBounds(time08_00, time08_00);
      
      // Expected: 08:00 - 08:20
      expect(finalStart).toBe(8.0);
      expect(finalEnd).toBeCloseTo(8 + 20/60, 10); // 08:20
    });

    test('Test Case 2: 08:00 + 08:40 should result in 08:00 - 09:00', () => {
      const time08_00 = 8.0;    // 08:00
      const time08_40 = 8 + 40/60;  // 08:40
      
      const { finalStart, finalEnd } = calculateIntervalBounds(time08_00, time08_40);
      
      // Expected: 08:00 - 09:00
      expect(finalStart).toBe(8.0);
      expect(finalEnd).toBe(9.0);
    });

    test('Test Case 3: 08:20 + 09:20 should result in 08:20 - 09:40', () => {
      const time08_20 = 8 + 20/60;  // 08:20
      const time09_20 = 9 + 20/60;  // 09:20
      
      const { finalStart, finalEnd } = calculateIntervalBounds(time08_20, time09_20);
      
      // Expected: 08:20 - 09:40
      const expectedStart = 8 + 20/60;  // 08:20
      const expectedEnd = 9 + 40/60;    // 09:40
      
      expect(finalStart).toBeCloseTo(expectedStart, 10);
      expect(finalEnd).toBeCloseTo(expectedEnd, 10);
    });

    test('Reverse selection should work (end before start)', () => {
      const time08_40 = 8 + 40/60;  // 08:40
      const time08_00 = 8.0;        // 08:00
      
      const { finalStart, finalEnd } = calculateIntervalBounds(time08_40, time08_00);
      
      // Should still result in 08:00 - 09:00 (normalized)
      expect(finalStart).toBe(8.0);
      expect(finalEnd).toBe(9.0);
    });

    test('Edge case: 08:20 + 08:20 should result in 08:20 - 08:40', () => {
      const time08_20 = 8 + 20/60;  // 08:20
      
      const { finalStart, finalEnd } = calculateIntervalBounds(time08_20, time08_20);
      
      // Expected: 08:20 - 08:40 (same time selected twice should give one interval)
      const expectedStart = 8 + 20/60;  // 08:20
      const expectedEnd = 8 + 40/60;    // 08:40
      
      expect(finalStart).toBeCloseTo(expectedStart, 10);
      expect(finalEnd).toBeCloseTo(expectedEnd, 10);
    });

    test('Edge case: Cross hour boundary 08:40 + 09:00 should result in 08:40 - 09:20', () => {
      const time08_40 = 8 + 40/60;  // 08:40
      const time09_00 = 9.0;        // 09:00
      
      const { finalStart, finalEnd } = calculateIntervalBounds(time08_40, time09_00);
      
      // Expected: 08:40 - 09:20
      const expectedStart = 8 + 40/60;  // 08:40
      const expectedEnd = 9 + 20/60;    // 09:20
      
      expect(finalStart).toBeCloseTo(expectedStart, 10);
      expect(finalEnd).toBeCloseTo(expectedEnd, 10);
    });

    test('Problem case identified by user: 08:20 to 09:20 should NOT become 08:00 to 09:20', () => {
      const time08_20 = 8 + 20/60;  // 08:20
      const time09_20 = 9 + 20/60;  // 09:20
      
      const { finalStart, finalEnd } = calculateIntervalBounds(time08_20, time09_20);
      
      const expectedStart = 8 + 20/60;  // Should stay at 08:20, NOT 08:00
      const expectedEnd = 9 + 40/60;    // Should be 09:40
      
      expect(finalStart).toBeCloseTo(expectedStart, 10);
      expect(finalEnd).toBeCloseTo(expectedEnd, 10);
      
      expect(finalStart).not.toBe(8.0); // Should NOT be 08:00
    });

    test('10:20 + 11:20 should result in 10:20 - 11:40 (NOT 10:00 - 11:40)', () => {
      const time10_20 = 10 + 20/60;  // 10:20 = 10.333...
      const time11_20 = 11 + 20/60;  // 11:20 = 11.333...
      
      const { finalStart, finalEnd } = calculateIntervalBounds(time10_20, time11_20);
      
      // Log the actual values for debugging
      console.log('10:20 to 11:20 calculation:');
      console.log('Input times:', { time10_20, time11_20 });
      console.log('Intervals:', { 
        startInterval: Math.floor(time10_20 * INTERVALS_PER_HOUR),
        endInterval: Math.floor(time11_20 * INTERVALS_PER_HOUR)
      });
      console.log('Results:', { finalStart, finalEnd });
      console.log('Formatted:', {
        start: formatTimeHelper(finalStart),
        end: formatTimeHelper(finalEnd)
      });
      
      // Expected: 10:20 - 11:40
      const expectedStart = 10 + 20/60;  // Should be 10:20
      const expectedEnd = 11 + 40/60;    // Should be 11:40
      
      expect(finalStart).toBeCloseTo(expectedStart, 10);
      expect(finalEnd).toBeCloseTo(expectedEnd, 10);
      
      expect(finalStart).not.toBe(10.0);
      expect(finalStart).toBeCloseTo(10.333333, 5);
    });

    const formatTimeHelper = (time: number): string => {
      const hours = Math.floor(time);
      const minutes = Math.round((time - hours) * 60);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };
  });

  describe('Time Formatting', () => {
    const formatTime = (time: number): string => {
      const hours = Math.floor(time);
      const minutes = Math.round((time - hours) * 60);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    test('Time formatting should be consistent', () => {
      expect(formatTime(8.0)).toBe('08:00');
      expect(formatTime(8 + 20/60)).toBe('08:20');
      expect(formatTime(8 + 40/60)).toBe('08:40');
      expect(formatTime(9.0)).toBe('09:00');
      expect(formatTime(9 + 20/60)).toBe('09:20');
      expect(formatTime(9 + 40/60)).toBe('09:40');
    });
  });

  describe('Interval Calculations', () => {
    test('20-minute intervals should be calculated correctly', () => {
      expect(MINUTES_PER_INTERVAL).toBe(20);
      expect(INTERVALS_PER_HOUR).toBe(3);
    });

    test('Time to interval conversion should work', () => {
      // 08:00 = interval 24 (8 hours * 3 intervals per hour)
      expect(Math.floor(8.0 * INTERVALS_PER_HOUR)).toBe(24);
      
      // 08:20 = interval 25 (8.333... hours * 3)
      expect(Math.floor((8 + 20/60) * INTERVALS_PER_HOUR)).toBe(25);
      
      // 08:40 = interval 26 (8.666... hours * 3)
      expect(Math.floor((8 + 40/60) * INTERVALS_PER_HOUR)).toBe(26);
    });
  test('Time slot precision should map correctly to intervals', () => {
      const TOTAL_INTERVALS = 24 * INTERVALS_PER_HOUR;
      const timeSlots = Array.from({ length: TOTAL_INTERVALS }, (_, i) => {
        const totalMinutes = i * MINUTES_PER_INTERVAL;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        return {
          time: hours + minutes / 60,
          isSelected: false,
        };
      });
      
      const slot10_20 = timeSlots.find(slot => 
        Math.abs(slot.time - (10 + 20/60)) < 0.00001
      );
      
      expect(slot10_20).toBeDefined();
      
      if (slot10_20) {
        const interval = Math.floor(slot10_20.time * INTERVALS_PER_HOUR);
        console.log(`10:20 slot time: ${slot10_20.time}`);
        console.log(`10:20 slot interval: ${interval}`);
        
        expect(interval).toBe(31);
        expect(interval).not.toBe(30);
      }
    });
  });

  describe('Time Slot Filtering with Default Ranges', () => {
    const mockTimeSlots = Array.from({ length: 72 }, (_, i) => {
      const totalMinutes = i * 20;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      return {
        time: hours + minutes / 60,
        isSelected: false,
      };
    });

    const getFilteredTimeSlots = (timeMode: 'AM' | 'PM', defaultTimeRanges?: { morning: { start: number; end: number }; evening: { start: number; end: number } }) => {
      return mockTimeSlots.filter(slot => {
        const hour = Math.floor(slot.time);
        
        if (timeMode === 'AM') {
          const baseFilter = hour >= 0 && hour < 12;
          if (!baseFilter) return false;
          
          if (defaultTimeRanges) {
            const morningStart = Math.floor(defaultTimeRanges.morning.start);
            const morningEnd = Math.floor(defaultTimeRanges.morning.end);
            return hour >= morningStart && hour < morningEnd;
          }
          
          return true;
        } else {
          const baseFilter = hour >= 12 && hour < 24;
          if (!baseFilter) return false;
          
          if (defaultTimeRanges) {
            const eveningStart = Math.floor(defaultTimeRanges.evening.start);
            const eveningEnd = Math.floor(defaultTimeRanges.evening.end);
            return hour >= eveningStart && hour < eveningEnd;
          }
          
          return true;
        }
      });
    };

    test('should filter AM slots based on morning range', () => {
      const defaultTimeRanges = {
        morning: { start: 8, end: 10 },
        evening: { start: 14, end: 18 }
      };
      
      const amSlots = getFilteredTimeSlots('AM', defaultTimeRanges);
      
      amSlots.forEach(slot => {
        const hour = Math.floor(slot.time);
        expect(hour).toBeGreaterThanOrEqual(8);
        expect(hour).toBeLessThan(10);
      });
    });

    test('should filter PM slots based on evening range', () => {
      const defaultTimeRanges = {
        morning: { start: 8, end: 10 },
        evening: { start: 14, end: 18 }
      };
      
      const pmSlots = getFilteredTimeSlots('PM', defaultTimeRanges);
      
      pmSlots.forEach(slot => {
        const hour = Math.floor(slot.time);
        expect(hour).toBeGreaterThanOrEqual(14);
        expect(hour).toBeLessThan(18);
      });
    });

    test('should show all slots when no default ranges provided', () => {
      const amSlots = getFilteredTimeSlots('AM');
      const pmSlots = getFilteredTimeSlots('PM');
      
      const amHours = amSlots.map(slot => Math.floor(slot.time));
      const pmHours = pmSlots.map(slot => Math.floor(slot.time));
      
      expect(amHours).toContain(0);
      expect(amHours).toContain(11);
      expect(pmHours).toContain(12);
      expect(pmHours).toContain(23);
    });

    test('should handle edge case with narrow time ranges', () => {
      const defaultTimeRanges = {
        morning: { start: 9, end: 10 },
        evening: { start: 15, end: 16 }
      };
      
      const amSlots = getFilteredTimeSlots('AM', defaultTimeRanges);
      const pmSlots = getFilteredTimeSlots('PM', defaultTimeRanges);
      
      const amHours = [...new Set(amSlots.map(slot => Math.floor(slot.time)))];
      const pmHours = [...new Set(pmSlots.map(slot => Math.floor(slot.time)))];
      
      expect(amHours).toEqual([9]);
      expect(pmHours).toEqual([15]);
    });
  });
});
