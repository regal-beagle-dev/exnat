import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Theme';
import { timeTrackerStyles } from '../../styles/TimeTrackerStyles';

interface TimeRange {
  start: number;
  end: number;
}

interface SelectedRangesListProps {
  selectedRanges: TimeRange[];
  formatTimeRange: (start: number, end: number) => string;
  onRemoveRange: (index: number) => void;
}

const SelectedRangesList: React.FC<SelectedRangesListProps> = ({
  selectedRanges,
  formatTimeRange,
  onRemoveRange,
}) => {
  if (selectedRanges.length === 0) {
    return null;
  }

  return (
    <View style={[globalStyles.card, timeTrackerStyles.selectedRanges]}>
      <Text style={timeTrackerStyles.rangesTitle}>Selected Time Ranges:</Text>
      {selectedRanges.map((range, index) => (
        <View key={index} style={timeTrackerStyles.rangeItem}>
          <Text style={timeTrackerStyles.rangeText}>
            {formatTimeRange(range.start, range.end)}
          </Text>
          <TouchableOpacity
            style={timeTrackerStyles.removeRange}
            onPress={() => onRemoveRange(index)}
            testID={`remove-range-${index}`}
          >
            <Text style={timeTrackerStyles.removeRangeText}>×</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default SelectedRangesList;
