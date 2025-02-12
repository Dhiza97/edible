"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const requestOtp = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("OTP sent to your email!");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password?
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Enter your email to receive an OTP to reset your password.
        </p>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:outline-primaryColor"
          />
        </div>

        <button
          onClick={requestOtp}
          disabled={loading}
          className="w-full bg-primaryColor hover:bg-orange-700 text-white font-semibold py-2 mt-4 rounded-md transition-all duration-300 disabled:bg-gray-400"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Remembered your password?{" "}
          <a href="/auth/login" className="text-primaryColor hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
