import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FEATURES } from '../config/environment';
import { globalStyles } from '../constants/Theme';
import { serviceProvider } from '../services';
import ActivityDetailManager from './Settings/ActivityDetailManager';
import ActivityManager from './Settings/ActivityManager';
import BuddyManagement from './Settings/BuddyManagement';
import BuddyManager from './Settings/BuddyManager';
import DefaultTimeRanges from './Settings/DefaultTimeRanges';
import { Activity, ActivityCategory, Buddy, SettingsData } from './Settings/interfaces';
import { SettingsProps } from './Settings/props';
import SettingsHeader from './Settings/SettingsHeader';
import SettingsSection from './Settings/SettingsSection';
import TimeFormatToggle from './Settings/TimeFormatToggle';

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const router = useRouter();
  const [showBuddyManager, setShowBuddyManager] = useState(false);
  const [showActivityDetailManager, setShowActivityDetailManager] = useState(false);

  const timeRangeService = serviceProvider.getTimeRangeService();
  const settingsService = serviceProvider.getSettingsService();
  
  const buddyService = FEATURES.ENABLE_BUDDIES ? serviceProvider.getBuddyService() : null;
  const activityService = FEATURES.ENABLE_ACTIVITIES ? serviceProvider.getActivityService() : null;
  const categoryService = FEATURES.ENABLE_ACTIVITIES ? serviceProvider.getCategoryService() : null;

  // Define categories first so they can be referenced in activities
  const fitnessCategory: ActivityCategory = { id: '1', name: 'Fitness', emoji: '💪' };
  const workCategory: ActivityCategory = { id: '2', name: 'Work', emoji: '💼' };
  const personalCategory: ActivityCategory = { id: '3', name: 'Personal', emoji: '🏠' };
  const hobbyCategory: ActivityCategory = { id: '4', name: 'Hobby', emoji: '🎨' };

  const [settingsData, setSettingsData] = useState<SettingsData>({
    useMilitaryTime: false,
    defaultTimeRanges: {
      morning: { start: 6, end: 12 },
      evening: { start: 12, end: 22 },
    },
    activities: [
      {
        id: '1',
        name: 'Morning Jog',
        emoji: '🏃‍♂️',
        category: fitnessCategory,
      },
      {
        id: '2',
        name: 'Deep Focus',
        emoji: '💻',
        category: workCategory,
      },
      {
        id: '3',
        name: 'Reading',
        emoji: '📚',
        category: hobbyCategory,
        hidden: true,
      },
    ],
    activityCategories: [
      fitnessCategory,
      workCategory,
      personalCategory,
      hobbyCategory,
    ],
    buddies: [
      {
        id: '1',
        name: 'Sarah',
        relationship: 'Sister',
      },
      {
        id: '2',
        name: 'Ted',
        relationship: 'Child',
      },
    ],
  });

  const loadAllData = useCallback(async () => {
    try {
      const promises: Promise<any>[] = [
        timeRangeService.getDefaultTimeRanges(),
        settingsService.getUserSettings(),
      ];

      if (FEATURES.ENABLE_BUDDIES && buddyService) {
        promises.push(buddyService.getAllBuddies());
      }

      if (FEATURES.ENABLE_ACTIVITIES && activityService && categoryService) {
        promises.push(
          activityService.getAllActivities(),
          categoryService.getAllCategories()
        );
      }

      const results = await Promise.all(promises);
      
      let resultIndex = 0;
      const defaultRanges = results[resultIndex++];
      const userSettings = results[resultIndex++];
      
      const updateData: Partial<typeof settingsData> = {
        defaultTimeRanges: defaultRanges,
        useMilitaryTime: userSettings.useMilitaryTime,
      };

      if (FEATURES.ENABLE_BUDDIES && buddyService) {
        updateData.buddies = results[resultIndex++];
      }

      if (FEATURES.ENABLE_ACTIVITIES && activityService && categoryService) {
        updateData.activities = results[resultIndex++];
        updateData.activityCategories = results[resultIndex++];
      }

      setSettingsData(prev => ({
        ...prev,
        ...updateData,
      }));
    } catch (error) {
      console.error('Failed to load settings data:', error);
    }
  }, [timeRangeService, buddyService, activityService, categoryService, settingsService]);

  useFocusEffect(
    useCallback(() => {
      loadAllData();
    }, [loadAllData])
  );

  const handleTimeFormatToggle = async (useMilitaryTime: boolean) => {
    try {
      await settingsService.setUserMilitaryTimeSetting(useMilitaryTime);
      setSettingsData(prev => ({
        ...prev,
        useMilitaryTime,
      }));
    } catch (error) {
      console.error('Failed to update military time setting:', error);
    }
  };

  const handleMorningRangeChange = (range: { start: number; end: number }) => {
    setSettingsData(prev => ({
      ...prev,
      defaultTimeRanges: {
        ...prev.defaultTimeRanges,
        morning: range,
      },
    }));
  };

  const handleEveningRangeChange = (range: { start: number; end: number }) => {
    setSettingsData(prev => ({
      ...prev,
      defaultTimeRanges: {
        ...prev.defaultTimeRanges,
        evening: range,
      },
    }));
  };

  // Activity handlers
  const handleNavigateToActivityManager = () => {
    if (FEATURES.ENABLE_ACTIVITIES) {
      setShowActivityDetailManager(true);
    }
  };

  const handleCloseActivityManager = () => {
    setShowActivityDetailManager(false);
  };

  const handleAddActivity = (activity: Omit<Activity, 'id'>) => {
    if (!FEATURES.ENABLE_ACTIVITIES) return;
    
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
    };
    
    setSettingsData(prev => ({
      ...prev,
      activities: [...prev.activities, newActivity],
    }));
  };

  const handleRemoveActivity = (id: string) => {
    if (!FEATURES.ENABLE_ACTIVITIES) return;
    
    setSettingsData(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity.id !== id),
    }));
  };

  const handleToggleActivityVisibility = (id: string) => {
    if (!FEATURES.ENABLE_ACTIVITIES) return;
    
    setSettingsData(prev => ({
      ...prev,
      activities: prev.activities.map(activity =>
        activity.id === id
          ? { ...activity, hidden: !activity.hidden }
          : activity
      ),
    }));
  };

  const handleAddCategory = (category: Omit<ActivityCategory, 'id'>) => {
    if (!FEATURES.ENABLE_ACTIVITIES) return;
    
    const newCategory: ActivityCategory = {
      ...category,
      id: Date.now().toString(),
    };
    
    setSettingsData(prev => ({
      ...prev,
      activityCategories: [...prev.activityCategories, newCategory],
    }));
  };

  const handleRemoveCategory = (id: string) => {
    if (!FEATURES.ENABLE_ACTIVITIES) return;
    
    setSettingsData(prev => ({
      ...prev,
      activityCategories: prev.activityCategories.filter(category => category.id !== id),
    }));
  };

  // Buddy handlers
  const handleNavigateToBuddyManager = () => {
    if (FEATURES.ENABLE_BUDDIES) {
      setShowBuddyManager(true);
    }
  };

  const handleCloseBuddyManager = () => {
    setShowBuddyManager(false);
  };

  const handleAddBuddy = (buddy: Omit<Buddy, 'id'>) => {
    if (!FEATURES.ENABLE_BUDDIES) return;
    
    const newBuddy: Buddy = {
      ...buddy,
      id: Date.now().toString(),
    };
    
    setSettingsData(prev => ({
      ...prev,
      buddies: [...prev.buddies, newBuddy],
    }));
  };

  const handleRemoveBuddy = (id: string) => {
    if (!FEATURES.ENABLE_BUDDIES) return;
    
    setSettingsData(prev => ({
      ...prev,
      buddies: prev.buddies.filter(buddy => buddy.id !== id),
    }));
  };

  const handleEditActivity = (activity: Activity) => {
    if (FEATURES.ENABLE_ACTIVITIES) {
      router.push(`/activityForm?mode=update&activityId=${activity.id}`);
    }
  };

  const handleEditBuddy = (buddy: Buddy) => {
    if (FEATURES.ENABLE_BUDDIES) {
      router.push(`/buddyForm?mode=update&buddyId=${buddy.id}`);
    }
  };

  if (FEATURES.ENABLE_ACTIVITIES && showActivityDetailManager) {
    return (
      <ActivityDetailManager
        onClose={handleCloseActivityManager}
        activities={settingsData.activities}
        categories={settingsData.activityCategories}
        onAddActivity={handleAddActivity}
        onRemoveActivity={handleRemoveActivity}
        onToggleActivityVisibility={handleToggleActivityVisibility}
        onAddCategory={handleAddCategory}
        onRemoveCategory={handleRemoveCategory}
      />
    );
  }

  if (FEATURES.ENABLE_BUDDIES && showBuddyManager) {
    return (
      <BuddyManager
        onClose={handleCloseBuddyManager}
        buddies={settingsData.buddies}
        onAddBuddy={handleAddBuddy}
        onRemoveBuddy={handleRemoveBuddy}
      />
    );
  }

  return (
    <View style={globalStyles.container}>
      <SettingsHeader onClose={onClose} />
      
      <ScrollView 
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="Time Display">
          <TimeFormatToggle
            useMilitaryTime={settingsData.useMilitaryTime}
            onToggle={handleTimeFormatToggle}
          />
        </SettingsSection>

        <SettingsSection title="Default Time Ranges">
          <DefaultTimeRanges
            morningRange={settingsData.defaultTimeRanges.morning}
            eveningRange={settingsData.defaultTimeRanges.evening}
            onMorningRangeChange={handleMorningRangeChange}
            onEveningRangeChange={handleEveningRangeChange}
            useMilitaryTime={settingsData.useMilitaryTime}
          />
        </SettingsSection>

        {FEATURES.ENABLE_ACTIVITIES && (
          <SettingsSection title="Activities">
            <ActivityManager
              activities={settingsData.activities}
              categories={settingsData.activityCategories}
              onNavigateToActivityManager={handleNavigateToActivityManager}
              onEditActivity={handleEditActivity}
            />
          </SettingsSection>
        )}

        {FEATURES.ENABLE_BUDDIES && (
          <SettingsSection title="Buddy Management">
            <BuddyManagement
              buddies={settingsData.buddies}
              onNavigateToBuddyManager={handleNavigateToBuddyManager}
              onEditBuddy={handleEditBuddy}
            />
          </SettingsSection>
        )}
      </ScrollView>
    </View>
  );
};

export default Settings;
