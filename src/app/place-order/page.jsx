"use client";

import CartTotal from "@/src/components/CartTotal";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { AppContext } from "@/src/context/AppContext";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { cart, products, user } = useContext(AppContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    paymentMethod: "cod",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const total = searchParams.get("total");
    if (total) {
      setTotalPrice(parseFloat(total));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const orderItems = cart.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });
  
    // Extract token from local storage
    const token = localStorage.getItem("token");
  
    console.log("Token:", token);
  
    if (!token) {
      toast.error("Authorization token not found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({ ...formData, totalAmount: totalPrice, orderItems }),
      });
  
      if (!response.ok) throw new Error("Failed to place order");
  
      const result = await response.json();
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error placing order");
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row justify-around pt-16 min-h-[80vh] border-t px-3 sm:px-0"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-Fruktur my-6 text-center">
          Place <span className="text-primaryColor font-Fruktur">Order</span>
        </h2>

        <div className="flex gap-3">
          <input name="firstName" onChange={handleChange} value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor" type="text" placeholder="First name" required />
          <input name="lastName" onChange={handleChange} value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor" type="text" placeholder="Last name" required />
        </div>

        <input name="email" onChange={handleChange} value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor" type="email" placeholder="Email address" required />
        <input name="street" onChange={handleChange} value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor" type="text" placeholder="Street" required />

        <div className="flex gap-3">
          <input name="city" onChange={handleChange} value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor" type="text" placeholder="City" required />
          <input name="state" onChange={handleChange} value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor" type="text" placeholder="State" required />
        </div>

        <div className="flex gap-3">
          <input name="phone" onChange={handleChange} value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor" type="text" placeholder="Phone" required />
          <input name="country" onChange={handleChange} value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor" type="text" placeholder="Country" required />
        </div>
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal total={totalPrice} />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-Fruktur my-6 text-center">
            Payment <span className="text-primaryColor font-Fruktur">Method</span>
          </h2>

          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod("paystack")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "paystack" ? "bg-green-400" : ""}`}></p>
              <Image src={'/paystack_logo.png'} alt="paystack logo" width={100} height={100} />
            </div>

            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <button type="submit" className="mt-6 bg-primaryColor text-white px-6 py-2 rounded">
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;