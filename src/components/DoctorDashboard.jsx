import React, { useState, useEffect } from "react";
import { FaBars, FaCalendarAlt, FaUserInjured, FaUserEdit, FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import styled from 'styled-components';

const StyledForm = styled.form`
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
  padding-right: 0.8rem; /* Creates space for the scrollbar */
  padding-bottom: 2rem;
  margin-right: -0.4rem; /* Moves the scrollbar inward by 0.4rem */
  
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(71, 85, 105);
    border-radius: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;

const ScrollableWrapper = styled.div`
  position: relative;
  padding: 0 2rem; /* Horizontal padding of 2rem */
  margin-top: 2.5rem; /* Margin from the top */
  overflow-y: scroll; /* Keeps the ability to scroll */
  max-height: calc(100vh - 11rem); /* Maximum height adjustment */

  &::-webkit-scrollbar {
    width: 0; /* Hide the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Make the scrollbar thumb transparent */
    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* Make the scrollbar track transparent */
  }
`;

const DoctorDashboard = () => {
  /**
   * Imports Section
   */ 
  const navigate = useNavigate(); // Initialize useNavigate

  /**
   * Data Section
   */ 
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAction, setSelectedAction] = useState("viewMyPatients");
  const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode
  const [isUpdateAppointmentPromptOpen, setIsUpdateAppointmentPromptOpen] = useState(false);
  const [appointmentToBeUpdated, setAppointmentToBeUpdated] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patientGettingRecordAdded, setPatientGettingRecordAdded] = useState(null);
  const [isAddRecordPromptOpen, setIsAddRecordPromptOpen] = useState(false);
  const [patients, setPatients] = useState([])
  const [recordToBeAdded, setRecordToBeAdded] = useState({
    patient_id: null,
    record: "Enter Record...",
    subject: "Enter Subject..."
  })


  /** 
    *Methods Section 
  **/
  const handleActionClick = (action) => {
    setSelectedAction(action);
    setShowSidebar(false); // Optionally hide the sidebar after selecting an action
  };

  const handleLogout = () => {
    // Perform logout logic here (if needed)
    navigate("/"); // Redirect to landing page
  };

  const fetchMyPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/doctors/patients/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setPatients(result)
      } else {
        throw new Error('Failed to fetch doctors.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const fetchMyAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/appointments/doctor/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("fetchMyAppointments", result)
        setAppointments(result)
      } else {
        throw new Error('Failed to fetch doctors.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/appointments/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentToBeUpdated)
      });
      console.log("appointmentToBeUpdated", appointmentToBeUpdated)

      if (response.ok) {
        const result = await response.json();
        fetchMyAppointments()
        toogleUpdateAppointmentPrompt(false)
        setTimeout(() => {
          alert(result.message)
        }, 0);
      } else {
        throw new Error('Failed to fetch doctors.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  const handleAddRecord = async (e) => {
    e.preventDefault();

    const record_data = recordToBeAdded
    record_data.patient_id = patientGettingRecordAdded.id
    console.log("recordToBeAdded", record_data)
    try {
      const response = await fetch('http://localhost:5000/records/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record_data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("result", result)
        fetchMyPatients()
        toogleAddRecordPrompt(false)
        setTimeout(() => {
          alert(result.message)
        }, 0);
      } else {
        throw new Error('Failed to fetch doctors.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  const handleBillPatient = async (patient) => {
    try {
      const bill_amount = prompt(`Enter the amount you want to bill ${patient.first_name} ${patient.last_name}`)
  
      if (bill_amount === null) {
        return; 
      }
      
      if(bill_amount == ""){
        alert("You have not entered any amount")
        handleBillPatient(patient)
      }

      const bill_description = prompt(`Enter the amount you want to bill ${patient.first_name} ${patient.last_name}`)
  
      if (bill_description === null) {
        alert("Cannot add a bill without a description, start again")

        return; 
      }

      const parsedAmount = parseFloat(bill_amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
          alert("Please enter a valid amount that is greater than zero.");
          return handleBillPatient(patient); 
      }

      const bill_data = {
        "patient_id": patient.id,
        "status": "Pending",
        "amount": bill_amount,
        "description": bill_description
      }

      const response = await fetch('http://localhost:5000/bills/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bill_data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("result", result)
        fetchMyPatients()
        setTimeout(() => {
          alert(result.message)
        }, 0);
      } else {
        throw new Error('Failed to fetch doctors.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } 
  };

  const toogleAddRecordPrompt = (patient) => {
    if(patient){
      console.log("patient", patient)

      setPatientGettingRecordAdded(patient)
    } else {
      setRecordToBeAdded({
        patient_id: null,
        record: "Enter Record...",
        subject: "Enter Subject..."
      })
    }
    setIsAddRecordPromptOpen(patient)
  }

  const formatKey = (key) => {
    return key
      .split('_') // Split on underscores
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join words with spaces
  };

  const formatDate = (creation_date) => {
    const date = new Date(creation_date)

    // Get the day with a suffix (e.g., "17th")
    const day = date.getUTCDate();
    const day_suffix = (day) => {
      if (day > 3 && day < 21) return 'th'; 
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const formatted_date = `${day}${day_suffix(day)} ${date.toLocaleString('en-US', {
      month: 'long',  
      year: 'numeric' 
    })}`;

    const date_of_day = formatted_date.split(" ")[0].slice(0, -2);
    const date_of_day_suffix = formatted_date.split(" ")[0].slice(-2);
    const rest_of_date = formatted_date.split(" ").slice(1).join(" ");

     
    const formatted_time = date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Africa/Nairobi' // East African Time (EAT)
    });

    return {
      "date_of_day": date_of_day,
      "date_of_day_suffix": date_of_day_suffix,
      "rest_of_date": rest_of_date,
      "formatted_time": formatted_time
    }
  }

  const toogleUpdateAppointmentPrompt = (appointment) => {
    if(appointment){
      setAppointmentToBeUpdated(appointment)
    }
    setIsUpdateAppointmentPromptOpen(appointment)
  }

  const handleUpdateAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentToBeUpdated({ ...appointmentToBeUpdated, [name]: value });
  };

  const handleNewRecordInputChange = (e) => {
    const { name, value } = e.target;
    setRecordToBeAdded({ ...recordToBeAdded, [name]: value });
  }

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  
  /**
    * Mounted() Section 
  **/
  useEffect(() => {
    // Apply dark mode class to the root element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchMyPatients();
    fetchMyAppointments()
  }, []);


  /**
   * HTML Section
   */
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
              onClick={() => handleActionClick("viewMyPatients")}
              className={`cursor-pointer mb-2 hover:underline ${
                isDarkMode ? "text-blue-400" : "text-blue-700"
              }`}
            >
              <FaUserInjured className="inline mr-2" /> View Patients
            </li>
            <li
              onClick={() => handleActionClick("editProfile")}
              className={`cursor-pointer mb-2 hover:underline ${
                isDarkMode ? "text-blue-400" : "text-blue-700"
              }`}
            >
              <FaUserEdit className="inline mr-2" /> Edit Profile
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
                {selectedAction === "viewMyPatients" && (
                  <div className="mt-4">
                    <h3 className={isDarkMode ? "font-semibold text-white" : "font-semibold text-gray-900"}>Patients List</h3>
                    <div className="bg-slate-500 p-2">
                      <div className="mt-4">
                        <ul className="mt-2">
                        {patients.map((patient) => (
                            <li key={patient.id} className="mb-4 bg-slate-700 p-2 rounded">
                              <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-bold`}>
                                {`${patient.id}: ${patient.first_name} ${patient.last_name} (${patient.gender})`}

                              </h4>
                              
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span className="font-bold">
                                    {`DOB: `}
                                  </span>
                                  <span>
                                    {`${patient.date_of_birth}`}
                                  </span>
                                </li>
                              </ul>
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span className="font-bold">
                                    {`Address: `}
                                  </span>
                                  <span>
                                    {`${patient.address}`}
                                  </span>
                                </li>
                              </ul>
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span className="font-bold">
                                    {`Phone Number: `}
                                  </span>
                                  <span>
                                    {`${patient.phone_number}`}
                                  </span>
                                </li>
                              </ul>
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span className="font-bold">
                                    {`Email: `}
                                  </span>
                                  <span>
                                    {`${patient.email}`}
                                  </span>
                                </li>
                              </ul>
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span className="font-bold">
                                    {`Emergency Contact: `}
                                  </span>
                                  <span>
                                    {`${patient.emergency_contact_phone_number}`}
                                  </span>
                                </li>
                              </ul>
                              <ul>
                                <p className={`${isDarkMode ? 'text-gray-300 font-bold' : 'text-gray-700 font-bold'}`}>
                                  {`Records:`}
                                </p>
                                <div className="mx-4 bg-slate-900 p-2 rounded">
                                  <ul>
                                    {patient.records.map((record, index) => (

                                      <li key={index} className={`${isDarkMode ? 'text-white' : 'text-white'}`}>
                                        <ul className='bg-slate-400 m-2 p-2 rounded'>
                                          {Object.entries(record)
                                            .sort(([keyA], [keyB]) => {
                                              const order = ["subject", "creation_date", "record", "patient_id"];
                                              const indexA = order.indexOf(keyA);
                                              const indexB = order.indexOf(keyB);
                                              return (indexA === -1 ? order.length : indexA) - (indexB === -1 ? order.length : indexB);
                                            })
                                            .map(([key, value], index) => (
                                              <li key={index} className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                                                {key !== "id" && (
                                                  <>
                                                    {key === "creation_date" && (
                                                      <>
                                                        <span>
                                                          {`${formatKey(key)}: ${formatDate(value).date_of_day}`}
                                                          <sup>{formatDate(value).date_of_day_suffix}</sup> 
                                                          &nbsp;
                                                          {formatDate(value).rest_of_date} ({formatDate(value).formatted_time})
                                                        </span>
                                                      </>
                                                    )}
                                                    {key !== "creation_date" && (
                                                      <>
                                                        <span>
                                                        {`${formatKey(key)}: ${value}`}
                                                        </span>
                                                      </>
                                                    )}
                                                  
                                                  </>
                                                )}
                                              </li>
                                            ))}
                                        </ul>
                                      </li>

                                    ))}
                                  </ul>
                                </div>
                              </ul>
                              <ul>
                                <p className={`${isDarkMode ? 'text-gray-300 font-bold' : 'text-gray-700 font-bold'}`}>
                                  {`Bills:`}
                                </p>
                                <div className="mx-4 bg-slate-900 p-2 rounded">
                                  <ul>
                                    {patient.bills.map((bill, index) => (

                                      <li key={index} className={`${isDarkMode ? 'text-white' : 'text-white'}`}>
                                        <ul className='bg-slate-400 m-2 p-2 rounded'>
                                          {Object.entries(bill)
                                            .sort(([keyA], [keyB]) => {
                                              const order = ["creation_date", "amount", "status", "id"];
                                              const indexA = order.indexOf(keyA);
                                              const indexB = order.indexOf(keyB);
                                              return (indexA === -1 ? order.length : indexA) - (indexB === -1 ? order.length : indexB);
                                            })
                                            .map(([key, value], index) => (
                                              <li key={index} className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                                                {key !== "id" && (
                                                  <>
                                                    {key === "creation_date" && (
                                                      <>
                                                        <span>
                                                          {`${formatKey(key)}: ${formatDate(value).date_of_day}`}
                                                          <sup>{formatDate(value).date_of_day_suffix}</sup> 
                                                          &nbsp;
                                                          {formatDate(value).rest_of_date} ({formatDate(value).formatted_time})
                                                        </span>
                                                      </>
                                                    )}
                                                    {key !== "creation_date" && (
                                                      <>
                                                        <span>
                                                        {`${formatKey(key)}: ${value}`}
                                                        </span>
                                                      </>
                                                    )}
                                                  
                                                  </>
                                                )}
                                              </li>
                                            ))}
                                        </ul>
                                      </li>

                                    ))}
                                  </ul>
                                </div>
                              </ul>
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300 ml-4 mt-4' : 'text-gray-700 ml-4 mt-4'}`}>
                                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-1"  onClick={() => toogleAddRecordPrompt(patient)} >Add Record</button>
                                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg mx-1" onClick={() => handleBillPatient(patient)} >Bill Patient</button>
                                </li>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {isAddRecordPromptOpen && (
                       <div className="fixed inset-x-0 top-5 bottom-5 flex items-center justify-center z-50">
                       <div className="bg-slate-600 rounded-lg p-6 shadow-lg w-11/12 max-w-lg h-full overflow-y-auto relative">
                         <div>
                           <div className="mb-4 pb-4">
                             <h1 className="absolute top-4 text-3xl mb-4 text-white">{`Add Record to ${patientGettingRecordAdded.first_name} ${patientGettingRecordAdded.last_name}`}</h1>

                             <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => toogleAddRecordPrompt(false)}>
                               &times; {/* This is the "X" symbol */}
                             </div>
                           </div>
                           
                           <ScrollableWrapper className="bg-white rounded">
                              <StyledForm className="bg-white p-6 text rounded shadow-md my-6" onSubmit={handleAddRecord}>
                                <div>
                                <div>
                                    <label className="block mt-3 mb-0">Subject:</label>
                                    <input
                                      className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="text"
                                      name="subject"
                                      onChange={handleNewRecordInputChange}
                                      value={recordToBeAdded.subject}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <label className="block mt-0 mb-0">Record:</label>
                                      <textarea
                                        className={
                                          `mt-1 p-2 border border-gray-600 rounded w-full ${(isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} focus:border-blue-500 focus:ring focus:ring-blue-200`
                                        }
                                        onChange={handleNewRecordInputChange}
                                        value={recordToBeAdded.record}
                                        name="record"
                                        required
                                        rows={10} 
                                      />
                                  </div>
                                  <div className="fixed bottom-10 left-0 right-0 flex justify-center">
                                    <button
                                      type="submit"
                                      className={`p-2 rounded bg-green-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200`}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </StyledForm>
                            </ScrollableWrapper>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedAction === "viewAppointments" && (
                  <div className="mt-4">
                    <h3 className={isDarkMode ? "font-semibold text-white" : "font-semibold text-gray-900"}>Appointments List</h3>

                    <div className="bg-slate-500 p-2">
                      <div className="mt-4">
                        <ul className="mt-2">
                          {appointments.map((appointment) => (
                            <li key={appointment.id} className="mb-4 bg-slate-700 p-2 rounded">
                              <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-bold`}>
                                {`Appointment ID: ${appointment.id} (${appointment.status})`}

                              </h4>
                              
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span className="font-bold">
                                    {`Date: `}
                                  </span>
                                  <span>
                                    {`${appointment.appointment_date}`}
                                  </span>
                                </li>
                              </ul>

                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span className="font-bold">
                                    {`Reason: `}
                                  </span>
                                  <span>
                                    {`${appointment.reason_for_visit}`}
                                  </span>
                                </li>
                              </ul>
                              
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span className="font-bold">
                                    {`Cost: `}
                                  </span>
                                  <span>
                                    {`${appointment.cost}`}
                                  </span>
                                </li>
                              </ul>

                              <ul>
                                <p className={`${isDarkMode ? 'text-gray-300 font-bold' : 'text-gray-700 font-bold'}`}>
                                  {`Patient:`}
                                </p>
                                <div className="mx-4 bg-slate-900 p-2 rounded">
                                  <ul>
                                    {Object.entries(appointment.patient).map(([key, value], index) => (
                                      <li key={index} className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                                         {key !== "id" && 
                                        (
                                          <span>
                                            {`${formatKey(key)}: ${value}`}
                                          </span>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </ul>

                              <ul>
                                <p className={`${isDarkMode ? 'text-gray-300 font-bold' : 'text-gray-700 font-bold'}`}>
                                  {`Notes:`}
                                </p>
                                <div className="mx-4 bg-slate-900 p-2 rounded">
                                  <ul>
                                      <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                                        {appointment.notes}
                                      </div>
                                  </ul>
                                </div>
                              </ul>
                              
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300 ml-4 mt-4' : 'text-gray-700 ml-4 mt-4'}`}>
                                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-1" onClick={() => toogleUpdateAppointmentPrompt(appointment)}>Update Appointment</button>
                                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg mx-1">Delete Patient</button>
                                </li>
                              </ul>

                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {isUpdateAppointmentPromptOpen && (
                      <div className="fixed inset-x-0 top-5 bottom-5 flex items-center justify-center z-50">
                        <div className="bg-slate-600 rounded-lg p-6 shadow-lg w-11/12 max-w-lg h-full overflow-y-auto relative">
                          <div>
                            <div className="mb-4 pb-4">
                              <h1 className="absolute top-4 text-3xl mb-4 text-white">{`Update Appointment`}</h1>

                              <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => toogleUpdateAppointmentPrompt(false)}>
                                &times; {/* This is the "X" symbol */}
                              </div>
                            </div>
                            <ScrollableWrapper className="bg-white rounded">
                              <StyledForm className="bg-white p-6 text rounded shadow-md my-6" onSubmit={handleUpdateAppointment}>
                                <div>
                                  <div>
                                    <label className="block mt-0 mb-0">{`Appointment By: ${appointmentToBeUpdated.patient.first_name} ${appointmentToBeUpdated.patient.last_name}`}</label>
                                    <label className="block mt-0 mb-0">{`Patient ID: PNT_${appointmentToBeUpdated.patient.id}`}</label>
                                    <label className="block mt-0 mb-0">Notes:</label>
                                    <textarea
                                      className={
                                        `mt-1 p-2 border border-gray-600 rounded w-full ${(isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} focus:border-blue-500 focus:ring focus:ring-blue-200`
                                      }
                                      value={appointmentToBeUpdated.notes}
                                      onChange={handleUpdateAppointmentInputChange}
                                      name="notes"
                                      required
                                      rows={10} 
                                    />

                                    {/* Appointment Status Radio Inputs */}
                                    <div className="mt-4">
                                      <label className="block mt-3 mb-0">Appointment Status:</label>

                                      <div className="grid grid-cols-3 gap-4">
                                        {/* First Row */}
                                        <label className="flex items-center my-2">
                                          <input
                                            className={`p-2 border border-gray-600 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                            type="radio"
                                            name="status"
                                            value="Scheduled"
                                            checked={appointmentToBeUpdated.status === "Scheduled"}
                                            onChange={handleUpdateAppointmentInputChange}
                                            required
                                          />
                                          <span className="ml-2">Scheduled</span>
                                        </label>

                                        <label className="flex items-center my-2">
                                          <input
                                            className={`p-2 border border-gray-600 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                            type="radio"
                                            name="status"
                                            value="Confirmed"
                                            checked={appointmentToBeUpdated.status === "Confirmed"}
                                            onChange={handleUpdateAppointmentInputChange}
                                            required
                                          />
                                          <span className="ml-2">Confirmed</span>
                                        </label>

                                        <label className="flex items-center my-2">
                                          <input
                                            className={`p-2 border border-gray-600 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                            type="radio"
                                            name="status"
                                            value="Checked In"
                                            checked={appointmentToBeUpdated.status === "Checked In"}
                                            onChange={handleUpdateAppointmentInputChange}
                                            required
                                          />
                                          <span className="ml-2">Checked In</span>
                                        </label>

                                        {/* Second Row */}
                                        <label className="flex items-center my-2">
                                          <input
                                            className={`p-2 border border-gray-600 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                            type="radio"
                                            name="status"
                                            value="Completed"
                                            checked={appointmentToBeUpdated.status === "Completed"}
                                            onChange={handleUpdateAppointmentInputChange}
                                            required
                                          />
                                          <span className="ml-2">Completed</span>
                                        </label>

                                        <label className="flex items-center my-2">
                                          <input
                                            className={`p-2 border border-gray-600 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                            type="radio"
                                            name="status"
                                            value="Cancelled"
                                            checked={appointmentToBeUpdated.status === "Cancelled"}
                                            onChange={handleUpdateAppointmentInputChange}
                                            required
                                          />
                                          <span className="ml-2">Cancelled</span>
                                        </label>

                                        <label className="flex items-center my-2">
                                          <input
                                            className={`p-2 border border-gray-600 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                            type="radio"
                                            name="status"
                                            value="No Show"
                                            checked={appointmentToBeUpdated.status === "No Show"}
                                            onChange={handleUpdateAppointmentInputChange}
                                            required
                                          />
                                          <span className="ml-2">No Show</span>
                                        </label>
                                      </div>
                                    </div>
                                    
                                    <div className="fixed bottom-10 left-0 right-0 flex justify-center">
                                      <button
                                        type="submit"
                                        className={`p-2 rounded bg-green-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200`}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </StyledForm>
                            </ScrollableWrapper>

                          </div>
                        </div>
                      </div>
                    )}

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
