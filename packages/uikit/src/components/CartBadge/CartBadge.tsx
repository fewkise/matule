import React from 'react'
import { Button, Surface, Text } from 'react-native-paper'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../theme/colors';

interface CartBadgeProps {
    totalPrice: number;
    title?: string;
    onPress: () => void;
}

/**
 * Компонент CartBadge — плавающая нижняя панель (виджет) корзины.
 * Отображает итоговую стоимость и кнопку перехода в корзину с иконкой.
 * 
 * @param {number} totalPrice - Общая стоимость товаров в корзине, отображаемая в левой части кнопки.
 * @param {string} [title="В корзину"] - Текст кнопки, по умолчанию "В корзину".
 * @param {() => void} onPress - Функция-обработчик нажатия на панель или кнопку.
 */
const CartBadge = ({ totalPrice, title = "В корзину", onPress }: CartBadgeProps) => {
    return (
        <Surface style={styles.floating} elevation={4}>
            <TouchableOpacity onPress={onPress}>
                <Button style={styles.button} icon='cart' mode="contained">
                    <View style={styles.content}>
                        <Text style={styles.text}>{totalPrice} ₽</Text>
                        <Text style={styles.text}>{title}</Text>
                    </View>
                </Button>
            </TouchableOpacity>
        </Surface>
    )
}

const styles = StyleSheet.create({
    floating: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 10,
        overflow: 'hidden'
    },
    button:{
        backgroundColor:colors.accent
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%'
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default CartBadge;
