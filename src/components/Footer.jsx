import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom"; // Using react-router-dom for navigation

const Footer = () => {
  return (
    <footer className="text-center py-3 mt-3" style={{ backgroundColor: "#000", color: "#f0f0f0" }}>
      <div className="container">
        {/* Social Media Icons */}
        <div className="mb-3 pt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="d-flex justify-content-center">
          <Link to="/" className="text-white mx-3 text-decoration-none">
            Home
          </Link>
          <Link to="/about" className="text-white mx-3 text-decoration-none">
            About
          </Link>
          <Link to="/contact" className="text-white mx-3 text-decoration-none">
            Contact
          </Link>
        </div>

        {/* Footer Text */}
        <p className="mt-3">&copy; 2024 YourCompany. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
