"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("verifyEmail", email);
        toast.success(data.message);
        setTimeout(() => {
          console.log("Stored email:", localStorage.getItem("verifyEmail"));
          router.push("/verify-otp");
        }, 3000);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center">

      <div className="hidden md:flex md:w-1/2 h-full justify-center items-center bg-gray-100 relative">
        {/* Video */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/login_vid.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        {/* Text Over Video */}
        <div className="absolute flex flex-col items-center justify-center w-full h-full text-white text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome to <span className="text-primaryColor">Edible</span>!
          </h1>
          <p className="mt-2 text-lg md:text-xl">
            Join us and explore amazing dishes.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center flex-col">
        <Image src={assets.logo_light} alt="logo" className="w-24" />
        <form onSubmit={handleSignUp} className="p-6 bg-white w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-4">Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-2 focus:outline-primaryColor"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2 focus:outline-primaryColor"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4 focus:outline-primaryColor"
            required
          />

          <button
            type="submit"
            className="w-full bg-primaryColor text-white p-2 rounded hover:scale-105 transition-all duration-700"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-2 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primaryColor hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
