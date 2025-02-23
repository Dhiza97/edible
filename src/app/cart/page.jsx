"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/src/context/AppContext";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CartTotal from "@/src/components/CartTotal";

const Cart = () => {
  const { cart, products } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartWithDetails = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  useEffect(() => {
    const total = cartWithDetails.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartWithDetails]);

  return (
    <div className="pt-20 px-5 lg:px-8 xl:px-[8%] mx-auto">
      <h2 className="font-Fruktur text-3xl my-7">
        Shopping <span className="text-primaryColor font-Fruktur">Cart</span>
      </h2>

      {cartWithDetails.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Your cart is empty.</p>
          <Link
            href="/menu"
            className="text-primaryColor hover:underline mt-4 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 w-full mx-auto">
          {cartWithDetails.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-7">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />

                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-700">${product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center mt-2">
                <button
                  onClick={() => removeFromCart(product)}
                  className="px-3 py-1 bg-[#DF9755] text-white rounded-md"
                >
                  -
                </button>
                <span className="mx-3">{product.quantity}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="px-3 py-1 bg-[#DF9755] text-white rounded-md"
                >
                  +
                </button>
              </div>

              <RiDeleteBin6Fill
                onClick={() => removeFromCart(product)}
                className="text-[#DF9755] text-2xl"
              />
            </div>
          ))}

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  className="bg-black text-white text-sm my-8 px-8 py-3"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
