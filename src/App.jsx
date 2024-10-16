import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminAuth from './components/AdminAuth'; // Import Admin Auth component
import PatientAuth from './components/PatientAuth'; // Import Patient Auth component
import DoctorAuth from './components/DoctorAuth'; // Import Doctor Auth component
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/auth" element={<AdminAuth />} /> {/* Route for Admin Auth */}
        <Route path="/patient/auth" element={<PatientAuth />} /> {/* Route for Patient Auth */}
        <Route path="/doctor/auth" element={<DoctorAuth />} /> {/* Route for Doctor Login */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
