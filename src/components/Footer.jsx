import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaYoutube
} from 'react-icons/fa';

import './footer.css';

const Footer = () => {
  return (
    <div className="white-600 text-green pt-2">
      {/* Scrolling Ticker */}
      <div className="ticker-wrap py-2">
        <div className="ticker font-semibold text-center">
          <p>Final Year Project | Batch S3E25 | Powered by Edhi Welfare Dashboard</p>
        </div>
      </div>

      {/* Main Footer Content */}
      <footer className="bg-white text-gray-800 max-w-4xl mx-auto rounded-2xl shadow-md px-6 py-10 mt-6 space-y-8">
        {/* Centered Title and Subtitle */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">Saya-e-Falah Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Final Year Project | Batch BSSE25</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6">
          <FaFacebookF className="text-green-600 text-2xl hover:scale-110 transition-transform duration-200" />
          <FaInstagram className="text-green-600 text-2xl hover:scale-110 transition-transform duration-200" />
          <FaTwitter className="text-green-600 text-2xl hover:scale-110 transition-transform duration-200" />
          <FaTiktok className="text-green-600 text-2xl hover:scale-110 transition-transform duration-200" />
          <FaYoutube className="text-green-600 text-2xl hover:scale-110 transition-transform duration-200" />
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center flex-wrap gap-x-6 font-medium text-gray-700 pt-2">
          <span className="hover:text-green-600 cursor-pointer">Home</span>
          <span className="hover:text-green-600 cursor-pointer">News</span>
          <span className="hover:text-green-600 cursor-pointer">About</span>
          <span className="hover:text-green-600 cursor-pointer">Contact Us</span>
          <span className="hover:text-green-600 cursor-pointer">Our Team</span>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 text-center pt-4">
          © {new Date().getFullYear()} Designed by <span className="font-semibold">the Students of Jinnah University for Women</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
