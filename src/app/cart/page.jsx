"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/src/context/AppContext";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CartTotal from "@/src/components/CartTotal";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart, products, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  const cartWithDetails = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product
        ? { ...product, quantity: item.quantity, addedAt: item.addedAt }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.addedAt - b.addedAt);

  useEffect(() => {
    const total = cartWithDetails.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartWithDetails]);

  const handleCheckout = () => {
    router.push(`/place-order?total=${totalPrice}`);
  };

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
                  className="px-3 py-1 bg-[#DF9755] text-white rounded-md hover:cursor-pointer"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>

                <span className="mx-3">{product.quantity}</span>

                <button
                  className="px-3 py-1 bg-[#DF9755] text-white rounded-md hover:cursor-pointer"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>

              <RiDeleteBin6Fill
                className="text-[#DF9755] text-2xl hover:cursor-pointer"
                onClick={() => removeFromCart(product.id)}
              />
            </div>
          ))}

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal showShippingAndTotal={false} />
              <div className="w-full text-end">
                <button
                  className="bg-black text-white text-sm my-8 px-8 py-3"
                  onClick={handleCheckout}
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