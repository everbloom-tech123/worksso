import React from "react";

const Footer = () => {
  return (
    <footer className="items-center pt-10 bg-white border-t">
      <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-3">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center mb-4 space-x-2">
            {/* Logo */}
            <img
              src="../../Images/wlogo.png" // Replace with your logo's file path
              alt="ABC Logo"
              className="object-contain w-20 h-20"
            />
          </div>
          <p className="text-sm text-gray-600">
            Hello, we are Worksso, trying to make an effort to put the right
            people for you to get the best results. Just insight.
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-700">(123) 456-7890</p>
            <p className="text-sm text-blue-500">worksso@gmail.com</p>
          </div>
        </div>

        {/* Product Links */}
        <div className="ml-36">
          <h2 className="mb-4 text-sm font-semibold text-gray-800">Product</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                Autocapture
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                Data Governance
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                Virtual Events
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                Virtual Users
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                Behavioral Analytics
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                Connect
              </a>
            </li>
          </ul>
        </div>

        {/* Explore Links */}
        <div className="ml-36">
          <h2 className="mb-4 text-sm font-semibold text-gray-800">Explore</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                Documents
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center mt-10 space-x-4">
        <a href="#" className="text-gray-600 hover:text-blue-500">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <div className="py-1 text-center text-white bg-blue-400">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
