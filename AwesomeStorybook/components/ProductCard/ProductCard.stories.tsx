import React from 'react';
import { Meta, StoryObj } from '@storybook/react-native';
import { View, Alert } from 'react-native';
import { ProductCard, BottomSheet } from 'uikit'; 
import {registerSheet , SheetManager} from 'react-native-actions-sheet';


registerSheet('product-description-sheet', BottomSheet);

const meta: Meta<typeof ProductCard> = {
  args: {
    title: 'Название продукта',
    price: '555 ₽', 
    category: 'Категория',
    onPress: () => Alert.alert('Товар добавлен'), 
    onCardPress: () => {},
  },
  decorators: [
    (Story) => (
        <View style={{ padding: 10 }}>
          <Story />
        </View>
    ),
  ],
  component: ProductCard,
  title: 'components/ProductCard',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Рубашка Воскресенье для машинного вязания',
    price: '300 ₽',
    category: 'Мужская одежда',
    onCardPress: () => {
      SheetManager.show('product-description-sheet', {
        payload: {
          title: 'Описание товара',
          message: 'Подробное описание рубашки.Подробное описание рубашки.Подробное описание рубашки.Подробное описание рубашки.Подробное описание рубашки.Подробное описание рубашки.Подробное описание рубашки.Подробное описание рубашки.Подробное описание рубашки.Подробное описание рубашки.',
        },
      });
    },
  },
};
