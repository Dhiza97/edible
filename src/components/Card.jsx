"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

const Card = ({ product }) => {
  const { addToCart } = useContext(AppContext);

  return (
    <div className="my-10">
      <div className="group relative block overflow-hidden">
        <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
          <IoHeartOutline className="text-xl" />
        </button>

        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 bg-white p-6">
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm text-gray-700">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="block w-full mt-4 rounded-sm bg-[#EDF4C2] p-4 text-sm font-medium transition hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
