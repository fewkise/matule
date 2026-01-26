import React, { useState } from 'react'; // Используем обычный хук
import { Select } from 'uikit';
import { View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-native';
import { SheetManager } from 'react-native-actions-sheet';

const meta: Meta<typeof Select> = {
  title: 'components/MySelect',
  component: Select,
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Выберите категорию',
    value: '',
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value);

    const handlePress = () => {
      SheetManager.show('category-sheet', {
        payload: {
          categories: [
            { id: '1', name: 'Кроссовки' },
            { id: '2', name: 'Рубашки' },
            { id: '3', name: 'Аксессуары' },
          ],
          onSelect: (category) => {
            setSelectedValue(category.name); 
          },
        },
      });
    };

    return (
      <Select 
        {...args} 
        value={selectedValue} 
        onPress={handlePress} 
      />
    );
  },
};
