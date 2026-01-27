import React, { useContext } from "react"
import { createContext, useMemo, useState } from "react"


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
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const addToCart = (product:any)=>{
        setCartItems((prev)=>{
            const existing = prev.find((item)=> item.id === product.id)
            if (existing){
                return prev.map((item)=>item.id === product.id ? {...item, quantity:item.quantity + 1}: item)
            }
            return [...prev, {...product, quantity:1}]
        })
    }
    const changeQuantity = (id:string | number, delta:number)=>{
        setCartItems((prev)=>{
            return prev.map((item)=>{
                return item.id === id ? {...item, quantity:item.quantity + delta} : item
            })
            .filter((item)=>item.quantity > 0)
        })
    }
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