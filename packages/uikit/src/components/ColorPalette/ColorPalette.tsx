

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, ColorNames, ColorName } from '../../theme/colors';


const ColorSwatch: React.FC<{ name: ColorName; color: string }> = ({ name, color }) => (
  <View style={styles.swatchContainer}>
    <View style={[styles.colorCircle, { backgroundColor: color, borderWidth: (color === '#FFFFFF' || color === '#F3F3F3' || color === '#E0E0E0') ? 1 : 0, borderColor: '#ccc' }]} />
    <Text style={styles.colorName}>{name}</Text>
    <Text style={styles.hexCode}>{color}</Text>
  </View>
);

const ColorPalette: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Цвета</Text>
      <FlatList
        data={ColorNames}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ColorSwatch name={item} color={colors[item]} />
        )}
        numColumns={3} 
        columnWrapperStyle={styles.row}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  swatchContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  colorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  colorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  hexCode: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default ColorPalette;
