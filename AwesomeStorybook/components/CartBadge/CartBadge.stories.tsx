import React from 'react';
import { View, Alert } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-native';
import {CartBadge} from 'uikit';

const meta: Meta<typeof CartBadge> = {
  title: 'components/CartBadge',
  component: CartBadge,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
  args: {
    totalPrice: 1500,
    title: 'В корзину',
    onPress: () => Alert.alert('Переход в корзину'),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

