import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Theme';
import { buddyManagementStyles } from '../../styles/BuddyManagementStyles';
import { BuddyManagementProps } from './props';

const BuddyManagement: React.FC<BuddyManagementProps> = ({
  buddies,
  onNavigateToBuddyManager,
  onEditBuddy,
}) => {
  const randomEmoji = () => {
    const emojis = ['😎', '👨‍🚒', '😊', '👦', '🤩'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <View style={buddyManagementStyles.container}>
      <Text style={buddyManagementStyles.description}>
        Add family members and/or friends to track activities!
      </Text>

      {buddies.length > 0 ? (
        <View style={buddyManagementStyles.buddiesList}>
          {buddies.map((buddy) => (
            <TouchableOpacity 
              key={buddy.id} 
              style={buddyManagementStyles.buddyItem}
              onPress={() => onEditBuddy?.(buddy)}
            >
              <View style={buddyManagementStyles.buddyInfo}>
                <Text style={buddyManagementStyles.buddyEmoji}>{randomEmoji()}</Text>
                <View style={buddyManagementStyles.buddyDetails}>
                  <Text style={buddyManagementStyles.buddyName}>{buddy.name}</Text>
                  <Text style={buddyManagementStyles.buddyRelationship}>{buddy.relationship}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={buddyManagementStyles.emptyState}>
          <Text style={buddyManagementStyles.emptyStateText}>
            No buddies added yet. Tap &quot;Manage Buddies&quot; to get started!
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[globalStyles.button, buddyManagementStyles.manageButton]}
        onPress={onNavigateToBuddyManager}
      >
        <Text style={globalStyles.buttonText}>Manage Buddies</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BuddyManagement;
