import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-8 Para">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 space-y-1">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <p>Email: anssaif.507@gmail.com</p>
            <p>Phone: +91 9348418378</p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
        <hr className="border border-[white] mt-[4%] opacity-10" />
        <div className="text-center mt-8">
          <p className="text-sm text-white opacity-60">
            © 2023 Instrumentals. All rights reserved.
          </p>
          <p className="text-sm text-white opacity-60">
            Disclaimer: The music provided on this website is sourced from
            YouTube and is not available for download. All music copyrights
            belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
