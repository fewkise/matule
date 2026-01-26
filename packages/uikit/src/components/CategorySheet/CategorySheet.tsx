import React from 'react';
import ActionSheet, { SheetProps, SheetManager } from 'react-native-actions-sheet';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

interface Category {
  id: string;
  name: string;
}

interface CategorySheetPayload {
  categories: Category[];
  onSelect: (category: Category) => void;
}

/**
 * Компонент CategorySheet — модальное окно (BottomSheet) для выбора категории из списка.
 * Использует библиотеку react-native-actions-sheet для отображения контента.
 * 
 * @param {SheetProps<"category-sheet">} props - Пропсы шторки, предоставляемые библиотекой.
 * @param {Category[]} props.payload.categories - Массив объектов категорий для отображения в списке.
 * @param {(category: Category) => void} props.payload.onSelect - Функция обратного вызова, исполняемая при выборе категории.
 */
const CategorySheet = (props: SheetProps<"category-sheet">) => {
  const { categories, onSelect } = props.payload!;

  return (
    <ActionSheet id={props.sheetId}>
      <View style={{ padding: 20, height: 400 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Выберите категорию</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => {
                onSelect(item);
                SheetManager.hide(props.sheetId);
              }}
              style={{ paddingVertical: 15, borderBottomWidth: 0.5, borderColor: '#eee' }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ActionSheet>
  );
};

export default CategorySheet;
