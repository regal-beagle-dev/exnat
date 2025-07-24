import { MockTimeRangeService } from '../../services/TimeRangeService';

describe('TimeRangeService', () => {
  describe('MockTimeRangeService', () => {
    let service: MockTimeRangeService;

    beforeEach(() => {
      service = new MockTimeRangeService();
    });

    it('should return default time ranges', async () => {
      const ranges = await service.getDefaultTimeRanges();
      
      expect(ranges.morning.start).toBe(6);
      expect(ranges.morning.end).toBe(12);
      expect(ranges.evening.start).toBe(12);
      expect(ranges.evening.end).toBe(22);
    });

    it('should update morning range', async () => {
      const newRange = { start: 7, end: 11 };
      await service.updateMorningRange(newRange);
      
      const ranges = await service.getDefaultTimeRanges();
      expect(ranges.morning).toEqual(newRange);
      expect(ranges.evening.start).toBe(12);
      expect(ranges.evening.end).toBe(22);
    });

    it('should update evening range', async () => {
      const newRange = { start: 13, end: 20 };
      await service.updateEveningRange(newRange);
      
      const ranges = await service.getDefaultTimeRanges();
      expect(ranges.evening).toEqual(newRange);
      expect(ranges.morning.start).toBe(6);
      expect(ranges.morning.end).toBe(12);
    });

    it('should update both ranges', async () => {
      const newRanges = {
        morning: { start: 5, end: 10 },
        evening: { start: 14, end: 21 },
      };
      
      await service.updateDefaultTimeRanges(newRanges);
      
      const ranges = await service.getDefaultTimeRanges();
      expect(ranges).toEqual(newRanges);
    });
  });
});
