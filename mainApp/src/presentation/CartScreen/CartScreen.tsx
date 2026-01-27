import React from 'react'
import {Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import cartPageModule from '../../core/modules/cartModule'
import {CartItem, Button} from 'uikit'
import { FlatList } from 'react-native'
const CartScreen = () => {
  const {cartItems, changeQuantity, totalPrice, handleCreateOrder, removeFromCart} = cartPageModule()
  return (
    <SafeAreaView>
        <FlatList data={cartItems} keyExtractor={(item)=>item.id.toString()} renderItem={({item})=>(
          <CartItem item={item} onRemove={removeFromCart} onChangeQuantity={changeQuantity}/>
        )}/>
        <Text>{totalPrice}</Text>
        <Button title='Оформить заказ' onPress={handleCreateOrder}/>
    </SafeAreaView>
  )
}

export default CartScreen
