

import type { Meta, StoryObj } from '@storybook/react-native';
import {Typography} from 'uikit';
import { View } from 'react-native';

const meta: Meta<typeof Typography> = {
  title: 'Theme/TypographyShowcase',
  component: Typography,
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
