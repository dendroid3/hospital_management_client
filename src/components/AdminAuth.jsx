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

  const handleChangeInAuth = () => {
    if(isLogin){
      const secret_phrase = "Open"
      const secret_phrase_prompt = prompt("Enter the secret phrase")
      if(secret_phrase !== secret_phrase_prompt) {
        alert("Wrong Secret Phrase")
        return
      }
    }

    setIsLogin(!isLogin)

  }
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

    try {
      
      console.log("email " +  email)
      console.log("password" + password)

      const login_data = {
        "email": email,
        "password": password
      }

      console.log(login_data)
      
      const url = isLogin ? 'https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//auth/login' : 'https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//auth/register'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login_data)
      });

      console.log("response.ok", response.ok)

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        if(!isLogin){
          alert("Registered successfully. Please Login")
          setIsLogin(!isLogin)
          return
        }
        localStorage.setItem('access_token', result.access_token);  // or username if you're saving that
        localStorage.setItem('user_id', result.id);
        localStorage.setItem('user_role', result.role);

        if(result.role == 2){
          localStorage.setItem('doctor_id', result.doctor_id);
          localStorage.setItem('patient_id', null);
        } else if (result.role == 3){
          localStorage.setItem('patient_id', result.patient_id);
          localStorage.setItem('doctor_id', null);
        }

        if(result.role == 1) {
          navigate('/admin');
        } else if(result.role == 2) {
          navigate('/doctor');
        } else {
          navigate('/patient');
        }

      } else {
        alert("Could not Login In. Ensure that your credentials are correct and try agani.")
      }
    } catch (error) {
        alert("Could not Login In. Ensure that your credentials are correct and try agani.")
      console.log(error)
    }

    // if (isLogin) {
    //   console.log("Admin Login:", { password, password });
    //   // Redirect to Admin Dashboard after successful login
      // navigate('/admin');
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
          {isLogin ? "Login" : "Sign Up"}
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-colors"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleChangeInAuth}
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

export default AdminAuth;
