import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorAuth = () => {
  // const [password, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Doctor Login:", { password });
    navigate('/doctor'); // Redirect to Doctor Dashboard
  };

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Apply dark mode class to the root element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-black' : 'bg-gray-200'}`}
    >
      {/* Dark/Light Mode Toggle on Top */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className={`p-8 rounded-lg shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Doctor Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className={`${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`mt-1 p-2 border rounded w-full focus:ring focus:ring-blue-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-400 text-gray-900'} focus:border-blue-500`}
            />
          </div>
          <div className="mb-4">
            <label className={`${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 p-2 border rounded w-full focus:ring focus:ring-blue-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-400 text-gray-900'} focus:border-blue-500`}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorAuth;
