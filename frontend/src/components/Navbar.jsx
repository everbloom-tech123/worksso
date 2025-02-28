import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, authUser } = useAuthStore();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    window.location.href = "/login"; // Redirect to login page
  };
  const handleImageClick = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <nav className="flex items-center justify-between px-3 py-3 bg-blue-500 shadow-md">
      {/* Logo and Search */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <img
            onClick={handleImageClick}
            src="../../Images/wlogo.png"
            alt="Logo"
            className="w-12 h-10"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.607-10.607 7.5 7.5 0 0 0 10.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center ml-5 space-x-5 font-medium text-white">
        <li>
          <a href="/" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Jobs
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact us
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            About
          </a>
        </li>

        {/* Login or Profile Dropdown */}
        {authUser ? (
          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                src={authUser.profilePic || "../../Images/avatar.png"}
                alt="Profile"
                className="object-cover w-10 h-10 border-gray-300 rounded-full"
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>

                {/* Admin Dashboard Link (Only if user is admin) */}
                {authUser.role === "admin" && (
                  <a
                    href="/admin/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </a>
                )}

                <a
                  onClick={logout}
                  className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <li>
            <button
              className="px-4 py-2 text-blue-500 bg-white rounded-md hover:bg-blue-100"
              onClick={handleLogin}
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
