import { useCallback, useState } from 'react';
import { TimeRange } from '../components/TimeTracker/interfaces';

export interface TimeSlot {
  time: number; // Time in hours (e.g., 1.33 for 01:20)
  isSelected: boolean;
}

export const MINUTES_PER_INTERVAL = 20;
export const INTERVALS_PER_HOUR = 60 / MINUTES_PER_INTERVAL; // 3 intervals per hour
export const TOTAL_INTERVALS = 24 * INTERVALS_PER_HOUR; // 72 total intervals in a day

export const useTimeTracker = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    Array.from({ length: TOTAL_INTERVALS }, (_, i) => {
      // Calculate hours and minutes precisely to avoid floating point errors
      const totalMinutes = i * MINUTES_PER_INTERVAL;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      return {
        time: hours + minutes / 60,
        isSelected: false,
      };
    })
  );
  const [selectedRanges, setSelectedRanges] = useState<TimeRange[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);

  const formatTime = useCallback((time: number): string => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }, []);

  const parseTimeInput = useCallback((timeStr: string): number | null => {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    
    if (hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) return null;
    
    return hours + minutes / 60;
  }, []);

  const formatTimeRange = useCallback((start: number, end: number): string => {
    const formatTime = (time: number) => {
      const totalMinutes = Math.round(time * 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };
    
    return `${formatTime(start)} - ${formatTime(end)}`;
  }, []);

  const calculateIntervalBounds = useCallback((startTime: number, endTime: number) => {
    const startInterval = Math.floor(Math.min(startTime, endTime) * INTERVALS_PER_HOUR);
    const endInterval = Math.floor(Math.max(startTime, endTime) * INTERVALS_PER_HOUR);
    
    const finalStart = startInterval * (MINUTES_PER_INTERVAL / 60);
    const finalEnd = (endInterval + 1) * (MINUTES_PER_INTERVAL / 60);
    
    return { finalStart, finalEnd };
  }, []);

  const calculateTotalTime = useCallback((): { hours: number; minutes: number; totalHours: number } => {
    const totalHours = selectedRanges.reduce((sum, range) => sum + (range.end - range.start), 0);
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    
    return { hours, minutes, totalHours };
  }, [selectedRanges]);

  const updateSelectionPreview = useCallback((time: number) => {
    if (isSelecting && selectionStart !== null) {
      const { finalStart, finalEnd } = calculateIntervalBounds(selectionStart, time);
      
      if (__DEV__) {
        console.log('Preview Update:', {
          from: formatTime(selectionStart),
          to: formatTime(time),
          previewStart: formatTime(finalStart),
          previewEnd: formatTime(finalEnd)
        });
      }
      
      setTimeSlots(prev => prev.map(slot => ({
        ...slot,
        isSelected: slot.time >= finalStart && slot.time < finalEnd
      })));
    }
  }, [isSelecting, selectionStart, calculateIntervalBounds, formatTime]);

  const startSelection = useCallback((time: number) => {
    setIsSelecting(true);
    setSelectionStart(time);
    setTimeSlots(prev =>
      prev.map(slot => ({
        ...slot,
        isSelected: slot.time === time,
      }))
    );
  }, []);

  const isRangeOverlapping = useCallback((newStart: number, newEnd: number): boolean => {
    return selectedRanges.some(range => 
      (newStart < range.end && newEnd > range.start)
    );
  }, [selectedRanges]);

  const completeSelection = useCallback((time: number) => {
    if (selectionStart !== null) {
      const { finalStart, finalEnd } = calculateIntervalBounds(selectionStart, time);

      if (__DEV__) {
        console.log('Time Selection Debug:', {
          selectionStart: selectionStart,
          endTime: time,
          selectionStartFormatted: formatTime(selectionStart),
          endTimeFormatted: formatTime(time),
          resultStart: finalStart,
          resultEnd: finalEnd,
          resultStartFormatted: formatTime(finalStart),
          resultEndFormatted: formatTime(finalEnd)
        });
      }

      if (isRangeOverlapping(finalStart, finalEnd)) {
        if (__DEV__) {
          console.warn('Range overlaps with existing selection, skipping');
        }
        setIsSelecting(false);
        setSelectionStart(null);
        setTimeSlots(prev => prev.map(slot => ({ ...slot, isSelected: false })));
        return;
      }

      setSelectedRanges(prev => [...prev, { start: finalStart, end: finalEnd }]);
      setIsSelecting(false);
      setSelectionStart(null);
      setTimeSlots(prev => prev.map(slot => ({ ...slot, isSelected: false })));
    }
  }, [selectionStart, calculateIntervalBounds, formatTime, isRangeOverlapping]);

  const cancelSelection = useCallback(() => {
    setIsSelecting(false);
    setSelectionStart(null);
    setTimeSlots(prev => prev.map(slot => ({ ...slot, isSelected: false })));
  }, []);

  const isTimeInRange = useCallback((time: number): boolean => {
    return selectedRanges.some(range => time >= range.start && time < range.end);
  }, [selectedRanges]);

  const addCustomTimeRange = useCallback((startTimeStr: string, endTimeStr: string): { success: boolean; error?: string } => {
    const start = parseTimeInput(startTimeStr);
    const end = parseTimeInput(endTimeStr);
    
    if (start === null || end === null) {
      return { success: false, error: 'Please enter time in HH:MM format (e.g., 14:30)' };
    }
    
    if (start >= end) {
      return { success: false, error: 'End time must be after start time' };
    }
    
    const newRange: TimeRange = { start, end };
    setSelectedRanges(prev => [...prev, newRange]);
    
    return { success: true };
  }, [parseTimeInput]);

  const removeRange = useCallback((index: number) => {
    setSelectedRanges(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearAllRanges = useCallback(() => {
    setSelectedRanges([]);
  }, []);

  const getFilteredTimeSlots = useCallback((timeMode: 'AM' | 'PM', defaultTimeRanges?: { morning: TimeRange; evening: TimeRange }) => {
    return timeSlots.filter(slot => {
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
  }, [timeSlots]);

  return {
    // State
    timeSlots,
    selectedRanges,
    isSelecting,
    selectionStart,
    
    // Time formatting
    formatTime,
    parseTimeInput,
    formatTimeRange,
    
    // Time calculations
    calculateTotalTime,
    
    // Selection management
    updateSelectionPreview,
    startSelection,
    completeSelection,
    cancelSelection,
    
    // Range management
    isTimeInRange,
    isRangeOverlapping,
    addCustomTimeRange,
    removeRange,
    clearAllRanges,
    
    // Utilities
    getFilteredTimeSlots,
  };
};
