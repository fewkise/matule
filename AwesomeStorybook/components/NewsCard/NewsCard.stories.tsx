import React from 'react';
import { View, ScrollView } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-native';
import {NewsCard} from 'uikit';

const meta: Meta<typeof NewsCard> = {
  title: 'components/SalesAndNewsCard',
  component: NewsCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 20, justifyContent: 'center', flex: 1, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
  args: {
    title: 'Зимняя распродажа',
    price: '990',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};


export const HorizontalList: Story = {
  render: () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
      <NewsCard 
        title="Скидка на кроссовки" 
        price="2 990" 
      />
      <NewsCard 
        title="Новая коллекция" 
        price="5 000" 
      />
      <NewsCard 
        title="Аксессуары" 
        price="450" 
      />
    </ScrollView>
  ),
};
