"use client";

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/src/context/AppContext";
import Card from "@/src/components/Card";

const Wishlist = () => {
  const { user, likes, products } = useContext(AppContext);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    console.log("User:", user);
    console.log("Likes:", likes);
    console.log("Products:", products);

    if (user && likes.length > 0) {
      const likedProductIds = likes.map((like) => like.productId);
      const likedProducts = products.filter((product) =>
        likedProductIds.includes(product.id)
      );
      setLikedProducts(likedProducts);
    } else {
      setLikedProducts([]);
    }
  }, [user, likes, products]);

  console.log("Liked Products:", likedProducts);

  return (
    <div className="pt-20 px-5 lg:px-8 xl:px-[8%] mx-auto">
      <h2 className="font-Fruktur text-3xl my-7">
        Your <span className="text-primaryColor font-Fruktur">Wishlist</span>
      </h2>

      {likedProducts.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid gap-6 w-full mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {likedProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;