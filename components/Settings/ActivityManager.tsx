import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { globalStyles } from '../../constants/Theme';
import { activityManagerStyles } from '../../styles/ActivityManagerStyles';
import { Activity } from './interfaces';
import { ActivityManagerProps } from './props';

const ActivityManager: React.FC<ActivityManagerProps> = ({
  activities,
  onAddActivity,
  onRemoveActivity,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: '',
    name: '',
    emoji: '',
  });

  const handleAddActivity = () => {
    if (!newActivity.type.trim() || !newActivity.name.trim() || !newActivity.emoji.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    onAddActivity({
      type: newActivity.type.trim(),
      name: newActivity.name.trim(),
      emoji: newActivity.emoji.trim(),
    });

    setNewActivity({ type: '', name: '', emoji: '' });
    setShowAddForm(false);
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

  const renderActivity = ({ item }: { item: Activity }) => (
    <View style={activityManagerStyles.activityItem}>
      <View style={activityManagerStyles.activityInfo}>
        <Text style={activityManagerStyles.activityEmoji}>{item.emoji}</Text>
        <View style={activityManagerStyles.activityDetails}>
          <Text style={activityManagerStyles.activityName}>{item.name}</Text>
          <Text style={activityManagerStyles.activityType}>{item.type}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={activityManagerStyles.removeButton}
        onPress={() => handleRemoveActivity(item.id, item.name)}
      >
        <Text style={activityManagerStyles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={activityManagerStyles.container}>
      <Text style={activityManagerStyles.description}>
        Create custom activities to track your time more effectively
      </Text>

      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        style={activityManagerStyles.activitiesList}
        showsVerticalScrollIndicator={false}
      />

      {showAddForm ? (
        <View style={activityManagerStyles.addForm}>
          <TextInput
            style={[globalStyles.input, activityManagerStyles.input]}
            placeholder="Activity type (e.g., Exercise, Work)"
            value={newActivity.type}
            onChangeText={(text) => setNewActivity(prev => ({ ...prev, type: text }))}
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
                setShowAddForm(false);
                setNewActivity({ type: '', name: '', emoji: '' });
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
          onPress={() => setShowAddForm(true)}
        >
          <Text style={globalStyles.buttonText}>+ Add New Activity</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ActivityManager;
