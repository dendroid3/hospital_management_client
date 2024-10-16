// Footer.js
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="mb-4">Follow Us on Social Media</p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook fa-2x text-blue-600 hover:text-blue-400"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter fa-2x text-blue-400 hover:text-blue-300"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram fa-2x text-pink-600 hover:text-pink-400"></i>
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} HealthCare Management. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
