"use client"

import React from "react";
import { assets } from "../app/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <Image className="w-[max(8%,70px)]" src={assets.logo_light} alt="" />
      <button
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
