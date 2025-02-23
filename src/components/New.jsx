"use client"

import React, { useContext } from "react";
import Card from "./Card";
import Link from "next/link";
import { AppContext } from "../context/AppContext";

const New = () => {
  const { products } = useContext(AppContext);

  // Filter products to get only those with isFeatured set to true
  const featuredProducts = products.filter(product => product.isFeatured);

  return (
    <div className="text-center py-10 px-5 lg:px-8 xl:px-[8%] my-20">
      <h2 className="font-Fruktur text-4xl">
        <span className="text-primaryColor font-Fruktur">Fresh & New </span>
        on the Menu
      </h2>
      <p className="mt-4 text-sm">
        Bold flavors, fresh ingredients—taste the latest creations!
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.slice(0, 6).map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <Link href={'/menu'}>
        <button className="py-4 px-8 border border-primaryColor text-primaryColor rounded-full hover:bg-primaryColor hover:text-white transition-all duration-300">See More</button>
      </Link>
    </div>
  );
};

export default New;