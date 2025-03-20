"use client";

import { useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="text-center pt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Your order ID is: <strong>{orderId}</strong></p>
      <p className="mt-2">Thank you for your purchase!</p>
    </div>
  );
};

export default PaymentSuccess;