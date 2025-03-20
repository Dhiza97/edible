"use client";

import { useRouter } from "next/navigation";

const PaymentFailed = () => {
  const router = useRouter();

  const handleRetry = () => {
    router.push("/place-order");
  };

  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-4">
        Unfortunately, your payment could not be processed.
      </p>
      <p className="mt-2">Please try again or contact support if the issue persists.</p>
      <button
        onClick={handleRetry}
        className="mt-6 bg-primaryColor text-white px-6 py-2 rounded"
      >
        Retry Payment
      </button>
    </div>
  );
};

export default PaymentFailed;