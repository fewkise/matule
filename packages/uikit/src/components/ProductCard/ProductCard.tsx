import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';

interface IProduct {
    title: string;
    price: string;
    category: string;
    onPress: () => void;
    onCardPress: () => void;
}

/**
 * Компонент ProductCard — карточка товара, отображающая основную информацию о продукте.
 * Позволяет просматривать детали товара и добавлять его в корзину.
 * 
 * @param {string} title - Название продукта.
 * @param {string} price - Стоимость продукта (отображается со знаком $).
 * @param {string} category - Название категории, к которой относится товар.
 * @param {() => void} onPress - Функция-обработчик нажатия на кнопку "Добавить".
 * @param {() => void} onCardPress - Функция-обработчик нажатия на всю область карточки (например, для перехода в детали).
 */
const ProductCard: React.FC<IProduct> = ({ title, price, onPress, onCardPress, category }) => {
  return (
    <Card onPress={onCardPress} style={styles.cardContainer} elevation={3}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
            <Text variant="titleMedium" style={styles.title}>{title}</Text>
            <Text variant="bodyMedium" style={styles.category}>{category}</Text>
        </View>

        <View style={styles.footer}>
            <Text variant="headlineSmall" style={styles.price}>{price}$</Text>
            <Button 
                onPress={onPress} 
                mode="contained" 
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                Добавить
            </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 8,
        margin: 10,
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    category: {
        color: '#9E9E9E',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 8,
        backgroundColor: '#007AFF',
        paddingHorizontal: 0,
    },
    buttonLabel: {
        marginHorizontal: 12,
        marginVertical: 4,
        fontWeight: '600',
    }
});

export default ProductCard;
