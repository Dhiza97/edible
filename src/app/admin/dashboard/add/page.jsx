"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { LuUpload } from "react-icons/lu";

const AddItem = ({ token }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(false);
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState("General");
  const [stock, setStock] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("isFeatured", isFeatured);
      if (discountPrice) formData.append("discountPrice", discountPrice);
      if (image) formData.append("image", image);

      console.log("Submitting form...")

      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });

      if (response.data.success) {
        toast.success("Product added successfully!");
        setName("");
        setImage(false);
        setPrice("");
        setDiscountPrice("");
        setStock(0);
        setIsFeatured(false);
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <h2 className="text-2xl pt-10">Add Products</h2>
      <hr className="w-1/2" />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-1/2 items-start gap-3 p-4 shadow-xl rounded-xl"
      >
        <div>
          <p className="mb-2">Upload Product Image</p>
          <label htmlFor="image" className="cursor-pointer">
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploaded Image"
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center border border-dashed border-gray-400 rounded hover:bg-[#EDF4C2]">
                <LuUpload className="text-primaryColor w-10 h-10" />
              </div>
            )}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        </div>

        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-3 py-2 border border-black outline-primaryColor focus:border-none"
            type="text"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="flex gap-2 w-full">
          <div className="w-full">
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 border border-black outline-primaryColor focus:border-none"
              type="number"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="w-full">
            <p className="mb-2">Discount Price</p>
            <input
              onChange={(e) => setDiscountPrice(e.target.value)}
              value={discountPrice}
              className="w-full px-3 py-2 border border-black outline-primaryColor focus:border-none"
              type="number"
              placeholder="Enter discount price (optional)"
            />
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border border-black outline-primaryColor focus:border-none"
            required
          >
            <option value="combos">Combos</option>
            <option value="main-dishes">Main Dishes</option>
            <option value="side-dishes">Side Dishes</option>
            <option value="snacks">Snacks</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>

        <div className="w-full">
          <p className="mb-2">Stock</p>
          <input
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            className="w-20 px-3 py-2 border border-black outline-primaryColor focus:border-none"
            type="number"
            placeholder="Enter stock quantity"
            required
          />
        </div>

        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setIsFeatured(!isFeatured)}
            checked={isFeatured}
            type="checkbox"
            id="isFeatured"
          />
          <label className="cursor-pointer" htmlFor="isFeatured">
            Mark as Featured
          </label>
        </div>

        <button className="w-36 p-4 mt-4 bg-black text-white text-sm">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddItem;
