"use client";

import CartTotal from "@/src/components/CartTotal";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppContext } from "@/src/context/AppContext";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { cart, user, clearCart } = useContext(AppContext);
  const [selectedShippingOptionId, setSelectedShippingOptionId] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
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
  const router = useRouter();

  // Shipping options data
  const shippingOptions = [
    { id: "island", name: "Island (Ikoyi, VI, Lagos Island)", price: 3500 },
    {
      id: "lekki1",
      name: "Lekki 1 (Phase 1, Marwa, Ikate, Ilasan, Osapa, Agungi, Idado, Igbo Efon)",
      price: 3500,
    },
    {
      id: "mainland1",
      name: "Mainland 1 (Surulere, Yaba, Ilupeju, Ketu, Mushin, Somolu, Ogudu, Anthony, Gbagada)",
      price: 3500,
    },
    {
      id: "lekki2",
      name: "Lekki 2 (Chevron, Ikota, Orchid Road, VGC, Ajah, Abraham Adesanya)",
      price: 3800,
    },
    {
      id: "mainland2",
      name: "Mainland 2 (Ikeja, Ogba, Oshodi, Alausa, Agege, Iju)",
      price: 4000,
    },
    {
      id: "lekki3",
      name: "Lekki 3 (Ogombo, Sangotedo, Awoyaya)",
      price: 4800,
    },
    {
      id: "alimosho",
      name: "Alimosho (Abule Egba, Idimu, Igando, Ikotun, Iyana Ipaja, Akowonjo, Egbeda)",
      price: 5000,
    },
    {
      id: "apapa",
      name: "Apapa (Apapa, Ijora, Ajegunle, Badia)",
      price: 5000,
    },
    {
      id: "berger",
      name: "Berger (Magodo, Omole, Ojodu Berger, Olowora, Isheri)",
      price: 5000,
    },
    { id: "festac", name: "Festac (Festac, Orile, Mile 2)", price: 5000 },
    { id: "ikorodu", name: "Ikorodu", price: 5000 },
    {
      id: "isolo",
      name: "Isolo (Isolo, Okota, Ejigbo, Ajao Estate, Ilasamaja, Mafoluku, Isagatedo)",
      price: 5000,
    },
  ];

  useEffect(() => {
    const total = searchParams.get("total");
    if (total) {
      setTotalPrice(parseFloat(total));
    }
  }, [searchParams]);

  useEffect(() => {
    // Dynamically load Paystack script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (option) => {
    setSelectedShippingOptionId(option.id);
    setShippingFee(option.price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedShippingOptionId) {
      toast.error("Please select a shipping option.");
      return;
    }
  
    // Extract token from local storage
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("Authorization token not found. Please log in.");
      return;
    }
  
    // Define orderItems based on the items in the cart
    const orderItems = cart.map((item) => ({
      quantity: item.quantity,
      price: parseFloat(item.price),
      product: {
        connect: { id: item.id },
      },
    }));
  
    if (method === "paystack") {
      handlePaystackPayment(orderItems);
    } else {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            price: parseFloat(totalPrice) + parseFloat(shippingFee),
            orderItems,
            paymentMethod: method,
          }),
        });
  
        if (!response.ok) throw new Error("Failed to place order");
  
        toast.success("Order placed successfully!");
        clearCart();
        router.push("/orders");
      } catch (error) {
        console.error(error);
        toast.error("Error placing order");
      }
    }
  };

  const handlePaystackPayment = (orderItems) => {
    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: (totalPrice + shippingFee) * 100,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (paymentResponse) {
        handlePaymentSuccess(paymentResponse, orderItems);
      },
      onClose: function () {
        toast.error("Payment was not completed.");
      },
    });
    handler.openIframe();
  };

  const handlePaymentSuccess = async (paymentResponse, orderItems) => {
    // Handle successful payment here
    console.log(
      "Payment successful. Transaction reference:",
      paymentResponse.reference
    );
    toast.success("Payment successful!");
  
    // Extract token from local storage
    const token = localStorage.getItem("token");
  
    // Create order in the database after payment is verified
    try {
      const price = totalPrice + shippingFee;
      console.log("orderData being sent:", {
        ...formData,
        price: price,
        orderItems,
        paymentMethod: method,
      });
  
      const response = await fetch("/api/orders/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          reference: paymentResponse.reference,
          userId: user.id,
          orderData: {
            ...formData,
            price: price,
            orderItems,
            paymentMethod: method,
          },
          shippingData: {
            ...formData,
          },
        }),
      });
  
      if (!response.ok) throw new Error("Failed to create order");
  
      clearCart();
      router.push("/orders");
    } catch (error) {
      console.error(error);
      toast.error("Error creating order");
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
          <input
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor"
            type="text"
            placeholder="First name"
            required
          />
          <input
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor"
            type="text"
            placeholder="Last name"
            required
          />
        </div>

        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor"
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          onChange={handleChange}
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor"
          type="text"
          placeholder="Street"
          required
        />

        <div className="flex gap-3">
          <input
            name="city"
            onChange={handleChange}
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor"
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={handleChange}
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor"
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor"
            type="text"
            placeholder="Phone"
            required
          />
          <input
            name="country"
            onChange={handleChange}
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-primaryColor"
            type="text"
            placeholder="Country"
            required
          />
        </div>

        {/* Shipping Options */}
        <div className="mt-8">
          <h2 className="text-2xl font-Fruktur my-6 text-center">
            Shipping <span className="text-primaryColor font-Fruktur">Options</span>
          </h2>
          <div className="flex flex-col gap-2">
            {shippingOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleShippingChange(option)}
                className={`flex items-center justify-between border p-2 px-3 cursor-pointer ${selectedShippingOptionId === option.id ? 'bg-gray-100' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${selectedShippingOptionId === option.id ? 'bg-green-400' : ''}`}
                  ></p>
                  <p className="text-sm">{option.name}</p>
                </div>
                <p className="text-sm">₦{option.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal
            showShippingAndTotal={true}
            total={totalPrice}
            shippingFee={shippingFee}
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-Fruktur my-6 text-center">
            Payment{" "}
            <span className="text-primaryColor font-Fruktur">Method</span>
          </h2>

          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("paystack")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "paystack" ? "bg-green-400" : ""
                }`}
              ></p>
              <Image
                src={"/paystack_logo.png"}
                alt="paystack logo"
                width={100}
                height={100}
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-primaryColor text-white px-6 py-2 rounded"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
