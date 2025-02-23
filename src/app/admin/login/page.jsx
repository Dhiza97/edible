"use client";
import Image from "next/image";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("adminToken", data.token);
      toast.success("Login successful");
      window.location.href = "/admin/dashboard";
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image src={assets.logo_light} alt="logo" className="w-24"/>
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3 outline-primaryColor"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3 outline-primaryColor"
          required
        />
        <button className="bg-primaryColor text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
