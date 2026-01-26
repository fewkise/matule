import React from 'react';
import { View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-native';
import {ErrorToast} from 'uikit';

const meta: Meta<typeof ErrorToast> = {
  title: 'components/ErrorToast',
  component: ErrorToast,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    isVisible: true,
    message: 'Произошла непредвиденная ошибка',
    onDismiss: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};



