import React, { useContext, useEffect, useState } from 'react'
import {apiService} from 'api-service'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/navigator'
import { useCart } from '../../data/cartContext'
import { SheetManager } from 'react-native-actions-sheet'
import { useError } from '../../data/errorContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
type NavigationProp = StackNavigationProp<RootStackParamList, 'CartScreen'>
const CACHE_KEYS = {
    PRODUCTS: 'cache_products',
    CATEGORIES: 'cache_categories'
};
export const mainModule = () => {
    const { showError } = useError();
    const navigation = useNavigation<NavigationProp>()
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [categories, setCategories] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const {cartItems, totalPrice, addToCart} = useCart()
    const onRefresh = async () => {
            setRefreshing(true);
            await loadProducts();
            setRefreshing(false);
    }
    const openSheet = (item)=>{
        SheetManager.show('description-sheet',{
            payload:{
                title:item.title,
                message:item.description,
            }
        })
    }
    useEffect(() => {
        const loadFromCache = async () => {
            try {
                const cachedProducts = await AsyncStorage.getItem(CACHE_KEYS.PRODUCTS);
                const cachedCategories = await AsyncStorage.getItem(CACHE_KEYS.CATEGORIES);
                
                if (cachedProducts) setProducts(JSON.parse(cachedProducts));
                if (cachedCategories) setCategories(JSON.parse(cachedCategories));
            } catch (e) {
                useError(e.message)
            }
        };
        loadFromCache();
    }, []);
    const handleNavigate = ()=>{
        navigation.navigate('CartScreen')
    }
        const loadProducts = async () => {
        try {
            const data = await apiService.getProducts(searchQuery, selectedCategory);
            setProducts(data);
            if (!searchQuery && !selectedCategory) {
                await AsyncStorage.setItem(CACHE_KEYS.PRODUCTS, JSON.stringify(data));
            }
        } catch (e) {
            showError(e.message);
        }
    };
        const loadCategories = async () => {
        try {
            const data = await apiService.getCategories();
            setCategories(data);
            await AsyncStorage.setItem(CACHE_KEYS.CATEGORIES, JSON.stringify(data));
        } catch (e) {
            showError(e.message);
        }
    };
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            loadProducts();
        }, 400);
        return () => clearTimeout(delayDebounce);
    }, [searchQuery, selectedCategory]);
    useEffect(()=>{
        loadCategories()
    }, [])
  return {
    products, openSheet,handleNavigate, refreshing, onRefresh, setRefreshing, loadProducts, cartItems, totalPrice, addToCart, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, categories
  }
}
