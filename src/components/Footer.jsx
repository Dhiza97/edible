import Image from "next/image";
import React from "react";
import { assets } from "../app/assets/assets";
import { AiOutlineFacebook } from "react-icons/ai";
import { CgInstagram } from "react-icons/cg";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#F3F4F6"
            fillOpacity="1"
            d="M0,224L80,208C160,192,320,160,480,170.7C640,181,800,235,960,245.3C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      <footer className="bg-gray-100">
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <strong className="block text-center text-6xl font-bold font-Fruktur text-gray-900 sm:text-3xl">
              Want us to email you with the latest{" "}
              <span className="font-Fruktur text-primaryColor">Juicy</span>{" "}
              news?
            </strong>

            <form className="mt-6">
              <div className="relative max-w-lg">
                <label className="sr-only" htmlFor="email">
                  {" "}
                  Email{" "}
                </label>

                <input
                  className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium focus:outline-primaryColor"
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                />

                <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-primaryColor px-5 py-3 text-sm font-medium text-white transition hover:text-black">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

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
                Services{" "}
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
                <AiOutlineFacebook className="text-[#DF9755] text-2xl" />
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
                <CgInstagram className="text-[#DF9755] text-2xl" />
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
        <footer className="bg-gray-50">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="flex justify-center text-teal-600 sm:justify-start">
                <Image src={assets.logo_dark} alt="Logo" className="w-20" />
              </div>

              <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                Copyright &copy; 2025. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </footer>
    </>
  );
};

export default Footer;

{
  /*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/
}
