import React from "react";
import { products } from "../app/assets/assets";
import Card from "./Card";
import Link from "next/link";

const New = () => {
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
        {products.map((product) => (
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
