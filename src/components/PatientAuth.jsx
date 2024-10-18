import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientAuth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  // const [password, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage for theme preference
    return localStorage.getItem('theme') === 'dark';
  });
  const navigate = useNavigate();

  // Effect to save the theme preference in local storage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Patient Login:", { password, password });
      // Redirect to Patient Dashboard after successful login
      navigate('/patient');
    } else {
      console.log("Patient Signup:", { password, password, email });
      // Redirect to Patient Dashboard after signup
      navigate('/patient');
    }
  };

  const handleToggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-black' : 'bg-gradient-to-r from-gray-200 to-white'}`}>
      <button
        onClick={handleToggleTheme}
        className={`fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 ${isDarkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-500'}`}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {isLogin ? "Patient Login" : "Patient Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
            />
          </div>
          <div className="mb-4">
            <label className={`${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className={`${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
              />
            </div>
          )}
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition duration-300`}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 font-semibold hover:underline"
            >
              {isLogin ? "Not registered? Sign Up" : "Already registered? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientAuth;
