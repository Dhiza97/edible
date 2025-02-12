"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auto-focus on input when component mounts
    document.getElementById("otpInput")?.focus();
  }, []);

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Please enter OTP.");
      return;
    }

    const email = localStorage.getItem("verifyEmail");
    if (!email) {
      toast.error("Email not found. Please request OTP again.");
      return;
    }

    console.log("Stored email:", email);

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          email: localStorage.getItem("verifyEmail"),
          otp: otp.toString(),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("OTP Verified Successfully!");
        window.location.href = "/api/login";
      } else {
        toast.error("Invalid OTP, try again!");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Enter the OTP sent to your email.
        </p>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            OTP Code
          </label>
          <input
            type="text"
            id="otpInput"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:outline-primaryColor text-center tracking-widest text-lg"
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-primaryColor hover:bg-orange-700 text-white font-semibold py-2 mt-4 rounded-md transition-all duration-300 disabled:bg-gray-400"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* <p className="text-center text-sm text-gray-600 mt-4">
          Didn't receive the code?{" "}
          <a
            href="/auth/forgot-password"
            className="text-primaryColor hover:underline"
          >
            Resend OTP
          </a>
        </p> */}
      </div>
    </div>
  );
}
