import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    FlatList,
    Text,
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
  const router = useRouter();

  const handleCreateBuddy = () => {
    router.push('/buddyForm?mode=create');
  };

  const handleEditBuddy = (buddy: Buddy) => {
    router.push(`/buddyForm?mode=update&buddyId=${buddy.id}`);
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

  const randomEmoji = () => {
    const emojis = ['😎', '👨‍🚒', '😊', '👦', '🤩'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const renderBuddy = ({ item }: { item: Buddy }) => (
    <TouchableOpacity 
      style={buddyManagerStyles.buddyItem}
      onPress={() => handleEditBuddy(item)}
    >
      <View style={buddyManagerStyles.buddyInfo}>
        <Text style={buddyManagerStyles.buddyEmoji}>{randomEmoji()}</Text>
        <View style={buddyManagerStyles.buddyDetails}>
          <Text style={buddyManagerStyles.buddyName}>{item.name}</Text>
          <Text style={buddyManagerStyles.buddyRelationship}>{item.relationship}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={buddyManagerStyles.removeButton}
          onPress={(e) => {
            e.stopPropagation();
            handleRemoveBuddy(item.id, item.name);
          }}
        >
          <Text style={buddyManagerStyles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <SettingsHeader onClose={onClose} title="Buddy Management" />
      
      <FlatList
        data={buddies}
        renderItem={renderBuddy}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={buddyManagerStyles.scrollContent}
        ListHeaderComponent={() => (
          <View style={buddyManagerStyles.content}>
            <Text style={buddyManagerStyles.pageTitle}>Buddy Management</Text>
            <Text style={buddyManagerStyles.pageDescription}>
              Add family members and/or friends track activities!
            </Text>

            <View style={buddyManagerStyles.buddiesSection}>
              <Text style={buddyManagerStyles.sectionTitle}>Your Buddies</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={buddyManagerStyles.emptyState}>
            <Text style={buddyManagerStyles.emptyStateText}>
              No buddies added yet. Add your first buddy to get started!
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={buddyManagerStyles.content}>
            <TouchableOpacity
              style={[globalStyles.button, buddyManagerStyles.showFormButton]}
              onPress={handleCreateBuddy}
            >
              <Text style={globalStyles.buttonText}>+ Add New Buddy</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default BuddyManager;
