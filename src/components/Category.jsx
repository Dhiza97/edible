import React from "react";
import { category } from "../app/assets/assets";
import Link from "next/link";

const Category = () => {
  return (
    <div className="text-center py-10 px-5 lg:px-8 xl:px-[8%] my-20">
      <h2 className="font-Fruktur text-4xl">
        Explore Our{" "}
        <span className="text-primaryColor font-Fruktur">Categories</span>
      </h2>
      <p className="mt-4 text-sm">
        Discover a variety of delicious dishes, crafted to satisfy every
        craving.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center mt-10">
        {category.map((category) => {
          return (
            <Link href={`${category.link}`} key={category.id}>
              <div className="card-container">
                <div className="card w-full sm:w-[300px]">
                  {/* Front */}
                  <div className="face front">
                    <div className="icon text-9xl text-primaryColor">
                      {category.image}
                    </div>
                    <h3 className="text-lg text-[#DF9755] font-semibold mt-6">
                      {category.title}
                    </h3>
                  </div>
                  {/* Back */}
                  <div className="face back">
                    <p>{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
