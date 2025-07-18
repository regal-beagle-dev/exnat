import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
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
  const buddyService = serviceProvider.getBuddyService();
  const activityService = serviceProvider.getActivityService();
  const categoryService = serviceProvider.getCategoryService();

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
      const [defaultRanges, allBuddies, allActivities, allCategories] = await Promise.all([
        timeRangeService.getDefaultTimeRanges(),
        buddyService.getAllBuddies(),
        activityService.getAllActivities(),
        categoryService.getAllCategories(),
      ]);

      setSettingsData(prev => ({
        ...prev,
        defaultTimeRanges: defaultRanges,
        buddies: allBuddies,
        activities: allActivities,
        activityCategories: allCategories,
      }));
    } catch (error) {
      console.error('Failed to load settings data:', error);
    }
  }, [timeRangeService, buddyService, activityService, categoryService]);

  useFocusEffect(
    useCallback(() => {
      loadAllData();
    }, [loadAllData])
  );

  const handleTimeFormatToggle = (useMilitaryTime: boolean) => {
    setSettingsData(prev => ({
      ...prev,
      useMilitaryTime,
    }));
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
    setShowActivityDetailManager(true);
  };

  const handleCloseActivityManager = () => {
    setShowActivityDetailManager(false);
  };

  const handleAddActivity = (activity: Omit<Activity, 'id'>) => {
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
    setSettingsData(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity.id !== id),
    }));
  };

  const handleToggleActivityVisibility = (id: string) => {
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
    setSettingsData(prev => ({
      ...prev,
      activityCategories: prev.activityCategories.filter(category => category.id !== id),
    }));
  };

  // Buddy handlers
  const handleNavigateToBuddyManager = () => {
    setShowBuddyManager(true);
  };

  const handleCloseBuddyManager = () => {
    setShowBuddyManager(false);
  };

  const handleAddBuddy = (buddy: Omit<Buddy, 'id'>) => {
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
    setSettingsData(prev => ({
      ...prev,
      buddies: prev.buddies.filter(buddy => buddy.id !== id),
    }));
  };

  const handleEditActivity = (activity: Activity) => {
    router.push(`/activityForm?mode=update&activityId=${activity.id}`);
  };

  const handleEditBuddy = (buddy: Buddy) => {
    router.push(`/buddyForm?mode=update&buddyId=${buddy.id}`);
  };

  if (showActivityDetailManager) {
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

  if (showBuddyManager) {
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

        <SettingsSection title="Activities">
          <ActivityManager
            activities={settingsData.activities}
            categories={settingsData.activityCategories}
            onNavigateToActivityManager={handleNavigateToActivityManager}
            onEditActivity={handleEditActivity}
          />
        </SettingsSection>

        <SettingsSection title="Buddy Management">
          <BuddyManagement
            buddies={settingsData.buddies}
            onNavigateToBuddyManager={handleNavigateToBuddyManager}
            onEditBuddy={handleEditBuddy}
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
};

export default Settings;
