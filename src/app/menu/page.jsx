"use client";

import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import Card from "@/src/components/Card";
import { IoChevronDownOutline, IoFilterOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { AppContext } from "@/src/context/AppContext";

const categories = [
  "All",
  "Combos",
  "Main Dishes",
  "Side Dishes",
  "Appetizers",
  "Desserts",
  "Drinks",
];

const Page = () => {
  const { products } = useContext(AppContext);
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    setMenu(products);
  }, [products]);

  useEffect(() => {
    let filtered = products || [];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = products?.filter(
        (product) =>
          product.category.replace(/\s+/g, "-").toLowerCase() ===
          selectedCategory.replace(/\s+/g, "-").toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    switch (sortOption) {
      case "A-Z":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setMenu(filtered);
    setCurrentPage(1);
  }, [selectedCategory, sortOption, searchQuery, products]);

  // Calculate total pages
  const totalPages = Math.ceil(menu?.length / productsPerPage);

  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = menu?.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className="py-20 px-5 md:px-8 lg:px-[8%] min-h-screen flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-Fruktur my-6 text-center">
          Our <span className="text-primaryColor font-Fruktur">Menu</span>
        </h1>

        {/* Banner */}
        <div className="flex flex-col lg:flex-row items-center gap-8 bg-primaryColor rounded-2xl mx-auto pt-6 px-6 md:px-12 w-full max-w-6xl">
          <p className="text-white font-Fruktur text-xl sm:text-2xl md:text-3xl leading-8 sm:leading-10 text-center lg:text-left w-full lg:w-1/2">
            Explore our delicious and carefully curated selection of meals,
            crafted with the finest ingredients to satisfy your taste buds.
          </p>

          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/menu-img.png"
              alt="Delicious Food"
              width={350}
              height={150}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-1/2 mt-20 px-4 py-2 bg-gray-200 rounded-full">
          <input
            type="text"
            placeholder="Search for a dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-gray-200 bg-gray-200 py-2.5 pe-10 shadow-xs sm:text-sm focus:outline-none"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center">
            <button
              type="button"
              className="text-2xl text-gray-700 pr-5 hover:scale-110 duration-300 hover:text-primaryColor"
            >
              <IoIosSearch />
            </button>
          </span>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mt-20 w-full">
          <div className="relative md:hidden w-full">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between w-full px-4 py-2 text-lg font-semibold text-white bg-primaryColor rounded-md"
            >
              {selectedCategory || "Select Category"}
              <IoChevronDownOutline className="ml-2" />
            </button>

            {/* For Mobile */}
            {showDropdown && (
              <div className="absolute left-0 w-full bg-white shadow-lg mt-2 rounded-md z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowDropdown(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* For Desktop */}
          <div className="hidden md:flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-2 text-sm rounded-md ${
                  selectedCategory === category
                    ? "bg-primaryColor text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex justify-end items-center rounded-sm">
            <div>
              <IoFilterOutline />
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="ml-2 p-2 border rounded-md text-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currentProducts?.map((product, index) => {
            return <Card key={product.id || index} product={product} />;
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1 ? "bg-gray-300" : "bg-primaryColor text-white"
              }`}
            >
              <GrPrevious />
            </button>

            <span className="px-4 py-2 bg-gray-200 rounded-md">
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-primaryColor text-white"
              }`}
            >
              <GrNext className="text-white" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
