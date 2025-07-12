import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Theme';
import { buddyManagementStyles } from '../../styles/BuddyManagementStyles';
import { BuddyManagementProps } from './props';

const BuddyManagement: React.FC<BuddyManagementProps> = ({
  buddies,
  onNavigateToBuddyManager,
}) => {
  return (
    <View style={buddyManagementStyles.container}>
      <Text style={buddyManagementStyles.description}>
      Add family members and/or friends to track activities!
      </Text>

      <View style={buddyManagementStyles.summary}>
        <Text style={buddyManagementStyles.summaryText}>
          {buddies.length === 0 
            ? 'No buddies added yet' 
            : `${buddies.length} ${buddies.length === 1 ? 'buddy' : 'buddies'} added`
          }
        </Text>
        {buddies.length > 0 && (
          <View style={buddyManagementStyles.buddyPreview}>
            {buddies.slice(0, 3).map((buddy, index) => (
              <Text key={buddy.id} style={buddyManagementStyles.buddyName}>
                {buddy.name}{index < Math.min(2, buddies.length - 1) ? ', ' : ''}
              </Text>
            ))}
            {buddies.length > 3 && (
              <Text style={buddyManagementStyles.moreText}>
                +{buddies.length - 3} more
              </Text>
            )}
          </View>
        )}
      </View>

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
