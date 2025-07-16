import { API_BASE_URL, USE_MOCK_SERVICES } from '../config/environment';
import { ActivityService, ApiActivityService, MockActivityService } from './ActivityService';
import { ApiCategoryService, CategoryService, MockCategoryService } from './CategoryService';

export interface ServiceConfig {
  useMocks: boolean;
  apiBaseUrl?: string;
}

export class ServiceProvider {
  private config: ServiceConfig;
  private activityService?: ActivityService;
  private categoryService?: CategoryService;

  constructor(config: ServiceConfig) {
    this.config = config;
  }

  getActivityService(): ActivityService {
    if (!this.activityService) {
      this.activityService = this.config.useMocks
        ? new MockActivityService()
        : new ApiActivityService(this.config.apiBaseUrl || '');
    }
    return this.activityService;
  }

  getCategoryService(): CategoryService {
    if (!this.categoryService) {
      this.categoryService = this.config.useMocks
        ? new MockCategoryService()
        : new ApiCategoryService(this.config.apiBaseUrl || '');
    }
    return this.categoryService;
  }

  updateConfig(config: Partial<ServiceConfig>): void {
    this.config = { ...this.config, ...config };
    this.activityService = undefined;
    this.categoryService = undefined;
  }
}

const defaultConfig: ServiceConfig = {
  useMocks: USE_MOCK_SERVICES,
  apiBaseUrl: API_BASE_URL,
};

export const serviceProvider = new ServiceProvider(defaultConfig);
