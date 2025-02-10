"use client"

import { createContext, useContext, useState } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart((prevCart) => ({
            ...prevCart,
            [product.id]: (prevCart[product.id] || 0) + 1,
        }))
    }

    const removeFromCart = (product) => {
        setCart((prevCart) => {
            if (prevCart[product.id] > 1) {
                return {...prevCart, [product.id]: prevCart[product.id] - 1 }
            }
            const newCart = { ...prevCart }
            delete newCart[product.id]
            return newCart
        })
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)