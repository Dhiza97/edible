"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { assets } from "../app/assets/assets";
import { CiUser } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { PiHamburger } from "react-icons/pi";
import { IoBagOutline } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname(); // Get the current path
  const [isScroll, setIsScroll] = useState(false);
  const [token, setToken] = useState("");
  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };

  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <nav
      className={`flex justify-between items-center w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 main-nav z-50 ${
        isScroll
          ? "bg-[#E2DF4C] text-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20"
          : ""
      }`}
    >
      <Link href={"/"}>
        <Image src={assets.logo_light} alt="Logo" className="w-24" />
      </Link>

      {/* Desktop Menu */}
      <ul
        className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${
          isScroll
            ? ""
            : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"
        }`}
      >
        {[
          { name: "Home", path: "/" },
          { name: "Menu", path: "/menu" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
        ].map((item) => (
          <li
            key={item.path}
            className={`relative hover:text-primaryColor ${
              pathname === item.path ? "text-primaryColor after:w-full" : ""
            }`}
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between gap-5 items-center">
        <div className="relative">
          <Link href={"/cart"}>
            <IoBagOutline className="text-3xl text-primaryColor" />
          </Link>
          <div className="absolute top-3 left-2 w-4 h-4 text-xs text-center text-white rounded-full bg-primaryColor shadow-md">0</div>
        </div>

        {token ? (
          <CiUser className="text-3xl text-primaryColor hover:cursor-pointer" />
        ) : (
          <Link href={"/auth/login"}>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full btn liquid font-light">
              Sign In
            </button>
          </Link>
        )}

        <button onClick={openMenu} className="block md:hidden ml-3">
          <PiHamburger className="text-3xl text-primaryColor" />
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        ref={sideMenuRef}
        className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white"
      >
        <div onClick={closeMenu} className="absolute right-6 top-6">
          <TfiClose />
        </div>

        {[
          { name: "Home", path: "/" },
          { name: "Menu", path: "/menu" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
        ].map((item) => (
          <li
            key={item.path}
            className={
              pathname === item.path
                ? "text-primaryColor font-semibold underline"
                : ""
            }
          >
            <Link href={item.path} onClick={closeMenu}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
