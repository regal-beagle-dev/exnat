import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Form from './Form';
import { FormFieldConfig, TimeRangeEditorProps, TimeRangeFormData } from './interfaces';
import { formStyles } from './styles/FormStyles';

const TimeRangeEditor: React.FC<TimeRangeEditorProps> = ({
  range,
  onRangeChange,
  useMilitaryTime = false,
  label,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<TimeRangeFormData>(() => {
    const today = new Date();
    const startTime = new Date(today);
    startTime.setHours(range.start, 0, 0, 0);
    
    const endTime = new Date(today);
    endTime.setHours(range.end, 0, 0, 0);
    
    return { startTime, endTime };
  });

  useEffect(() => {
    const today = new Date();
    const startTime = new Date(today);
    startTime.setHours(range.start, 0, 0, 0);
    
    const endTime = new Date(today);
    endTime.setHours(range.end, 0, 0, 0);
    
    setFormData({ startTime, endTime });
  }, [range]);

  const convertTimeToHour = useCallback((time: Date): number => {
    return time.getHours() + time.getMinutes() / 60;
  }, []);

  const handleFormSubmit = useCallback(async (data: TimeRangeFormData) => {
    const startHour = convertTimeToHour(data.startTime);
    const endHour = convertTimeToHour(data.endTime);

    if (startHour >= endHour) {
      throw new Error('End time must be after start time');
    }

    onRangeChange({
      start: startHour,
      end: endHour,
    });
  }, [convertTimeToHour, onRangeChange]);

  const fields: FormFieldConfig<TimeRangeFormData>[] = [
    {
      name: 'startTime',
      label: 'Start Time',
      placeholder: 'Select start time',
      rules: {
        required: 'Start time is required',
      },
    },
    {
      name: 'endTime',
      label: 'End Time',
      placeholder: 'Select end time',
      rules: {
        required: 'End time is required',
      },
    },
  ];

  return (
    <View style={formStyles.formContainer}>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        defaultValues={formData}
        submitButtonText="Update Range"
        isLoading={isLoading}
        resetAfterSubmit={false}
      />
    </View>
  );
};

export default TimeRangeEditor;
