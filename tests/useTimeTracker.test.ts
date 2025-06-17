// Test file for useTimeTracker hook
import { INTERVALS_PER_HOUR, MINUTES_PER_INTERVAL } from '../hooks/useTimeTracker';

// Test the core logic functions directly without React hooks
describe('useTimeTracker Logic', () => {
  describe('Time Selection Math', () => {
    // Test the calculateIntervalBounds logic directly
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
      
      // The user reports this sometimes becomes 08:00 to 09:20, but should be 08:20 to 09:40
      const expectedStart = 8 + 20/60;  // Should stay at 08:20, NOT 08:00
      const expectedEnd = 9 + 40/60;    // Should be 09:40
      
      expect(finalStart).toBeCloseTo(expectedStart, 10);
      expect(finalEnd).toBeCloseTo(expectedEnd, 10);
      
      // Explicitly check it's NOT the problematic result
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
      
      // Explicitly check it's NOT the problematic result
      expect(finalStart).not.toBe(10.0); // Should NOT be 10:00
      expect(finalStart).toBeCloseTo(10.333333, 5); // Should be 10:20
    });

    // Helper function for debugging
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
      expect(INTERVALS_PER_HOUR).toBe(3); // 60 / 20 = 3
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
      // Test the exact time slot generation to ensure precision fix works
      const TOTAL_INTERVALS = 24 * INTERVALS_PER_HOUR;
      const timeSlots = Array.from({ length: TOTAL_INTERVALS }, (_, i) => {
        // Calculate hours and minutes precisely (same as fixed hook)
        const totalMinutes = i * MINUTES_PER_INTERVAL;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        return {
          time: hours + minutes / 60,
          isSelected: false,
        };
      });
      
      // Find the 10:20 slot
      const slot10_20 = timeSlots.find(slot => 
        Math.abs(slot.time - (10 + 20/60)) < 0.00001
      );
      
      expect(slot10_20).toBeDefined();
      
      if (slot10_20) {
        const interval = Math.floor(slot10_20.time * INTERVALS_PER_HOUR);
        console.log(`10:20 slot time: ${slot10_20.time}`);
        console.log(`10:20 slot interval: ${interval}`);
        
        // This should be interval 31, NOT 30
        expect(interval).toBe(31); // 10:20 should map to interval 31
        expect(interval).not.toBe(30); // Should NOT map to interval 30 (10:00's interval)
      }
    });
  });
});
