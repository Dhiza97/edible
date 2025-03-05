"use client";

import React, { useEffect, useState } from "react";
import { TfiPackage } from "react-icons/tfi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: orderId, status }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? updatedOrder : order
          )
        );
      } else {
        console.error("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <h3>Orders Page</h3>
      {orders.map((order) => (
        <div
          key={order.id}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
        >
          <TfiPackage className="text-7xl" />
          <div>
            {order.shipping ? (
              <>
                <p className="mt-3 mb-2 font-medium">
                  {order.shipping.firstName} {order.shipping.lastName}
                </p>
                <div>
                  <p>{order.shipping.street}</p>
                  <p>
                    {order.shipping.city}, {order.shipping.state},{" "}
                    {order.shipping.country}
                  </p>
                </div>
                <p>{order.shipping.phone}</p>
              </>
            ) : (
              <p>No shipping information available</p>
            )}
          </div>
          <div>
            <p className="text-sm sm:text-[15px]">Items:</p>
            {order.orderItems ? (
              order.orderItems.map((item) => (
                <p key={item.id}>
                  {item.product.name} - {item.quantity} x ${item.price}
                </p>
              ))
            ) : (
              <p>No items available</p>
            )}
            <p className="mt-3">Payment Method: {order.payments.paymentMethod}</p>
            <p>Payment status: {order.payments.status}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <p className="text-sm sm:text-[15px]">${order.totalAmount}</p>
          <select
            className="p-2 font-semibold"
            value={order.status}
            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;