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
import { buddyManagerStyles } from '../../styles/BuddyManagerStyles';
import { Buddy } from './interfaces';
import { BuddyManagerProps } from './props';
import SettingsHeader from './SettingsHeader';

const BuddyManager: React.FC<BuddyManagerProps> = ({
  onClose,
  buddies,
  onAddBuddy,
  onRemoveBuddy,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBuddy, setNewBuddy] = useState({
    name: '',
    relationship: '',
  });

  const handleAddBuddy = () => {
    if (!newBuddy.name.trim() || !newBuddy.relationship.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    onAddBuddy({
      name: newBuddy.name.trim(),
      relationship: newBuddy.relationship.trim(),
    });

    setNewBuddy({ name: '', relationship: '' });
    setShowAddForm(false);
  };

  const handleRemoveBuddy = (id: string, name: string) => {
    Alert.alert(
      'Remove Buddy',
      `Are you sure you want to remove "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemoveBuddy(id) },
      ]
    );
  };

  const renderBuddy = ({ item }: { item: Buddy }) => (
    <View style={buddyManagerStyles.buddyItem}>
      <View style={buddyManagerStyles.buddyInfo}>
        <Text style={buddyManagerStyles.buddyEmoji}>👤</Text>
        <View style={buddyManagerStyles.buddyDetails}>
          <Text style={buddyManagerStyles.buddyName}>{item.name}</Text>
          <Text style={buddyManagerStyles.buddyRelationship}>{item.relationship}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={buddyManagerStyles.removeButton}
        onPress={() => handleRemoveBuddy(item.id, item.name)}
      >
        <Text style={buddyManagerStyles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <SettingsHeader onClose={onClose} title="Buddy Management" />
      
      <ScrollView 
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={buddyManagerStyles.scrollContent}
      >
        <View style={buddyManagerStyles.content}>
          <Text style={buddyManagerStyles.pageTitle}>Buddy Management</Text>
          <Text style={buddyManagerStyles.pageDescription}>
            Add family members and friends to track shared outdoor activities and adventures
          </Text>

          <View style={buddyManagerStyles.buddiesSection}>
            <Text style={buddyManagerStyles.sectionTitle}>Your Buddies</Text>
            
            {buddies.length === 0 ? (
              <View style={buddyManagerStyles.emptyState}>
                <Text style={buddyManagerStyles.emptyStateText}>
                  No buddies added yet. Add your first buddy to get started!
                </Text>
              </View>
            ) : (
              <FlatList
                data={buddies}
                renderItem={renderBuddy}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )}
          </View>

          {showAddForm ? (
            <View style={buddyManagerStyles.addForm}>
              <Text style={buddyManagerStyles.formTitle}>Add New Buddy</Text>
              <TextInput
                style={[globalStyles.input, buddyManagerStyles.input]}
                placeholder="Buddy's name (e.g., Sarah, Dad, Alex)"
                value={newBuddy.name}
                onChangeText={(text) => setNewBuddy(prev => ({ ...prev, name: text }))}
              />
              <TextInput
                style={[globalStyles.input, buddyManagerStyles.input]}
                placeholder="Relationship (e.g., Sister, Friend, Spouse)"
                value={newBuddy.relationship}
                onChangeText={(text) => setNewBuddy(prev => ({ ...prev, relationship: text }))}
              />
              <View style={buddyManagerStyles.formButtons}>
                <TouchableOpacity
                  style={[globalStyles.secondaryButton, buddyManagerStyles.cancelButton]}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewBuddy({ name: '', relationship: '' });
                  }}
                >
                  <Text style={globalStyles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.button, buddyManagerStyles.addButton]}
                  onPress={handleAddBuddy}
                >
                  <Text style={globalStyles.buttonText}>Add Buddy</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={[globalStyles.button, buddyManagerStyles.showFormButton]}
              onPress={() => setShowAddForm(true)}
            >
              <Text style={globalStyles.buttonText}>+ Add New Buddy</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BuddyManager;
