"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

const Card = ({ product }) => {
  const { addToCart, cart, updateCartItem, toggleLike, likes } = useContext(AppContext);

  // Find the cart item for this product
  const cartItem = cart.find((item) => item.productId === product.id);

  // Check if the product is liked
  const isLiked = likes.some((like) => like.productId === product.id);

  return (
    <div className="my-10">
      <div className="group relative block overflow-hidden">
        <button
          className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
          onClick={() => toggleLike(product.id)}
        >
          {isLiked ? <IoHeart className="text-xl text-red-500" /> : <IoHeartOutline className="text-xl" />}
        </button>

        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 bg-white p-6">
          <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1.5 text-sm text-gray-700">${product.price.toFixed(2)}</p>

          {cartItem && cartItem.quantity > 0 ? (
            <div className="flex items-center justify-between mt-4 border border-gray-300 rounded-sm">
              <button
                onClick={() => updateCartItem(product.id, "decrease")}
                className="w-10 h-10 bg-[#EDF4C2] text-gray-900 text-xl flex items-center justify-center"
              >
                -
              </button>
              <span className="text-lg font-medium">{cartItem.quantity}</span>
              <button
                onClick={() => updateCartItem(product.id, "increase")}
                className="w-10 h-10 bg-[#EDF4C2] text-gray-900 text-xl flex items-center justify-center"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="block w-full mt-4 rounded-sm bg-[#EDF4C2] p-4 text-sm font-medium transition hover:scale-105"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;