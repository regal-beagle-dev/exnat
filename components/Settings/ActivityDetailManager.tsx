import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { globalStyles } from '../../constants/Theme';
import { activityManagerStyles } from '../../styles/ActivityManagerStyles';
import { Activity, ActivityCategory } from './interfaces';
import { ActivityDetailManagerProps } from './props';
import SettingsHeader from './SettingsHeader';

const ActivityDetailManager: React.FC<ActivityDetailManagerProps> = ({
  onClose,
  activities,
  categories,
  onAddActivity,
  onRemoveActivity,
  onToggleActivityVisibility,
  onAddCategory,
  onRemoveCategory,
}) => {
  const [activeTab, setActiveTab] = useState<'activities' | 'categories'>('activities');
  const router = useRouter();

  const handleCreateActivity = () => {
    router.push('/activityForm?mode=create');
  };

  const handleEditActivity = (activity: Activity) => {
    router.push(`/activityForm?mode=update&activityId=${activity.id}`);
  };

  const handleCreateCategory = () => {
    router.push('/categoryForm?mode=create');
  };

  const handleEditCategory = (category: ActivityCategory) => {
    router.push(`/categoryForm?mode=update&categoryId=${category.id}`);
  };

  const handleRemoveActivity = (id: string, name: string) => {
    Alert.alert(
      'Remove Activity',
      `Are you sure you want to remove "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemoveActivity(id) },
      ]
    );
  };

  const handleRemoveCategory = (id: string, name: string) => {
    Alert.alert(
      'Remove Category',
      `Are you sure you want to remove "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemoveCategory(id) },
      ]
    );
  };

  const handleToggleVisibility = (id: string, name: string, isHidden: boolean) => {
    const action = isHidden ? 'show' : 'hide';
    Alert.alert(
      `${action === 'hide' ? 'Hide' : 'Show'} Activity`,
      `Are you sure you want to ${action} "${name}"? ${action === 'hide' ? 'It will no longer appear in activity selections.' : 'It will appear in activity selections again.'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: action === 'hide' ? 'Hide' : 'Show', onPress: () => onToggleActivityVisibility(id) },
      ]
    );
  };

  const getCategoryName = (category?: ActivityCategory): string => {
    return category ? category.name : 'No Category';
  };

  const renderActivity = ({ item }: { item: Activity }) => (
    <View style={[activityManagerStyles.activityItem, item.hidden && { opacity: 0.6 }]}>
      <View style={activityManagerStyles.activityInfo}>
        <Text style={activityManagerStyles.activityEmoji}>{item.emoji}</Text>
        <View style={activityManagerStyles.activityDetails}>
          <Text style={[activityManagerStyles.activityName, item.hidden && { textDecorationLine: 'line-through' }]}>
            {item.name} {item.hidden && '(Hidden)'}
          </Text>
          <Text style={activityManagerStyles.activityType}>
            {getCategoryName(item.category)}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={[activityManagerStyles.removeButton, { backgroundColor: '#2196F3', marginRight: 8 }]}
          onPress={() => handleEditActivity(item)}
        >
          <Text style={activityManagerStyles.removeButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[activityManagerStyles.removeButton, { backgroundColor: item.hidden ? '#4CAF50' : '#FF9800', marginRight: 8 }]}
          onPress={() => handleToggleVisibility(item.id, item.name, item.hidden || false)}
        >
          <Text style={activityManagerStyles.removeButtonText}>
            {item.hidden ? '👁️' : '🙈'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activityManagerStyles.removeButton}
          onPress={() => handleRemoveActivity(item.id, item.name)}
        >
          <Text style={activityManagerStyles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategory = ({ item }: { item: ActivityCategory }) => (
    <View style={activityManagerStyles.activityItem}>
      <View style={activityManagerStyles.activityInfo}>
        <Text style={activityManagerStyles.activityEmoji}>{item.emoji}</Text>
        <View style={activityManagerStyles.activityDetails}>
          <Text style={activityManagerStyles.activityName}>{item.name}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={[activityManagerStyles.removeButton, { backgroundColor: '#2196F3', marginRight: 8 }]}
          onPress={() => handleEditCategory(item)}
        >
          <Text style={activityManagerStyles.removeButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activityManagerStyles.removeButton}
          onPress={() => handleRemoveCategory(item.id, item.name)}
        >
          <Text style={activityManagerStyles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderListHeader = () => (
    <View style={activityManagerStyles.content}>
      <Text style={activityManagerStyles.pageTitle}>Activity & Category Management</Text>
      <Text style={activityManagerStyles.pageDescription}>
        Create and organize your activities with custom categories. Hide activities to remove them from selections without deleting.
      </Text>

      {/* Tab Navigation */}
      <View style={activityManagerStyles.tabContainer}>
        <TouchableOpacity
          style={[
            activityManagerStyles.tab,
            activeTab === 'activities' && activityManagerStyles.activeTab
          ]}
          onPress={() => setActiveTab('activities')}
        >
          <Text style={[
            activityManagerStyles.tabText,
            activeTab === 'activities' && activityManagerStyles.activeTabText
          ]}>
            Activities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            activityManagerStyles.tab,
            activeTab === 'categories' && activityManagerStyles.activeTab
          ]}
          onPress={() => setActiveTab('categories')}
        >
          <Text style={[
            activityManagerStyles.tabText,
            activeTab === 'categories' && activityManagerStyles.activeTabText
          ]}>
            Categories
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={activityManagerStyles.sectionTitle}>
        {activeTab === 'activities' ? 'Your Activities' : 'Activity Categories'}
      </Text>
    </View>
  );

  const renderListFooter = () => (
    <View style={activityManagerStyles.content}>
      {activeTab === 'activities' ? (
        <TouchableOpacity
          style={[globalStyles.button, activityManagerStyles.showFormButton]}
          onPress={handleCreateActivity}
        >
          <Text style={globalStyles.buttonText}>+ Add New Activity</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[globalStyles.button, activityManagerStyles.showFormButton]}
          onPress={handleCreateCategory}
        >
          <Text style={globalStyles.buttonText}>+ Add New Category</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={activityManagerStyles.emptyState}>
      <Text style={activityManagerStyles.emptyStateText}>
        {activeTab === 'activities' 
          ? 'No activities added yet. Create your first activity!'
          : 'No categories created yet. Create your first category to organize activities!'
        }
      </Text>
    </View>
  );

  const currentData = activeTab === 'activities' ? activities : categories;
  const renderItem = activeTab === 'activities' ? renderActivity : renderCategory;

  return (
    <View style={globalStyles.container}>
      <SettingsHeader onClose={onClose} title="Manage Activities" />
      
      <FlatList
        data={currentData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={activityManagerStyles.scrollContent}
        removeClippedSubviews={false}
        nestedScrollEnabled={false}
      />
    </View>
  );
};

export default ActivityDetailManager;
