import React, { useContext } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import {RootStackParamList } from '../../navigation/navigator'
import { useNavigation } from '@react-navigation/native'
import { useCart } from '../../data/cartContext'
import { AuthContext } from '../../data/authContext'
import { Alert } from 'react-native'
import {apiService}from 'api-service'
type NavigationProp = StackNavigationProp<RootStackParamList, 'CartScreen'>
const cartPageModule = () => {
    const navigation = useNavigation<NavigationProp>()
    const {user} = useContext(AuthContext)
    const {totalPrice, totalCount, cartItems, clearCart, removeFromCart, changeQuantity} = useCart()
    
    const handleCreateOrder = async()=>{
        if (cartItems.length===0){
            Alert.alert('ваша корзина пуста!')
            return
        }
        try {
            const orderData = {
                user_id:user.id,
                cost:totalPrice,
                package_contents:JSON.stringify(cartItems),
                date_created:new Date().toISOString()
            }
            await apiService.createOrder(orderData)
            Alert.alert('успешный заказ', 'успех',[
                {
                    text:'ok',
                    onPress:()=>{
                        navigation.navigate('MainApp')
                        clearCart()
                    }
                }
            ])
        } catch (e){
            console.log (e.message)
        }

    }
  return {
    handleCreateOrder, cartItems, changeQuantity, totalPrice, removeFromCart
  }
}

export default cartPageModule
