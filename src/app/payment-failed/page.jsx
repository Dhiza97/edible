const PaymentFailed = () => {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
        <p className="mt-4">Unfortunately, your payment could not be processed.</p>
        <p className="mt-2">Please try again or contact support if the issue persists.</p>
      </div>
    );
  };
  
  export default PaymentFailed;