import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode
  const navigate = useNavigate();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to the root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("email " +  email)
    console.log("password" + password)

    const login_data = {
      "email": email,
      "password": password
    }

    console.log(login_data)
    // try {
    //   const response = await fetch('http://localhost:5000/auth/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(login_data)
    //   });

    //   const result = await response.json();

    //   if (response.ok) {
    //     const result = await response.json();
    //     console.log(result)
    //     // setDoctors(result)
    //   } else {
    //     alert("Could not login")
    //   }
    // } catch (error) {
    //   alert("Could not login")
    // }

    // if (isLogin) {
    //   console.log("Admin Login:", { password, password });
    //   // Redirect to Admin Dashboard after successful login
      navigate('/admin');
    // } else {
    //   console.log("Admin Signup:", { password, password, email });
    //   // Redirect to Admin Dashboard after signup
    //   navigate('/admin');
    // }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      
      {/* Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} transition-colors`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      
      {/* Auth Form */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg w-full max-w-md transform transition hover:scale-105 duration-300`}>
        <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold mb-6 text-center`}>
          {isLogin ? "Admin Login" : "Admin Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500' : 'bg-gray-200 text-gray-900 border-gray-400 focus:border-blue-500 focus:ring-blue-500'}`}
            />
          </div>
          <div className="mb-4">
            <label className={`${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500' : 'bg-gray-200 text-gray-900 border-gray-400 focus:border-blue-500 focus:ring-blue-500'}`}
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className={`${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`mt-1 p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500' : 'bg-gray-200 text-gray-900 border-gray-400 focus:border-blue-500 focus:ring-blue-500'}`}
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-colors"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
