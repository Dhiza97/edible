"use client";

import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "@/src/context/AppContext";

const PaymentSuccess = ({ orderId }) => {
  const { clearCart } = useContext(AppContext);
  const hasClearedCart = useRef(false);

  useEffect(() => {
    if (!hasClearedCart.current) {
      clearCart();
      hasClearedCart.current = true;
    }
  }, [clearCart]);

  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-2">Thank you for your purchase!</p>
      <Link href="/orders">
        <button className="mt-6 bg-primaryColor text-white px-6 py-2 rounded">
          View Your Orders
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;