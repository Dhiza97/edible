"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { assets } from "../app/assets/assets";

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (scrollY > 50) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    })
  }, [])

  return (
    <nav className={`flex justify-between items-center w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20" : ""}`}>
      <Link href={"/"}>
        <Image src={assets.logo_light} alt="Logo" className="w-20"/>
      </Link>


        <ul className="flex justify-between items-center gap-4 ">
            <li>
              <Link href={"/"}>
                Home
              </Link>
            </li>

            <li>
              <Link href={"/menu"}>
                Menu
              </Link>
            </li>

            <li>
              <Link href={"/about"}>
                About
              </Link>
            </li>

            <li>
              <Link href={"/contact"}>
                Contact
              </Link>
            </li>
        </ul>

        <Link href={"/login"}>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
        </Link>
    </nav>
  );
};

export default Navbar;
