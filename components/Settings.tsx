import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { globalStyles } from '../constants/Theme';
import ActivityManager from './Settings/ActivityManager';
import DefaultTimeRanges from './Settings/DefaultTimeRanges';
import { Activity, SettingsData } from './Settings/interfaces';
import { SettingsProps } from './Settings/props';
import SettingsHeader from './Settings/SettingsHeader';
import SettingsSection from './Settings/SettingsSection';
import TimeFormatToggle from './Settings/TimeFormatToggle';

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [settingsData, setSettingsData] = useState<SettingsData>({
    useMilitaryTime: false,
    defaultTimeRanges: {
      morning: { start: 6, end: 12 }, // 6AM - 12PM // FIXME: MAGIC
      evening: { start: 12, end: 22 }, // 12PM - 10PM // FIXME: MAGIC
    },
    activities: [
      {
        id: '1',
        type: 'Exercise',
        name: 'Morning Jog',
        emoji: '🏃‍♂️',
      },
      {
        id: '2',
        type: 'Work',
        name: 'Deep Focus',
        emoji: '💻',
      },
    ],
  });

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
            onAddActivity={handleAddActivity}
            onRemoveActivity={handleRemoveActivity}
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
};

export default Settings;
