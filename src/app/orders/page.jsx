"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";

const orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-20">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="border-t pt-20 px-20">
      <div className="text-2xl text-start">
        <h2 className=" font-Fruktur my-6">
          MY <span className="text-primaryColor font-Fruktur">ORDERS</span>
        </h2>
      </div>

      {orderData.map((order) => (
        <div key={order.id} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col items-start gap-10 text-sm">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex items-start gap-10 text-sm">
                <Image src={item.product.image} alt={item.product.name} width={50} height={50} />
                <div>
                  <p className="sm:text-base font-medium">{item.product.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="mt-1">
                    Date: <span className="text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className="mt-1">
                    Payment Method: <span className="text-gray-400">{order.payments?.paymentMethod}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:w-1/2 flex justify-between">
            <div className="flex items-center gap-2">
              <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
              <p className="text-sm md:text-base">{order.shipping?.status}</p>
            </div>
            <button className="border px-4 py-2 text-sm font-medium rounded-sm">
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default orders;