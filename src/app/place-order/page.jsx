"use client";

import CartTotal from "@/src/components/CartTotal";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { AppContext } from "@/src/context/AppContext";

const PlaceOrderContent = () => {
  const { user, cart, clearCart } = useContext(AppContext);
  const [selectedShippingOptionId, setSelectedShippingOptionId] =
    useState(null);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (option) => {
    setSelectedShippingOptionId(option.id);
    setShippingFee(option.price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to place an order.");
      return;
    }
    if (!selectedShippingOptionId) {
      toast.error("Please select a shipping option.");
      return;
    }

    const orderItems = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      ...formData,
      userId: user.id,
      orderItems: orderItems,
      shippingFee: shippingFee,
      totalPrice: totalPrice + shippingFee,
      paymentMethod: method,
      shippingOptionId: selectedShippingOptionId,
    };

    try {
      if (method === "cod") {
        // Handle Cash on Delivery
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          toast.success("Order placed successfully!");
          clearCart();
          router.push("/orders");
        } else {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to place order.");
        }
      } else if (method === "paystack") {
        // Handle Paystack Payment
        const response = await fetch("/api/orders/paystack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          toast.error("Failed to initialize payment.");
          return;
        }

        const data = await response.json();
        if (data.success) {
          // Redirect to Paystack payment page
          window.location.replace(data.authorization_url);
        } else {
          toast.error(data.message || "Failed to initialize payment.");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing your order.");
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
            Shipping{" "}
            <span className="text-primaryColor font-Fruktur">Options</span>
          </h2>
          <div className="flex flex-col gap-2">
            {shippingOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleShippingChange(option)}
                className={`flex items-center justify-between border p-2 px-3 cursor-pointer ${
                  selectedShippingOptionId === option.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      selectedShippingOptionId === option.id
                        ? "bg-green-400"
                        : ""
                    }`}
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

const PlaceOrder = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlaceOrderContent />
    </Suspense>
  );
};

export default PlaceOrder;