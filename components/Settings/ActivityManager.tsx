import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { globalStyles } from '../../constants/Theme';
import { activityManagerStyles } from '../../styles/ActivityManagerStyles';
import { Activity, ActivityCategory } from './interfaces';
import { ActivityManagerProps } from './props';

const ActivityManager: React.FC<ActivityManagerProps> = ({
  activities,
  categories,
  onNavigateToActivityManager,
}) => {
  const visibleActivities = activities.filter(activity => !activity.hidden);
  
  const getCategoryName = (category?: ActivityCategory): string => {
    return category ? category.name : 'No Category';
  };
  
  const renderActivity = ({ item }: { item: Activity }) => (
    <View style={activityManagerStyles.activityItem}>
      <View style={activityManagerStyles.activityInfo}>
        <Text style={activityManagerStyles.activityEmoji}>{item.emoji}</Text>
        <View style={activityManagerStyles.activityDetails}>
          <Text style={activityManagerStyles.activityName}>{item.name}</Text>
          <Text style={activityManagerStyles.activityType}>{getCategoryName(item.category)}</Text>
        </View>
      </View>
    </View>
  );
  
  return (
    <View style={activityManagerStyles.container}>
      <Text style={activityManagerStyles.description}>
        Create and organize custom activities to track your time more effectively
      </Text>

      {visibleActivities.length > 0 ? (
        <FlatList
          data={visibleActivities}
          renderItem={renderActivity}
          keyExtractor={(item) => item.id}
          style={activityManagerStyles.activitiesList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        />
      ) : (
        <View style={activityManagerStyles.emptyState}>
          <Text style={activityManagerStyles.emptyStateText}>
            No activities created yet. Tap &quot;Manage Activities&quot; to get started!
          </Text>
        </View>
      )}

      <View style={activityManagerStyles.container}>
        <Text style={activityManagerStyles.description}>
          {visibleActivities.length} enabled activities
          {activities.length > visibleActivities.length && 
            ` (${activities.length - visibleActivities.length} disabled)`
          }
        </Text>
      </View>

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
