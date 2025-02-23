"use client";

import { Poppins, Fruktur } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import AppContextProvider from "../context/AppContext";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { metadata } from "./metadata";
import { usePathname } from "next/navigation";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const fruktur = Fruktur({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <body className={`${poppins.className} ${fruktur.className} antialiased`}>
        <AppContextProvider>
          {!isAdminRoute && <Navbar />}
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
          {children}
          {!isAdminRoute && <Footer />}
        </AppContextProvider>
      </body>
    </html>
  );
}
