import { API_BASE_URL, USE_MOCK_SERVICES } from '../config/environment';
import { ActivityService, ApiActivityService, MockActivityService } from './ActivityService';
import { ApiBuddyService, BuddyService, MockBuddyService } from './BuddyService';
import { ApiCategoryService, CategoryService, MockCategoryService } from './CategoryService';
import { ApiSettingsService, SettingsService, StorageSettingsService } from './SettingsService';
import { ApiTimeRangeService, MockTimeRangeService, TimeRangeService } from './TimeRangeService';

export interface ServiceConfig {
  useMocks: boolean;
  apiBaseUrl?: string;
}

export class ServiceProvider {
  private config: ServiceConfig;
  private activityService?: ActivityService;
  private categoryService?: CategoryService;
  private buddyService?: BuddyService;
  private timeRangeService?: TimeRangeService;
  private settingsService?: SettingsService;

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

  getBuddyService(): BuddyService {
    if (!this.buddyService) {
      this.buddyService = this.config.useMocks
        ? new MockBuddyService()
        : new ApiBuddyService(this.config.apiBaseUrl || '');
    }
    return this.buddyService;
  }

  getTimeRangeService(): TimeRangeService {
    if (!this.timeRangeService) {
      this.timeRangeService = this.config.useMocks
        ? new MockTimeRangeService()
        : new ApiTimeRangeService(this.config.apiBaseUrl || '');
    }
    return this.timeRangeService;
  }

  getSettingsService(): SettingsService {
    if (!this.settingsService) {
      this.settingsService = this.config.useMocks
        ? new StorageSettingsService()
        : new ApiSettingsService(this.config.apiBaseUrl || '');
    }
    return this.settingsService;
  }

  updateConfig(config: Partial<ServiceConfig>): void {
    this.config = { ...this.config, ...config };
    this.activityService = undefined;
    this.categoryService = undefined;
    this.buddyService = undefined;
    this.timeRangeService = undefined;
    this.settingsService = undefined;
  }
}

const defaultConfig: ServiceConfig = {
  useMocks: USE_MOCK_SERVICES,
  apiBaseUrl: API_BASE_URL,
};

export const serviceProvider = new ServiceProvider(defaultConfig);
