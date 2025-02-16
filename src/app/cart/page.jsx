"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/src/context/CartContext";
import { products } from "../assets/assets";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  const cartWithDetails = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean);
  

  useEffect(() => {
    const total = cartWithDetails.reduce((sum, product) => sum + product.price * product.quantity, 0);
    setTotalPrice(total);
  }, [cartWithDetails]);
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cartWithDetails.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Your cart is empty.</p>
          <Link href="/menu" className="text-blue-500 hover:underline mt-4 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 max-w-2xl mx-auto">
          {cartWithDetails.map((product) => (
            <div key={product.id} className="flex items-center border p-4 rounded-lg shadow-md">
              <Image src={product.image} alt={product.name} width={80} height={80} className="rounded-md" />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-700">${product.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => removeFromCart(product)} className="px-3 py-1 bg-red-500 text-white rounded-md">-</button>
                  <span className="mx-3">{product.quantity}</span>
                  <button onClick={() => addToCart(product)} className="px-3 py-1 bg-green-500 text-white rounded-md">+</button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-6">Total: ${totalPrice.toFixed(2)}</div>
          <button className="w-full bg-blue-600 text-white p-3 rounded-md mt-4">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
