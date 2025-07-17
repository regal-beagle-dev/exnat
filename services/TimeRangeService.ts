import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimeRange } from '../components/TimeTracker/interfaces';

export interface DefaultTimeRanges {
  morning: TimeRange;
  evening: TimeRange;
}

export interface TimeRangeService {
  getDefaultTimeRanges(): Promise<DefaultTimeRanges>;
  updateDefaultTimeRanges(ranges: DefaultTimeRanges): Promise<void>;
  updateMorningRange(range: TimeRange): Promise<void>;
  updateEveningRange(range: TimeRange): Promise<void>;
}

export class MockTimeRangeService implements TimeRangeService {
  private defaultRanges: DefaultTimeRanges = {
    morning: { start: 6, end: 12 },
    evening: { start: 12, end: 22 },
  };

  async getDefaultTimeRanges(): Promise<DefaultTimeRanges> {
    await this.simulateDelay();
    return { ...this.defaultRanges };
  }

  async updateDefaultTimeRanges(ranges: DefaultTimeRanges): Promise<void> {
    await this.simulateDelay();
    this.defaultRanges = { ...ranges };
  }

  async updateMorningRange(range: TimeRange): Promise<void> {
    await this.simulateDelay();
    this.defaultRanges.morning = { ...range };
  }

  async updateEveningRange(range: TimeRange): Promise<void> {
    await this.simulateDelay();
    this.defaultRanges.evening = { ...range };
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 100));
  }
}

export class StorageTimeRangeService implements TimeRangeService {
  private readonly storageKey = 'default_time_ranges';
  private readonly defaultRanges: DefaultTimeRanges = {
    morning: { start: 6, end: 12 },
    evening: { start: 12, end: 22 },
  };

  async getDefaultTimeRanges(): Promise<DefaultTimeRanges> {
    try {
      const stored = await AsyncStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load default time ranges:', error);
    }
    return { ...this.defaultRanges };
  }

  async updateDefaultTimeRanges(ranges: DefaultTimeRanges): Promise<void> {
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(ranges));
    } catch (error) {
      console.error('Failed to save default time ranges:', error);
      throw error;
    }
  }

  async updateMorningRange(range: TimeRange): Promise<void> {
    const currentRanges = await this.getDefaultTimeRanges();
    const updated = { ...currentRanges, morning: range };
    await this.updateDefaultTimeRanges(updated);
  }

  async updateEveningRange(range: TimeRange): Promise<void> {
    const currentRanges = await this.getDefaultTimeRanges();
    const updated = { ...currentRanges, evening: range };
    await this.updateDefaultTimeRanges(updated);
  }
}

export class ApiTimeRangeService implements TimeRangeService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getDefaultTimeRanges(): Promise<DefaultTimeRanges> {
    const response = await fetch(`${this.baseUrl}/user/default-time-ranges`);
    if (!response.ok) {
      throw new Error(`Failed to fetch default time ranges: ${response.statusText}`);
    }
    return response.json();
  }

  async updateDefaultTimeRanges(ranges: DefaultTimeRanges): Promise<void> {
    const response = await fetch(`${this.baseUrl}/user/default-time-ranges`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ranges),
    });
    if (!response.ok) {
      throw new Error(`Failed to update default time ranges: ${response.statusText}`);
    }
  }

  async updateMorningRange(range: TimeRange): Promise<void> {
    const response = await fetch(`${this.baseUrl}/user/default-time-ranges/morning`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(range),
    });
    if (!response.ok) {
      throw new Error(`Failed to update morning range: ${response.statusText}`);
    }
  }

  async updateEveningRange(range: TimeRange): Promise<void> {
    const response = await fetch(`${this.baseUrl}/user/default-time-ranges/evening`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(range),
    });
    if (!response.ok) {
      throw new Error(`Failed to update evening range: ${response.statusText}`);
    }
  }
}
