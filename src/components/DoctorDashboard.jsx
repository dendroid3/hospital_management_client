import React, { useState, useEffect } from "react";
import { FaBars, FaCalendarAlt, FaUserInjured, FaUserEdit, FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const DoctorDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setShowSidebar(false); // Optionally hide the sidebar after selecting an action
  };

  const handleLogout = () => {
    // Perform logout logic here (if needed)
    navigate("/"); // Redirect to landing page
  };

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Apply dark mode class to the root element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col relative transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`shadow-md flex items-center justify-between px-4 py-3 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-300"
        }`}
      >
        <button
          onClick={() => setShowSidebar(!showSidebar)} // Show/hide sidebar
          className={`${isDarkMode ? "text-blue-400" : "text-blue-700"} z-10`}
        >
          <FaBars className="text-2xl" />
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg ${
            isDarkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </nav>

      {/* Sidebar */}
      {showSidebar && (
        <div
          className={`absolute top-16 left-4 p-4 rounded-lg shadow-lg z-20 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-300"
          }`}
        >
          <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Options</h3>
          <ul>
            <li
              onClick={() => handleActionClick("viewAppointments")}
              className={`cursor-pointer mb-2 hover:underline ${
                isDarkMode ? "text-blue-400" : "text-blue-700"
              }`}
            >
              <FaCalendarAlt className="inline mr-2" /> View Appointments
            </li>
            <li
              onClick={() => handleActionClick("viewRecords")}
              className={`cursor-pointer mb-2 hover:underline ${
                isDarkMode ? "text-blue-400" : "text-blue-700"
              }`}
            >
              <FaUserInjured className="inline mr-2" /> View Patient Records
            </li>
            <li
              onClick={() => handleActionClick("editProfile")}
              className={`cursor-pointer mb-2 hover:underline ${
                isDarkMode ? "text-blue-400" : "text-blue-700"
              }`}
            >
              <FaUserEdit className="inline mr-2" /> Edit Profile
            </li>
            <li
              onClick={() => handleActionClick("billPatients")}
              className={`cursor-pointer hover:underline ${
                isDarkMode ? "text-blue-400" : "text-blue-700"
              }`}
            >
              <FaMoneyBill className="inline mr-2" /> Bill Patients
            </li>
          </ul>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow flex items-center justify-center relative mt-12">
        <div
          className={`rounded-lg shadow-lg w-full max-w-4xl p-8 ${
            isDarkMode ? "bg-gray-800 bg-opacity-90" : "bg-white"
          }`}
        >
          {/* Content Area */}
          <div
            className={`p-4 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            {selectedAction ? (
              <>
                <h2
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Selected Action: {selectedAction.replace(/([A-Z])/g, " $1")}
                </h2>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  You selected to{" "}
                  {selectedAction.replace(/([A-Z])/g, " $1").toLowerCase()}.
                </p>

                {/* Action-specific content */}
                {selectedAction === "viewAppointments" && (
                  <div className="mt-4">
                    <h3 className={isDarkMode ? "font-semibold text-white" : "font-semibold text-gray-900"}>Appointments List</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
                      Manage Appointments
                    </button>
                  </div>
                )}

                {selectedAction === "viewRecords" && (
                  <div className="mt-4">
                    <h3 className={isDarkMode ? "font-semibold text-white" : "font-semibold text-gray-900"}>Patient Records</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
                      View Records
                    </button>
                  </div>
                )}

                {selectedAction === "editProfile" && (
                  <div className="mt-4">
                    <h3 className={isDarkMode ? "font-semibold text-white" : "font-semibold text-gray-900"}>Edit Profile</h3>
                    <input
                      type="text"
                      placeholder="Doctor Name"
                      className={`p-2 border rounded mb-2 w-full ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-400 bg-gray-200 text-gray-900"
                      }`}
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Update Profile
                    </button>
                  </div>
                )}

                {selectedAction === "billPatients" && (
                  <div className="mt-4">
                    <h3 className={isDarkMode ? "font-semibold text-white" : "font-semibold text-gray-900"}>Bill Patients</h3>
                    <input
                      type="text"
                      placeholder="Patient ID"
                      className={`p-2 border rounded mb-2 w-full ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-400 bg-gray-200 text-gray-900"
                      }`}
                    />
                    <input
                      type="number"
                      placeholder="Bill Amount"
                      className={`p-2 border rounded mb-2 w-full ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-400 bg-gray-200 text-gray-900"
                      }`}
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Submit Bill
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Please select an option from the menu.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
