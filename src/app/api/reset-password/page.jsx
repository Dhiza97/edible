"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      toast.error("No email found. Please request OTP again.");
      return;
    }

    if (!otp || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, otp, newPassword: password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Password Reset Successful!");
        localStorage.removeItem("resetEmail");
        window.location.href = "/api/login";
      } else {
        toast.error(data.error || "Error resetting password");
      }
    } catch (error) {
      toast.error("Failed to reset password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h2>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-primaryColor"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-primaryColor"
          />
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-primaryColor hover:bg-orange-700 text-white font-semibold py-2 mt-4 rounded-md transition-all duration-300 disabled:bg-gray-400"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
