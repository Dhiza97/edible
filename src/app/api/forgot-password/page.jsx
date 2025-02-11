"use client"

import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const requestOtp = async () => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("OTP sent to email!");
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={requestOtp}>Send OTP</button>
    </div>
  );
}
