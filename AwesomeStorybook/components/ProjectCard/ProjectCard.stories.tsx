import React from 'react';
import { View, Alert } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-native';
import {ProjectCard} from 'uikit';

const meta: Meta<typeof ProjectCard> = {
  title: 'components/ProjectCard',
  component: ProjectCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flex: 1, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
  args: {
    title: 'Название проекта',
    elapsedTime: '2 часа назад',
    onOpenPress: () => Alert.alert('Карточка открыта'),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

