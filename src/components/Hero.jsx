"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const images = ["/burger.png", "/spag.png", "/taco.png"];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(() => new Set());
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    images.forEach((src) => {
      const preloadedImage = new window.Image();
      preloadedImage.src = src;
      preloadedImage.onload = () => {
        setLoadedImages((prev) => {
          const next = new Set(prev);
          next.add(src);
          return next;
        });
      };
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden px-5 lg:px-8 xl:px-[8%] pt-24">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/image_1.jpg"
      >
        <source src="/bg_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-col sm:flex-row-reverse lg:flex-row-reverse items-center lg:items-center justify-between">
        {/* Images on the Right Side with Fade Animation */}
        <div className="w-full lg:w-1/2 max-w-[640px] lg:max-w-[760px] mt-8 lg:mt-0">
          <div className="relative w-full min-h-[280px] sm:min-h-[360px] md:min-h-[430px] lg:min-h-[520px] xl:min-h-[580px] overflow-hidden rounded-lg shadow-lg bg-transparent">
            <AnimatePresence initial={false}>
              <motion.div
                key={images[currentIndex]}
                className="absolute inset-0"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: loadedImages.has(images[currentIndex]) ? 1 : 0 }
                }
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.6, ease: "easeInOut" }
                }
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 640px) 60vw, 92vw"
                  className="object-contain p-2 sm:p-4"
                  priority={currentIndex === 0}
                  quality={85}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Content Section */}
        <motion.div
          className="relative z-10 flex flex-col items-center lg:items-start justify-center text-white w-full lg:w-1/2 px-5"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1 }}
        >
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl font-semibold font-Fruktur"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.2 }
            }
          >
            Welcome to{" "}
            <span className="text-primaryColor font-Fruktur">Edible</span> – A
            Taste of Perfection
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg mt-6"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.4 }
            }
          >
            Fresh ingredients, bold flavors, and unforgettable meals. Indulge in
            a dining experience crafted with passion.
          </motion.p>

          <Link href="/menu" passHref>
            <motion.button
              className="btn-order px-7 py-4 mt-6 text-primaryColor rounded-full neon-pulse hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ORDER NOW
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,224L80,208C160,192,320,160,480,170.7C640,181,800,235,960,245.3C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
