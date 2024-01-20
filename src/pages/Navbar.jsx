// Navbar.js
import React, { useState } from 'react';
import { ReactComponent as Logo } from './logo.svg'; // Replace with your logo file
import UserImage from './user-image.jpg'; // Replace with your user image file

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Logo className="h-8 w-8 mr-2" />
        <span className="font-bold text-lg">Your App Name</span>
      </div>

      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="relative group">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img
                src={UserImage}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 p-2 bg-white border rounded shadow">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
