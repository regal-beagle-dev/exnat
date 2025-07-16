import { Activity } from '../components/Settings/interfaces';

export interface ActivityService {
  getActivity(id: string): Promise<Activity | undefined>;
  getAllActivities(): Promise<Activity[]>;
  createActivity(activity: Omit<Activity, 'id'>): Promise<Activity>;
  updateActivity(id: string, activity: Partial<Activity>): Promise<Activity>;
  deleteActivity(id: string): Promise<void>;
}

export class MockActivityService implements ActivityService {
  private activities = new Map<string, Activity>([
    ['1', { 
      id: '1', 
      name: 'Morning Jog', 
      emoji: '🏃‍♂️', 
      category: { id: '1', name: 'Fitness', emoji: '💪' } 
    }],
    ['2', { 
      id: '2', 
      name: 'Deep Focus', 
      emoji: '🧠', 
      category: { id: '2', name: 'Work', emoji: '💼' } 
    }],
    ['3', { 
      id: '3', 
      name: 'Reading', 
      emoji: '📚', 
      category: { id: '4', name: 'Hobby', emoji: '🎨' } 
    }],
  ]);

  async getActivity(id: string): Promise<Activity | undefined> {
    await this.simulateDelay();
    return this.activities.get(id);
  }

  async getAllActivities(): Promise<Activity[]> {
    await this.simulateDelay();
    return Array.from(this.activities.values());
  }

  async createActivity(activity: Omit<Activity, 'id'>): Promise<Activity> {
    await this.simulateDelay();
    const newActivity: Activity = {
      ...activity,
      id: `activity_${Date.now()}`,
    };
    this.activities.set(newActivity.id, newActivity);
    return newActivity;
  }

  async updateActivity(id: string, updates: Partial<Activity>): Promise<Activity> {
    await this.simulateDelay();
    const existing = this.activities.get(id);
    if (!existing) {
      throw new Error(`Activity with id ${id} not found`);
    }
    const updated = { ...existing, ...updates, id };
    this.activities.set(id, updated);
    return updated;
  }

  async deleteActivity(id: string): Promise<void> {
    await this.simulateDelay();
    this.activities.delete(id);
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export class ApiActivityService implements ActivityService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getActivity(id: string): Promise<Activity | undefined> {
    const response = await fetch(`${this.baseUrl}/activities/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error(`Failed to fetch activity: ${response.statusText}`);
    }
    return response.json();
  }

  async getAllActivities(): Promise<Activity[]> {
    const response = await fetch(`${this.baseUrl}/activities`);
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.statusText}`);
    }
    return response.json();
  }

  async createActivity(activity: Omit<Activity, 'id'>): Promise<Activity> {
    const response = await fetch(`${this.baseUrl}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity),
    });
    if (!response.ok) {
      throw new Error(`Failed to create activity: ${response.statusText}`);
    }
    return response.json();
  }

  async updateActivity(id: string, updates: Partial<Activity>): Promise<Activity> {
    const response = await fetch(`${this.baseUrl}/activities/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`Failed to update activity: ${response.statusText}`);
    }
    return response.json();
  }

  async deleteActivity(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/activities/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete activity: ${response.statusText}`);
    }
  }
}
