import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

interface Props {
  label: string;
  value: string;
  onPress: () => void;
}

/**
 * Компонент Select — поле выбора, стилизованное под текстовый ввод react-native-paper.
 * Используется для вызова модальных окон или списков выбора при нажатии.
 * 
 * @param {string} label - Текст подсказки (label), отображаемый внутри или над полем.
 * @param {string} value - Выбранное значение, которое будет отображаться в текстовом поле.
 * @param {() => void} onPress - Функция-обработчик, вызываемая при нажатии на весь компонент.
 */
const Select = ({ label, value, onPress }: Props) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.7}
      style={{ marginBottom: 15 }}
    >
      <View pointerEvents="none">
        <TextInput
          label={label}
          value={value}
          mode="outlined"
          right={<TextInput.Icon icon="chevron-down" />}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Select;
