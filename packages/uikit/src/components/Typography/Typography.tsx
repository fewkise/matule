import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Typography, TypographyStyleNames, TypographyStyleName } from '../../theme/typography';

/**
 * Вспомогательный компонент TypographyItem — отображает пример конкретного стиля шрифта.
 * 
 * @param {TypographyStyleName} styleName - Ключ стиля из объекта Typography (например, 'h1', 'bodyText').
 */
const TypographyItem: React.FC<{ styleName: TypographyStyleName }> = ({ styleName }) => (
  <View style={styles.itemContainer}>
    <Text style={[Typography[styleName], styles.textWrapper]}>
      {(styleName as string).replace(/([A-Z])/g, ' $1').trim() + ' (Roboto)'} 
    </Text>
  </View>
);

/**
 * Компонент TypographyShowcase — экран-витрина для демонстрации всех доступных стилей типографики приложения.
 * Используется в Storybook или на экранах для разработчиков для визуального контроля шрифтов.
 * 
 * @component
 */
const TypographyShowcase: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Типографика</Text>
      <FlatList
        data={TypographyStyleNames}
        keyExtractor={(item: string) => item} 
        renderItem={({ item }) => <TypographyItem styleName={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
    fontFamily: 'Roboto',
  },
  itemContainer: {
    paddingVertical: 10,
  },
  textWrapper: {
    lineHeight: undefined,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
});

export default TypographyShowcase;
