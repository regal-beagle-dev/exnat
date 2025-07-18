import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { globalStyles } from '../../constants/Theme';
import { activityManagerStyles } from '../../styles/ActivityManagerStyles';
import { ActivityCategory } from './interfaces';
import { ActivityManagerProps } from './props';

const ActivityManager: React.FC<ActivityManagerProps> = ({
  activities,
  categories,
  onNavigateToActivityManager,
  onEditActivity,
}) => {
  const visibleActivities = activities.filter(activity => !activity.hidden);
  
  const getCategoryName = (category?: ActivityCategory): string => {
    return category ? category.name : 'No Category';
  };
  
  return (
    <View style={activityManagerStyles.container}>
      <Text style={activityManagerStyles.description}>
        Create and organize custom activities to track your time more effectively
      </Text>

      {visibleActivities.length > 0 ? (
        <View style={activityManagerStyles.activitiesList}>
          {visibleActivities.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={activityManagerStyles.activityItem}
              onPress={() => onEditActivity?.(item)}
            >
              <View style={activityManagerStyles.activityInfo}>
                <Text style={activityManagerStyles.activityEmoji}>{item.emoji}</Text>
                <View style={activityManagerStyles.activityDetails}>
                  <Text style={activityManagerStyles.activityName}>{item.name}</Text>
                  <Text style={activityManagerStyles.activityType}>{getCategoryName(item.category)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={activityManagerStyles.emptyState}>
          <Text style={activityManagerStyles.emptyStateText}>
            No activities created yet. Tap &quot;Manage Activities&quot; to get started!
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[globalStyles.button, activityManagerStyles.showFormButton]}
        onPress={onNavigateToActivityManager}
      >
        <Text style={globalStyles.buttonText}>Manage Activities</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActivityManager;
