import { ActivityCategory } from '../components/Settings/interfaces';

export interface CategoryService {
  getCategory(id: string): Promise<ActivityCategory | undefined>;
  getAllCategories(): Promise<ActivityCategory[]>;
  createCategory(category: Omit<ActivityCategory, 'id'>): Promise<ActivityCategory>;
  updateCategory(id: string, category: Partial<ActivityCategory>): Promise<ActivityCategory>;
  deleteCategory(id: string): Promise<void>;
}

export class MockCategoryService implements CategoryService {
  private categories = new Map<string, ActivityCategory>([
    ['1', { id: '1', name: 'Fitness', emoji: '💪' }],
    ['2', { id: '2', name: 'Work', emoji: '💼' }],
    ['3', { id: '3', name: 'Social', emoji: '👥' }],
    ['4', { id: '4', name: 'Hobby', emoji: '🎨' }],
  ]);

  async getCategory(id: string): Promise<ActivityCategory | undefined> {
    await this.simulateDelay();
    return this.categories.get(id);
  }

  async getAllCategories(): Promise<ActivityCategory[]> {
    await this.simulateDelay();
    return Array.from(this.categories.values());
  }

  async createCategory(category: Omit<ActivityCategory, 'id'>): Promise<ActivityCategory> {
    await this.simulateDelay();
    const newCategory: ActivityCategory = {
      ...category,
      id: `category_${Date.now()}`,
    };
    this.categories.set(newCategory.id, newCategory);
    return newCategory;
  }

  async updateCategory(id: string, updates: Partial<ActivityCategory>): Promise<ActivityCategory> {
    await this.simulateDelay();
    const existing = this.categories.get(id);
    if (!existing) {
      throw new Error(`Category with id ${id} not found`);
    }
    const updated = { ...existing, ...updates, id };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.simulateDelay();
    this.categories.delete(id);
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export class ApiCategoryService implements CategoryService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getCategory(id: string): Promise<ActivityCategory | undefined> {
    const response = await fetch(`${this.baseUrl}/categories/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }
    return response.json();
  }

  async getAllCategories(): Promise<ActivityCategory[]> {
    const response = await fetch(`${this.baseUrl}/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return response.json();
  }

  async createCategory(category: Omit<ActivityCategory, 'id'>): Promise<ActivityCategory> {
    const response = await fetch(`${this.baseUrl}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error(`Failed to create category: ${response.statusText}`);
    }
    return response.json();
  }

  async updateCategory(id: string, updates: Partial<ActivityCategory>): Promise<ActivityCategory> {
    const response = await fetch(`${this.baseUrl}/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`Failed to update category: ${response.statusText}`);
    }
    return response.json();
  }

  async deleteCategory(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.statusText}`);
    }
  }
}
