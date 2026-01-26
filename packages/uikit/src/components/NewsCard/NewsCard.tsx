import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { colors } from '../../theme/colors';

interface Props {
  title: string;
  price: string;
  imageSource: { uri: string };
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

/**
 * Компонент SalesAndNewsCard — карточка для отображения акций и новостей.
 * Использует Card из react-native-paper для отображения контента с тенями и закруглениями.
 * 
 * @param {string} title - Заголовок новости или название акции.
 * @param {string} price - Стоимость товара или размер скидки.
 * @param {Object} imageSource - Объект с URI изображения для отображения в правой части карточки.
 */
const NewsCard: React.FC<Props> = ({ title, price, imageSource }) => {
  return (
    <Card style={styles.cardContainer} elevation={2}>
      <Card.Content style={styles.content}>
        <Card.Actions style={styles.textContainer}>
          <Text variant="titleLarge" style={styles.title}>
            {title}
          </Text>
          <Text variant="headlineMedium" style={styles.price}>
            {price} $
          </Text>
        </Card.Actions>
        
        <Card.Cover 
          source={imageSource} 
          style={styles.image} 
          resizeMode="contain" 
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: 200,
    marginRight: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 0,
    width: '50%',
  },
  title: {
    fontWeight: '600',
    color: '#f9a5fcff',
    marginBottom: 8,
  },
  price: {
    fontWeight: '700',
    color: colors.accent, 
  },
  image: {
    width: 130,
    height: 130,
    backgroundColor: 'transparent',
  },
});

export default NewsCard;
