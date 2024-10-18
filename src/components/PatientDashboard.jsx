import React, { useState, useEffect } from "react";
import { FaBars, FaCalendarAlt, FaFileMedical, FaMoneyBill, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const sampleDoctors = [
  { id: 1, name: "Dr. Smith", service: "Consultation" },
  { id: 2, name: "Dr. Jones", service: "Check-up" },
  { id: 3, name: "Dr. Brown", service: "Follow-Up" },
  { id: 4, name: "Dr. White", service: "Consultation" },
];

// Sample data for bills
const initialBills = [
  { id: 1, date: "2024-10-01", amount: 150, status: "Pending" },
  { id: 2, date: "2024-10-10", amount: 200, status: "Pending" },
  { id: 3, date: "2024-10-15", amount: 75, status: "Paid" },
];

const PatientDashboard = () => {
 /**
 * Import Section
 */
  const navigate = useNavigate(); // Initialize useNavigate

  
  /**
 * DataSection
 */
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAction, setSelectedAction] = useState("viewBills");
  const [selectedService, setSelectedService] = useState("");
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [bills, setBills] = useState([]);
  
  // State for theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage for theme preference
    return localStorage.getItem('theme') === 'dark';
  });


  /**
 * Methods Section
 */
  const handleToggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handlePayPill = async (bill) => {
    try {
      const phone_number = prompt(`Enter the MPesa number you want to pay ${bill.amount} through:`)
  
      if (phone_number === null) {
        console.log("phone_number === null")
        return; 
      }
      
      if(phone_number == ""){
        alert("You have not entered any phone number.")
        console.log("phone_number === ''")

        handlePayPill(bill)
        return
      }

      console.log("phone_number.length", phone_number.length  )


      const converted_phone_number = Number(phone_number);

      console.log(converted_phone_number)

      if (isNaN(converted_phone_number)) {
        alert("Enter a valid Mpesa number.")
        console.log("converted_phone_number")

        handlePayPill(bill)
          return null; // or handle the error as needed
      }

      if(phone_number.length < 9 || phone_number.length > 10){
        alert("Enter a valid Mpesa number.")
        console.log("phone_number.length < 9 || phone_number.length > 10")

        handlePayPill(bill)
        return
      }

      // Convert the number back to string for regex operation
      const converted_phone_number_string = converted_phone_number.toString();

      // Use regex to remove the first '0' if it exists at the beginning
      const result_string = converted_phone_number_string.replace(/^0+/, '');

      const payment_data = {
        phone_number: `+254${result_string}`,
        bill_id: bill.id
      }
      
      console.log(payment_data)
    } catch (error) {
      
    }
  }

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setShowSidebar(false); // Optionally hide the sidebar after selecting an action

    // If the action is to view bills, fetch the bills
    if (action === "viewBills") {
      fetchBills();
    }
  };

  const handleServiceChange = (service) => {
    setSelectedService(service);
    fetchAvailableDoctors(service);
  };

  const fetchAvailableDoctors = (service) => {
    // Simulate fetching data from an API
    const doctors = sampleDoctors.filter((doctor) => doctor.service === service);
    setAvailableDoctors(doctors);
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
  const fetchMyBills = async () => {
    // Simulate fetching bills from an API
    // setBills(initialBills);
    try {
      const response = await fetch('http://localhost:5000/patients/1/bills', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setBills(result)
      } else {
        throw new Error('Failed to fetch doctors.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handlePayment = (billId) => {
    // Simulate payment processing
    setBills((prevBills) =>
      prevBills.map((bill) =>
        bill.id === billId ? { ...bill, status: "Paid" } : bill
      )
    );
    alert(`Bill ID ${billId} has been paid!`);
  };

  const handleLogout = () => {
    // Perform logout logic here (if needed)
    navigate("/"); // Redirect to landing page
  };

  /**
   * Mounted() Section
   */
  useEffect(() => {
    // Persist theme preference to local storage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    fetchMyBills();
  }, []);

  /**
   * HTML Section
   */
  return (
    <div className={`min-h-screen flex flex-col relative ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Navbar */}
      <nav className={`bg-${isDarkMode ? 'gray-800' : 'gray-200'} shadow-md flex items-center justify-between px-4 py-3`}>
        <button
          onClick={() => setShowSidebar(!showSidebar)} // Show/hide sidebar
          className={`text-${isDarkMode ? 'blue-300' : 'blue-600'} z-10`}
        >
          <FaBars className="text-2xl" />
        </button>
        {/* Theme Toggle Button */}
        <button
          onClick={handleToggleTheme}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-blue-600'}`}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        {/* Login Button at the Top Right */}
        <button
          onClick={handleLogout} // Handle logout or navigate to login page
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg`}
        >
          Login
        </button>
      </nav>

      {/* Patients Section Header */}
      <header className={`bg-${isDarkMode ? 'gray-700' : 'gray-300'} py-6 text-center`}>
        <h1 className="text-4xl font-bold">Welcome to the Patient Dashboard</h1>
        <p className="mt-2 text-lg">Manage your health, appointments, and records in one place</p>
      </header>

      {/* Sidebar */}
      {showSidebar && (
        <div className={`absolute top-24 left-4 bg-${isDarkMode ? 'gray-800' : 'white'} p-4 rounded-lg shadow-lg z-20`}>
          <h3 className="font-bold text-lg mb-4">Options</h3>
          <ul>
            <li onClick={() => handleActionClick("bookDoctor")} className={`cursor-pointer mb-2 text-${isDarkMode ? 'blue-400' : 'blue-600'} hover:underline`}>
              <FaCalendarAlt className="inline mr-2" /> Book a Doctor
            </li>
            <li onClick={() => handleActionClick("viewRecords")} className={`cursor-pointer mb-2 text-${isDarkMode ? 'blue-400' : 'blue-600'} hover:underline`}>
              <FaFileMedical className="inline mr-2" /> View Health Records
            </li>
            <li onClick={() => handleActionClick("viewBills")} className={`cursor-pointer text-${isDarkMode ? 'blue-400' : 'blue-600'} hover:underline`}>
              <FaMoneyBill className="inline mr-2" /> View Bills
            </li>
          </ul>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center relative mt-12">
        <div className={`bg-${isDarkMode ? 'gray-800' : 'gray-100'} bg-opacity-80 rounded-lg shadow-lg w-full max-w-4xl p-8 flex-grow`}>
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Hello, Patient!</h2>
            <p className={`text-${isDarkMode ? 'gray-400' : 'gray-800'}`}>We are here to assist you with managing your healthcare needs. You can book a doctor, view your health records, and manage appointments from your dashboard.</p>
          </div>

          {/* Content Area */}
          <div className={`bg-${isDarkMode ? 'gray-700' : 'gray-200'} p-4 rounded-lg shadow-lg`}>
            {selectedAction ? (
              <>
                <h2 className="text-xl font-semibold">{selectedAction.replace(/([A-Z])/g, ' $1')}</h2>
                <p className={`text-${isDarkMode ? 'gray-400' : 'gray-800'}`}>
                  You selected to {selectedAction.replace(/([A-Z])/g, ' $1').toLowerCase()}.
                </p>
                {/* Implement the functionality buttons for each action here */}
                {selectedAction === "bookDoctor" && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Book a Doctor</h3>
                    <select onChange={(e) => handleServiceChange(e.target.value)} className={`p-2 border rounded mb-2 w-full bg-${isDarkMode ? 'gray-600' : 'white'} text-${isDarkMode ? 'white' : 'black'}`}>
                      <option value="">Select Service</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Check-up">Check-up</option>
                      <option value="Follow-Up">Follow-Up</option>
                      {/* Add more services as needed */}
                    </select>
                    {selectedService && (
                      <>
                        <h4 className="font-semibold mt-2">Available Doctors for {selectedService}:</h4>
                        {availableDoctors.length > 0 ? (
                          <ul className="mt-2">
                            {availableDoctors.map((doctor) => (
                              <li key={doctor.id} className={`text-${isDarkMode ? 'gray-300' : 'gray-600'} mb-1`}>{doctor.name}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>No doctors available for this service.</p>
                        )}
                        <input type="date" className={`p-2 border rounded mb-2 w-full bg-${isDarkMode ? 'gray-600' : 'white'} text-${isDarkMode ? 'white' : 'black'}`} />
                        <input type="time" className={`p-2 border rounded mb-2 w-full bg-${isDarkMode ? 'gray-600' : 'white'} text-${isDarkMode ? 'white' : 'black'}`} />
                        <button className={`bg-blue-600 text-white px-4 py-2 rounded-lg`}>Book Appointment</button>
                      </>
                    )}
                  </div>
                )}
                {selectedAction === "viewRecords" && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Health Records</h3>
                    <p className={`text-${isDarkMode ? 'gray-400' : 'gray-800'}`}>Your medical history and previous consultations will appear here.</p>
                    <button className={`bg-blue-600 text-white px-4 py-2 rounded-lg mt-4`}>View Detailed Records</button>
                  </div>
                )}
                {selectedAction === "viewBills" && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Your Bills</h3>
                    {bills.length > 0 ? (
                    
                    <table className="min-w-full bg-white dark:bg-gray-800">
                      <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                          <th className="py-2 px-4 border-b text-left">Date</th>
                          <th className="py-2 px-4 border-b text-left">Description</th>
                          <th className="py-2 px-4 border-b text-left">Amount</th>
                          <th className="py-2 px-4 border-b text-left">Status</th>
                          <th className="py-2 px-4 border-b text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bills.map((bill) => (
                          <tr key={bill.id} className={`border-b text-${isDarkMode ? 'gray-300' : 'gray-600'}`}>
                            <td className="py-2 px-4">
                              <span>  
                                {formatDate(bill.creation_date).date_of_day}
                                <sup>{formatDate(bill.creation_date).date_of_day_suffix}</sup> 
                                &nbsp;
                                {formatDate(bill.creation_date).rest_of_date}
                              </span>  
                            </td> {/* Assuming creation_date holds the date */}
                            <td className="py-2 px-4">{bill.description}</td>
                            <td className="py-2 px-4">${bill.amount.toFixed(2)}</td>
                            <td className="py-2 px-4">{bill.status}</td>
                            <td className="py-2 px-4">
                              <button
                                className="bg-green-500 text-white px-2 py-1 rounded"
                                onClick={() => handlePayPill(bill)}
                              >
                                Pay
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    ) : (
                      <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>You have no bills at the moment.</p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>Please select an option from the menu.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
