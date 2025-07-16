import { Buddy } from '../components/Settings/interfaces';

export interface BuddyService {
  getBuddy(id: string): Promise<Buddy | undefined>;
  getAllBuddies(): Promise<Buddy[]>;
  createBuddy(buddy: Omit<Buddy, 'id'>): Promise<Buddy>;
  updateBuddy(id: string, buddy: Partial<Buddy>): Promise<Buddy>;
  deleteBuddy(id: string): Promise<void>;
}

export class MockBuddyService implements BuddyService {
  private buddies = new Map<string, Buddy>([
    ['1', { id: '1', name: 'Sarah', relationship: 'Sister' }],
    ['2', { id: '2', name: 'Dad', relationship: 'Father' }],
  ]);

  async getBuddy(id: string): Promise<Buddy | undefined> {
    await this.simulateDelay();
    return this.buddies.get(id);
  }

  async getAllBuddies(): Promise<Buddy[]> {
    await this.simulateDelay();
    return Array.from(this.buddies.values());
  }

  async createBuddy(buddy: Omit<Buddy, 'id'>): Promise<Buddy> {
    await this.simulateDelay();
    const newBuddy: Buddy = {
      ...buddy,
      id: Date.now().toString(),
    };
    this.buddies.set(newBuddy.id, newBuddy);
    return newBuddy;
  }

  async updateBuddy(id: string, updates: Partial<Buddy>): Promise<Buddy> {
    await this.simulateDelay();
    const existing = this.buddies.get(id);
    if (!existing) {
      throw new Error(`Buddy with id ${id} not found`);
    }
    const updated = { ...existing, ...updates, id };
    this.buddies.set(id, updated);
    return updated;
  }

  async deleteBuddy(id: string): Promise<void> {
    await this.simulateDelay();
    this.buddies.delete(id);
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export class ApiBuddyService implements BuddyService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getBuddy(id: string): Promise<Buddy | undefined> {
    const response = await fetch(`${this.baseUrl}/buddies/${id}`);
    if (response.status === 404) {
      return undefined;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch buddy: ${response.statusText}`);
    }
    return response.json();
  }

  async getAllBuddies(): Promise<Buddy[]> {
    const response = await fetch(`${this.baseUrl}/buddies`);
    if (!response.ok) {
      throw new Error(`Failed to fetch buddies: ${response.statusText}`);
    }
    return response.json();
  }

  async createBuddy(buddy: Omit<Buddy, 'id'>): Promise<Buddy> {
    const response = await fetch(`${this.baseUrl}/buddies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buddy),
    });
    if (!response.ok) {
      throw new Error(`Failed to create buddy: ${response.statusText}`);
    }
    return response.json();
  }

  async updateBuddy(id: string, updates: Partial<Buddy>): Promise<Buddy> {
    const response = await fetch(`${this.baseUrl}/buddies/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`Failed to update buddy: ${response.statusText}`);
    }
    return response.json();
  }

  async deleteBuddy(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/buddies/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete buddy: ${response.statusText}`);
    }
  }
}
