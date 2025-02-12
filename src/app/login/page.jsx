"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/src/context/AuthContext";
import { assets } from "../assets/assets";
import Image from "next/image";

export default function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setUser(data.user);
        router.push("/");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center flex-row-reverse h-screen">
      <div className="hidden md:flex md:w-1/2 h-full justify-center items-center bg-gray-100 relative">
        {/* Video */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/login_bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        {/* Text Over Video */}
        <div className="absolute flex flex-col items-center justify-center w-full h-full text-white text-center px-6">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Welcome Back to <span className="text-primaryColor">Edible</span>!
          </h1>
          <p className="mt-2 text-lg md:text-base">
            Sign in to explore delicious meals and manage your orders
            effortlessly.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mx-auto">
        <Image src={assets.logo_dark} alt="logo" className="w-24" />
        <form onSubmit={handleLogin} className="p-6 bg-white w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <p className="text-xs text-right pb-4 text-blue-600 hover:cursor-pointer hover:underline">
            <a href="/forgot-password">Forgot password?</a>
          </p>

          <button
            type="submit"
            className="w-full bg-primaryColor text-white p-2 rounded hover:scale-105 transition-all duration-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-2 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-primaryColor hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
