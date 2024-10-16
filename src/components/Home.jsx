import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="relative bg-blue-600 text-white py-20 min-h-screen" id="home">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to HealthCare Management</h1>
        <p className="text-xl mb-8">Manage healthcare services for doctors, patients, and administrators.</p>
        <Link to="/admin">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg">
            Admin Dashboard
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
