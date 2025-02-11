"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function VerifyOtp() {
    const [otp, setOtp] = useState("");

    const handleVerify = async () => {
        const res = await fetch("/api/auth/verify-otp", {
            method: "POST",
            body: JSON.stringify({ email: localStorage.getItem("resetEmail"), otp }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            toast.success("OTP Verified");
            window.location.href = "/reset-password";
        } else {
            alert("Invalid OTP, try again!");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-6">
            <h2 className="text-xl font-bold">Enter OTP</h2>
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 rounded"
            />
            <button onClick={handleVerify} className="bg-blue-500 text-white p-2 rounded">
                Verify OTP
            </button>
        </div>
    );
}
