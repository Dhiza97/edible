"use client";

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const CartTotal = () => {
  const { cart, products, currency } = useContext(AppContext);
  const [subtotal, setSubtotal] = useState(0);
  const shippingFee = 5.00; // Example shipping fee

  useEffect(() => {
    // Calculate subtotal
    const total = cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);
    setSubtotal(total);
  }, [cart, products]); // Recalculate when cart or products change

  return (
    <div className="w-full">
      <div className="text-2xl">
        <h2 className="font-Fruktur text-2xl my-7">
          Cart <span className="text-primaryColor font-Fruktur">Total</span>
        </h2>
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm text-black">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{shippingFee.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{(subtotal + shippingFee).toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
