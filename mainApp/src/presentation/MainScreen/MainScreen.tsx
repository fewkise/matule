import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import { Chip, ProductCard, Search, CartBadge } from 'uikit'
import { mainModule } from '../../core/modules/mainModule'

const MainScreen = () => {
    const { products, categories, handleNavigate, openSheet,selectedCategory, cartItems, totalPrice, addToCart, setSelectedCategory, searchQuery, setSearchQuery } = mainModule()
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Search value={searchQuery} onChangeText={setSearchQuery} />

            <View style={{ height: 50, marginVertical: 10 }}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
                >
                    <Chip 
                        title='всё' 
                        isActive={selectedCategory === null} 
                        onPress={() => setSelectedCategory(null)} 
                    />
                    {categories.map((item) => (
                        <View key={item.id.toString()} style={{ marginLeft: 8 }}>
                            <Chip 
                                isActive={selectedCategory === item.id} 
                                title={item.category} 
                                onPress={() => setSelectedCategory(item.id)} 
                                id={String(item.id)} 
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>

            <FlatList 
                data={products} 
                keyExtractor={(item) => item.id.toString()} 
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item }) => (
                    <ProductCard 
                        title={item.title} 
                        onPress={() => addToCart(item)} 
                        onCardPress={()=>openSheet(item)}
                        price={item.price} 
                    />
                )} 
            />

            {cartItems.length > 0 && (
                <View style={{ position: 'absolute', bottom: 20, left: 10, right: 10 }}>
                    <CartBadge totalPrice={totalPrice} onPress={handleNavigate} title='в корзину' />
                </View>
            )}
        </SafeAreaView>
    )
}

export default MainScreen
