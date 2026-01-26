import React from 'react'
import { IconButton, List, Text} from 'react-native-paper'
import { View, StyleSheet} from 'react-native'

interface CartItemI {
    item: {
        id: string | number,
        title: string,
        price: number,
        quantity: number
    }
    onChangeQuantity: (id: string | number, delta: number) => void,
    onRemove: (id: string | number) => void
}

/**
 * Компонент CartItem — элемент списка товаров в корзине.
 * Позволяет отображать информацию о товаре и управлять его количеством.
 * 
 * @param {Object} item - Объект данных товара (содержит id, название, цену и текущее количество).
 * @param {(id: string | number, delta: number) => void} onChangeQuantity - Функция для изменения количества товара (delta принимает 1 или -1).
 * @param {(id: string | number) => void} onRemove - Функция для полного удаления товара из корзины.
 */
const CartItem: React.FC<CartItemI> = ({item, onChangeQuantity, onRemove}) => {
    return (
        <View>
            <List.Item
                title={item.title}
                description={`${item.price * item.quantity} ₽`}
                left={props => <List.Icon {...props } icon='package-variant'/>}
                right={() => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton icon='minus' onPress={() => onChangeQuantity(item.id, -1)}/>
                        <Text>{item.quantity}</Text>
                        <IconButton icon='plus' onPress={() => onChangeQuantity(item.id, 1)}/>
                        <IconButton icon='close' onPress={() => onRemove(item.id)}/>
                    </View>
                )}
            />
        </View>
    )
}

export default CartItem
