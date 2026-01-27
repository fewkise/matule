import React, { useContext, useEffect, useState } from 'react'
import {apiService} from 'api-service'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/navigator'
import { useCart } from '../../data/cartContext'
import { SheetManager } from 'react-native-actions-sheet'
type NavigationProp = StackNavigationProp<RootStackParamList, 'CartScreen'>
export const mainModule = () => {
    const navigation = useNavigation<NavigationProp>()
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const {cartItems, totalPrice, addToCart} = useCart()
    const [showSheet, setShowSheet] = useState(false)
    const openSheet = (item)=>{
        SheetManager.show('description-sheet',{
            payload:{
                title:item.title,
                message:item.description,
            }
        })
    }
    const handleNavigate = ()=>{
        navigation.navigate('CartScreen')
    }
    const filteredItems = products.filter((item)=>{
        const matchesCategory = selectedCategory
        ? item.category_id === selectedCategory
        : true
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })
    const loadProducts = async ()=>{
        try {
            const data = await apiService.getProducts()
            setProducts(data)
        } catch (e){
            console.log(e.message)
        }
    }
    const loadCategories = async ()=>{
        try {
            const data = await apiService.getCategories()
            setCategories(data)
        } catch (e){
            console.log(e.message)
        }
    }
    useEffect(()=>{
        loadProducts()
        loadCategories()
    }, [])
  return {
    products:filteredItems, openSheet,handleNavigate, cartItems, totalPrice, addToCart, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, categories
  }
}
