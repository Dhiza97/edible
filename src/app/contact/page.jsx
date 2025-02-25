"use client"

import React, { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <>
      <div className="py-20 px-5 md:px-8 lg:px-[8%] min-h-screen flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-Fruktur my-6 text-center">
          Contact <span className="text-primaryColor font-Fruktur">Us</span>
        </h1>

        <p className="text-gray-700 text-base text-center sm:text-xl leading-8 sm:leading-10 w-full lg:w-1/2">
          Have questions or feedback? We'd love to hear from you! Reach out via
          our contact form, email, or visit us in person.
        </p>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 w-full max-w-6xl">
          {/* Contact Info */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Get In Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FiPhone className="text-primaryColor text-2xl" />
                <p className="text-gray-700">+234 812 345 6789</p>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-primaryColor text-2xl" />
                <p className="text-gray-700">support@edible.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-primaryColor text-2xl" />
                <p className="text-gray-700">123 Food Street, Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h2>
            {submitted && (
              <p className="text-green-600 mb-4">
                ✅ Your message has been sent successfully!
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="bg-primaryColor text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full max-w-6xl mt-12">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Visit Us
          </h2>
          <iframe
            className="w-full h-72 rounded-xl shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31692.41767178114!2d3.379205214451922!3d6.524379265698987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93bd79d2765f%3A0x5e5c7b8b5e8e2b5e!2sLagos!5e0!3m2!1sen!2sng!4v1634772996403!5m2!1sen!2sng"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
