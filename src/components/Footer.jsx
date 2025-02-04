import Image from "next/image";
import React from "react";
import { assets } from "../app/assets/assets";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div>
            <Image src={assets.logo_dark} alt="" className="mx-auto w-40" />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              About{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              Careers{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              History{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              Services{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              Projects{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="#"
            >
              {" "}
              Blog{" "}
            </a>
          </li>
        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Facebook</span>
              <CiFacebook className="text-[#DF9755] text-2xl" />
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Instagram</span>
              <CiInstagram className="text-[#DF9755] text-2xl" />
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Twitter/X</span>
              <RiTwitterXLine className="text-[#DF9755] text-2xl" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
