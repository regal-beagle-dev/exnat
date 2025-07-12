import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TextInput,
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
  const [showAddActivityForm, setShowAddActivityForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  
  const [newActivity, setNewActivity] = useState({
    name: '',
    emoji: '',
    categoryName: '',
  });
  
  const [newCategory, setNewCategory] = useState({
    name: '',
    emoji: '',
  });

  const handleAddActivity = () => {
    if (!newActivity.name.trim() || !newActivity.emoji.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    let selectedCategory: ActivityCategory | undefined;
    if (newActivity.categoryName.trim()) {
      selectedCategory = categories.find(cat => cat.name === newActivity.categoryName.trim());
      if (!selectedCategory) {
        Alert.alert('Error', `Category "${newActivity.categoryName}" not found`);
        return;
      }
    }

    onAddActivity({
      name: newActivity.name.trim(),
      emoji: newActivity.emoji.trim(),
      category: selectedCategory,
    });

    setNewActivity({ name: '', emoji: '', categoryName: '' });
    setShowAddActivityForm(false);
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim() || !newCategory.emoji.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    onAddCategory({
      name: newCategory.name.trim(),
      emoji: newCategory.emoji.trim(),
    });

    setNewCategory({ name: '', emoji: '' });
    setShowAddCategoryForm(false);
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
      <TouchableOpacity
        style={activityManagerStyles.removeButton}
        onPress={() => handleRemoveCategory(item.id, item.name)}
      >
        <Text style={activityManagerStyles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <SettingsHeader onClose={onClose} title="Manage Activities" />
      
      <ScrollView 
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={activityManagerStyles.scrollContent}
      >
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

          {activeTab === 'activities' ? (
            <View style={activityManagerStyles.section}>
              <Text style={activityManagerStyles.sectionTitle}>Your Activities</Text>
              
              {activities.length === 0 ? (
                <View style={activityManagerStyles.emptyState}>
                  <Text style={activityManagerStyles.emptyStateText}>
                    No activities added yet. Create your first activity!
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={activities}
                  renderItem={renderActivity}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              )}

              {showAddActivityForm ? (
                <View style={activityManagerStyles.addForm}>
                  <Text style={activityManagerStyles.formTitle}>Add New Activity</Text>
                  <TextInput
                    style={[globalStyles.input, activityManagerStyles.input]}
                    placeholder="Category (optional, e.g., Exercise, Work, Hobby)"
                    value={newActivity.categoryName}
                    onChangeText={(text) => setNewActivity(prev => ({ ...prev, categoryName: text }))}
                  />
                  <TextInput
                    style={[globalStyles.input, activityManagerStyles.input]}
                    placeholder="Activity name (e.g., Morning Jog)"
                    value={newActivity.name}
                    onChangeText={(text) => setNewActivity(prev => ({ ...prev, name: text }))}
                  />
                  <TextInput
                    style={[globalStyles.input, activityManagerStyles.input]}
                    placeholder="Emoji (e.g., 🏃‍♂️)"
                    value={newActivity.emoji}
                    onChangeText={(text) => setNewActivity(prev => ({ ...prev, emoji: text }))}
                    maxLength={2}
                  />
                  <View style={activityManagerStyles.formButtons}>
                    <TouchableOpacity
                      style={[globalStyles.secondaryButton, activityManagerStyles.cancelButton]}
                      onPress={() => {
                        setShowAddActivityForm(false);
                        setNewActivity({ name: '', emoji: '', categoryName: '' });
                      }}
                    >
                      <Text style={globalStyles.secondaryButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[globalStyles.button, activityManagerStyles.addButton]}
                      onPress={handleAddActivity}
                    >
                      <Text style={globalStyles.buttonText}>Add Activity</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={[globalStyles.button, activityManagerStyles.showFormButton]}
                  onPress={() => setShowAddActivityForm(true)}
                >
                  <Text style={globalStyles.buttonText}>+ Add New Activity</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={activityManagerStyles.section}>
              <Text style={activityManagerStyles.sectionTitle}>Activity Categories</Text>
              
              {categories.length === 0 ? (
                <View style={activityManagerStyles.emptyState}>
                  <Text style={activityManagerStyles.emptyStateText}>
                    No categories created yet. Create your first category to organize activities!
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={categories}
                  renderItem={renderCategory}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              )}

              {showAddCategoryForm ? (
                <View style={activityManagerStyles.addForm}>
                  <Text style={activityManagerStyles.formTitle}>Add New Category</Text>
                  <TextInput
                    style={[globalStyles.input, activityManagerStyles.input]}
                    placeholder="Category name (e.g., Fitness, Work, Hobbies)"
                    value={newCategory.name}
                    onChangeText={(text) => setNewCategory(prev => ({ ...prev, name: text }))}
                  />
                  <TextInput
                    style={[globalStyles.input, activityManagerStyles.input]}
                    placeholder="Emoji (e.g., 💪)"
                    value={newCategory.emoji}
                    onChangeText={(text) => setNewCategory(prev => ({ ...prev, emoji: text }))}
                    maxLength={2}
                  />
                  <View style={activityManagerStyles.formButtons}>
                    <TouchableOpacity
                      style={[globalStyles.secondaryButton, activityManagerStyles.cancelButton]}
                      onPress={() => {
                        setShowAddCategoryForm(false);
                        setNewCategory({ name: '', emoji: '' });
                      }}
                    >
                      <Text style={globalStyles.secondaryButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[globalStyles.button, activityManagerStyles.addButton]}
                      onPress={handleAddCategory}
                    >
                      <Text style={globalStyles.buttonText}>Add Category</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={[globalStyles.button, activityManagerStyles.showFormButton]}
                  onPress={() => setShowAddCategoryForm(true)}
                >
                  <Text style={globalStyles.buttonText}>+ Add New Category</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ActivityDetailManager;
