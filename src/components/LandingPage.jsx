import React from 'react';
import Navbar from './Navbar'; // Ensure to import the Navbar component
import Footer from './Footer'; // Ensure to import the Footer component

const LandingPage = () => {
  return (
    <div className="relative min-h-screen font-sans bg-gray-900 text-gray-200">
      <Navbar /> {/* Place Navbar component at the top */}

      {/* Section for Welcome */}
      <section className="h-[50vh] flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
          Welcome to Pinnacle Health Care Management
        </h1>
        <div className="text-md md:text-lg mb-2 text-gray-300">
          Manage your healthcare system with ease, efficiency, and control.
        </div>
      </section>

      {/* Section for Features */}
      <section className="h-[40vh] flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Key Features
        </h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-4 mb-4 rounded shadow-md">
            <h3 className="text-xl font-bold text-black">Doctor Dashboard</h3>
            <p className="text-md text-gray-800">
              Efficiently manage appointments, billing, and patient records with our intuitive interface.
            </p>
          </div>
          <div className="bg-gray-800 p-4 mb-4 rounded shadow-md">
            <h3 className="text-xl font-bold text-white">Patient Dashboard</h3>
            <p className="text-md text-gray-300">
              Book appointments, view your medical history, and pay bills seamlessly, all in one place.
            </p>
          </div>
          <div className="bg-white p-4 mb-4 rounded shadow-md">
            <h3 className="text-xl font-bold text-black">Admin Dashboard</h3>
            <p className="text-md text-gray-800">
              Effortlessly manage doctors, assign roles, and oversee billing and records for enhanced efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Section for About Us */}
      <section className="h-[40vh] flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          About Us
        </h1>
        <div className="text-md md:text-lg mb-2 text-center text-gray-300">
          At Pinnacle Health Care Services, we are dedicated to providing the highest quality healthcare management solutions. Our mission is to improve patient outcomes and enhance operational efficiency through innovative technology and compassionate care.
        </div>
      </section>

      {/* Section for Customer Feedback */}
      <section className="h-[40vh] flex flex-col justify-center items-center p-4 bg-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
          What Our Customers Say
        </h1>
        <div className="text-md md:text-lg mb-2 text-center text-gray-800">
          "This healthcare management system has transformed the way we operate. It's intuitive and user-friendly!" - Dr. Smith
        </div>
        <div className="text-md md:text-lg mb-2 text-center text-gray-800">
          "I love how easy it is to book appointments and access my medical records. Highly recommend!" - Patient Jane Doe
        </div>
      </section>

      {/* Section for Social Media Handles */}
      <section className="h-[40vh] flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Follow Us
        </h1>
        <div className="text-md md:text-lg mb-2 text-center text-gray-300">
          Stay connected with us through our social media channels!
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">Twitter</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600">Instagram</a>
        </div>
      </section>

      {/* Section for Contact */}
      <section className="h-[40vh] flex flex-col justify-center items-center p-4 bg-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
          Contact Us
        </h1>
        <div className="text-md md:text-lg mb-2 text-center text-gray-800">
          Need help? Contact us at:
        </div>
        <p className="mt-2 text-gray-800">Phone: +1 123 456 7890</p>
        <p className="mt-2 text-gray-800">Email: support@healthcare.com</p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
