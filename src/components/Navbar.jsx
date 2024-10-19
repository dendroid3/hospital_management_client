import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Dummy function to simulate login (replace with your actual authentication logic)
  const handleLogin = () => {
    setIsLoggedIn(true); // Set to true when the user logs in
  };

  return (
    <nav className="bg-gray-800 shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="text-2xl font-bold text-blue-400">HealthCare</div>

        {/* Hamburger Icon for Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <AiOutlineClose size={24} className="text-gray-200" />
            ) : (
              <AiOutlineMenu size={24} className="text-gray-200" />
            )}
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <div className={`hidden md:flex space-x-6`}>
          {isLoggedIn ? (
            <>
              <Link to="/admin" className="text-gray-200 hover:text-blue-400">Admin Dashboard</Link>
              <Link to="/doctor" className="text-gray-200 hover:text-blue-400">Doctor Dashboard</Link>
              <Link to="/patient" className="text-gray-200 hover:text-blue-400">Patient Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-gray-200 hover:text-blue-400">Login</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="flex flex-col space-y-4 py-4 px-4">
            {isLoggedIn ? (
              <>
                <Link to="/admin" className="text-gray-200 hover:text-blue-400">Admin Dashboard</Link>
                <Link to="/doctor" className="text-gray-200 hover:text-blue-400">Doctor Dashboard</Link>
                <Link to="/patient" className="text-gray-200 hover:text-blue-400">Patient Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-gray-200 hover:text-blue-400">Login</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
