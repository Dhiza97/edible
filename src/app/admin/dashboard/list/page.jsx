"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { FaSquareCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { AppContext } from "@/src/context/AppContext";

const List = () => {
  const { currency } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      const sortedProducts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sortedProducts);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter((product) => product.id !== id));
        Swal.fire("Deleted!", "The product has been removed.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  if (loading) return <p className="text-center py-4">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 font-semibold">Image</th>
              <th className="border p-2 font-semibold">Name</th>
              <th className="border p-2 font-semibold">Category</th>
              <th className="border p-2 font-semibold">Price</th>
              <th className="border p-2 font-semibold">Discount Price</th>
              <th className="border p-2 font-semibold">Stock</th>
              <th className="border p-2 font-semibold">Featured</th>
              <th className="border p-2 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="border p-2">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">{currency}{product.price.toLocaleString()}</td>
                  <td className="border p-2">{`${currency}${
                    product.discountPrice ? product.discountPrice.toLocaleString() : 0
                  }`}</td>
                  <td className="border p-2">{product.stock}</td>
                  <td className="border p-2">
                    {product.isFeatured ? (
                      <FaSquareCheck className="text-xl mx-auto" />
                    ) : (
                      <MdCancel className="text-xl mx-auto" />
                    )}
                  </td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-black text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No products added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdate={fetchProducts}
        />
      )}
    </div>
  );
};

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    discountPrice: product.discountPrice,
    stock: product.stock,
    isFeatured: product.isFeatured,
    category: product.category,
    image: product.image,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${product.id}`, formData);
      onUpdate();
      onClose();
      Swal.fire("Updated!", "Product details have been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update the product.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex justify-start mb-4">
            {formData.image ? (
              <Image
                src={formData.image}
                alt="Product Image"
                width={100}
                height={100}
                className="rounded-md cursor-pointer"
                onClick={() => document.getElementById("imageInput").click()}
              />
            ) : (
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => document.getElementById("imageInput").click()}
              >
                No Image
              </span>
            )}
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md outline-primaryColor"
            placeholder="Product Name"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded-md outline-primaryColor"
            placeholder="Price"
          />

          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="border p-2 rounded-md outline-primaryColor"
            placeholder="Discount Price (Optional)"
          />

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border w-20 p-2 rounded-md outline-primaryColor"
            placeholder="Stock"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded-md outline-primaryColor"
          >
            <option value="Combos">Combos</option>
            <option value="main-dishes">Main Dishes</option>
            <option value="side-dishes">Side Dishes</option>
            <option value="snacks">Snacks</option>
            <option value="drinks">Drinks</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className=""
            />
            Featured
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-3 py-1 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primaryColor text-white px-3 py-1 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;
