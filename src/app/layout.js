"use client";

import { Poppins, Fruktur } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import AppContextProvider from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { metadata } from "./metadata";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();
  const isAuthRoute = ["/login", "/register"].includes(pathname) || pathname.startsWith("/admin");

  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <body className={`${poppins.className} ${fruktur.className} antialiased`}>
        <AppContextProvider>
          {!isAuthRoute && <Navbar />}
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
              }
            >
              {children}
            </motion.main>
          </AnimatePresence>
          {!isAuthRoute && <Footer />}
        </AppContextProvider>
      </body>
    </html>
  );
}
