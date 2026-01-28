import React, { useContext } from "react"
import { createContext, useMemo, useState } from "react"
import {apiService} from 'api-service'
import { AuthContext } from "./authContext"
import { useError } from './errorContext'
interface CartItem {
    id:number | string,
    price:number,
    quantity:number,
    title:string,
    category:string
}
interface CartContextType {
    addToCart:(product:any)=>void,
    removeFromCart:(id:string | number)=>void,
    changeQuantity:(id:string | number, delta:number)=>void,
    totalPrice:number,
    totalCount:number,
    clearCart:()=>void, 
    cartItems:CartItem[]
}
export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const { showError } = useError(); 
    const {user} = useContext(AuthContext)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const addToCart = async (product: any) => {
    setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
            return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1 }];
    });

    if (user?.id) {
        try {
            await apiService.syncCartItem(user.id, product.id, 1);
        } catch (e) {
            showError(e.message)
        }
    }
    };
   const changeQuantity = async (id: string | number, delta: number) => {
    let updatedQuantity = 0;

    setCartItems((prev) => {
        const newItems = prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + delta } : item
        ).filter(item => item.quantity > 0);

        const found = newItems.find(i => i.id === id);
        updatedQuantity = found ? found.quantity : 0;
        return newItems;
    });
    if (user?.id) {
        try {
            if (updatedQuantity > 0) {
                await apiService.syncCartItem(user.id, id, updatedQuantity);
            } else {
                await apiService.removeFromCartRequest(user.id, id);
            }
        } catch (e) {
            showError(e.message)
        }
    }
    };
    const removeFromCart = (id:string | number)=>{
        setCartItems((prev)=>{
            return prev.filter((item)=> item.id !== id)
        })
    }
    const totalPrice = useMemo(()=>{
        return cartItems.reduce((sum, item)=> sum + item.quantity * item.price, 0)
    }, [cartItems])
    const totalCount = useMemo(()=>{
        return cartItems.reduce((sum, item)=> sum + item.quantity, 0)
    }, [cartItems])
    const clearCart = ()=>{
        setCartItems([])
    }
    return (
        <CartContext.Provider value={{addToCart, totalCount, clearCart, cartItems, totalPrice, removeFromCart, changeQuantity}}>
            {children}
        </CartContext.Provider>
    )
}
export const useCart = ()=>{
    const context = useContext(CartContext)
    return context
}