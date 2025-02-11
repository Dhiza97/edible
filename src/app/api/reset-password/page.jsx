"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const [password, setPassword] = useState("");

    const handleReset = async () => {
        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            body: JSON.stringify({ email: localStorage.getItem("resetEmail"), newPassword: password }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            toast.success("Password Reset Successful!");
            window.location.href = "/login";
        } else {
            toast.error("Error resetting password");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-6">
            <h2 className="text-xl font-bold">Reset Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
            />
            <button onClick={handleReset} className="bg-green-500 text-white p-2 rounded">
                Reset Password
            </button>
        </div>
    );
}
