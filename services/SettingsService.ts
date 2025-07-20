import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserSettings {
  useMilitaryTime: boolean;
}

export interface SettingsService {
  getUserSettings(): Promise<UserSettings>;
  updateUserSettings(settings: Partial<UserSettings>): Promise<void>;
  getUserMilitaryTimeSetting(): Promise<boolean>;
  setUserMilitaryTimeSetting(useMilitaryTime: boolean): Promise<void>;
}

export class MockSettingsService implements SettingsService {
  private settings: UserSettings = {
    useMilitaryTime: false,
  };

  async getUserSettings(): Promise<UserSettings> {
    await this.simulateDelay();
    return { ...this.settings };
  }

  async updateUserSettings(settings: Partial<UserSettings>): Promise<void> {
    await this.simulateDelay();
    this.settings = { ...this.settings, ...settings };
  }

  async getUserMilitaryTimeSetting(): Promise<boolean> {
    await this.simulateDelay();
    return this.settings.useMilitaryTime;
  }

  async setUserMilitaryTimeSetting(useMilitaryTime: boolean): Promise<void> {
    await this.simulateDelay();
    this.settings.useMilitaryTime = useMilitaryTime;
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 100));
  }
}

export class StorageSettingsService implements SettingsService {
  private readonly storageKey = 'user_settings';
  private readonly defaultSettings: UserSettings = {
    useMilitaryTime: false,
  };

  async getUserSettings(): Promise<UserSettings> {
    try {
      const stored = await AsyncStorage.getItem(this.storageKey);
      if (stored) {
        return { ...this.defaultSettings, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn('Failed to load user settings:', error);
    }
    return { ...this.defaultSettings };
  }

  async updateUserSettings(settings: Partial<UserSettings>): Promise<void> {
    try {
      const currentSettings = await this.getUserSettings();
      const updatedSettings = { ...currentSettings, ...settings };
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Failed to save user settings:', error);
      throw error;
    }
  }

  async getUserMilitaryTimeSetting(): Promise<boolean> {
    const settings = await this.getUserSettings();
    return settings.useMilitaryTime;
  }

  async setUserMilitaryTimeSetting(useMilitaryTime: boolean): Promise<void> {
    await this.updateUserSettings({ useMilitaryTime });
  }
}

export class ApiSettingsService implements SettingsService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUserSettings(): Promise<UserSettings> {
    const response = await fetch(`${this.baseUrl}/user/settings`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user settings: ${response.statusText}`);
    }
    return response.json();
  }

  async updateUserSettings(settings: Partial<UserSettings>): Promise<void> {
    const response = await fetch(`${this.baseUrl}/user/settings`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error(`Failed to update user settings: ${response.statusText}`);
    }
  }

  async getUserMilitaryTimeSetting(): Promise<boolean> {
    const settings = await this.getUserSettings();
    return settings.useMilitaryTime;
  }

  async setUserMilitaryTimeSetting(useMilitaryTime: boolean): Promise<void> {
    await this.updateUserSettings({ useMilitaryTime });
  }
}
