import React from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import { team } from "../assets/assets";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="py-20 px-5 md:px-8 lg:px-[8%] min-h-screen flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-Fruktur my-6 text-center">
          About <span className="text-primaryColor font-Fruktur">Us</span>
        </h1>

        {/* Banner */}
        <div
          className="flex flex-col lg:flex-row items-center gap-8 bg-gray-100 rounded-2xl mx-auto pt-6 px-6 md:px-12 w-full max-w-6xl relative bg-cover bg-center bg-no-repeat h-96 align-text-top"
          style={{ backgroundImage: "url('/about_us.jpg')" }}
        >
          <div className="rounded-xl text-white w-full">
            <p className="text-6xl font-Fruktur text-center p-10">
              Get to{" "}
              <span className="text-primaryColor font-Fruktur">know us!</span>
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-lg text-center py-10 sm:text-xl leading-8 sm:leading-10 w-full lg:w-1/2">
          Welcome to Edible, where passion meets flavor! We are dedicated to
          serving you delicious meals crafted with the freshest ingredients. Our
          menu is designed to offer a variety of options, ensuring there is
          something for everyone. Whether you are craving a hearty meal, a light
          snack, or a refreshing drink, we've got you covered.
        </p>

        <div className="mt-16 max-w-4xl text-center flex flex-col gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-Fruktur">
              Our{" "}
              <span className="text-primaryColor font-Fruktur">Mission</span>
            </h2>

            <p className="text-gray-600 mt-4 text-base">
              Our mission is to provide an exceptional dining experience by
              offering high-quality meals, excellent customer service, and a
              warm atmosphere. We believe in sustainability, using fresh
              ingredients, and ensuring every dish is made with love and care.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-Fruktur">
              Our <span className="text-primaryColor font-Fruktur">Vision</span>
            </h2>

            <p className="text-gray-600 mt-4 text-base">
              To revolutionize the dining experience by seamlessly connecting
              people with high-quality, delicious meals through an intuitive and
              convenient platform, making great food accessible anytime,
              anywhere.
            </p>
          </div>
        </div>

        {/* Team section */}
        <div className="mt-20">
          <h2 className="text-2xl sm:text-3xl text-center font-semibold font-Fruktur mb-10">
            Our <span className="text-primaryColor font-Fruktur">Team</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {team.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg bg-orange-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full hover:scale-110 duration-300 cursor-pointer"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
