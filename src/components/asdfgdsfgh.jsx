import React, { useState, useEffect } from "react";
import { FaBars, FaUserMd, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styled from 'styled-components';

// Styled component with custom scrollbar
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
  margin-top: 1.5rem; /* Margin from the top */
  overflow-y: scroll; /* Keeps the ability to scroll */
  max-height: calc(100vh - 10rem); /* Maximum height adjustment */

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


 //Country codes:
const countries = [
  { name: "Kenya", code: "+254", digits_length: 9 },
  { name: "South Africa", code: "+27", digits_length: 10 },
  { name: "Egypt", code: "+20", digits_length: 9 },
  { name: "Nigeria", code: "+234", digits_length: 10 },
  { name: "Morocco", code: "+212", digits_length: 9 },
  { name: "Ghana", code: "+233", digits_length: 9 },
  { name: "Tunisia", code: "+216", digits_length: 8 },
  { name: "Tanzania", code: "+255", digits_length: 9 },
  { name: "Uganda", code: "+256", digits_length: 9 },
  { name: "Rwanda", code: "+250", digits_length: 8 },
  { name: "Germany", code: "+49", digits_length: 10 },
  { name: "Sweden", code: "+46", digits_length: 9 },
  { name: "Japan", code: "+81", digits_length: 10 },
  { name: "Singapore", code: "+65", digits_length: 8 },
  { name: "Switzerland", code: "+41", digits_length: 9 },
  { name: "Australia", code: "+61", digits_length: 9 },
  { name: "Canada", code: "+1", digits_length: 10 },
  { name: "France", code: "+33", digits_length: 9 },
  { name: "Norway", code: "+47", digits_length: 8 },
  { name: "Netherlands", code: "+31", digits_length: 9 },
  { name: "Finland", code: "+358", digits_length: 10 },
  { name: "United Kingdom", code: "+44", digits_length: 10 },
  { name: "New Zealand", code: "+64", digits_length: 9 },
  { name: "Belgium", code: "+32", digits_length: 8 },
  { name: "Austria", code: "+43", digits_length: 10 },
  { name: "Denmark", code: "+45", digits_length: 8 },
  { name: "Italy", code: "+39", digits_length: 10 },
  { name: "Iceland", code: "+354", digits_length: 7 },
  { name: "United States", code: "+1", digits_length: 10 },
  { name: "Spain", code: "+34", digits_length: 9 },
  { name: "Israel", code: "+972", digits_length: 9 },
  { name: "South Korea", code: "+82", digits_length: 9 },
  { name: "United Arab Emirates", code: "+971", digits_length: 9 },
];
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAction, setSelectedAction] = useState("viewDoctors");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAddDoctorPromptOpen, setIsAddDoctorPromptOpen] = useState(false);
  
  // Sample data for doctors and their patients with billing information
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      title: "Dr",
      first_name: "John",
      surname: "Smith",
      gender: "Male",
      date_of_birth: "21/05/1975",
      specialization: "Gynacologist",
      phone_number_country_code: "+39", // Randomly selected country code (e.g., Kenya)
      phone_number: "7977272523",
      email: "john.smith@example.com",
      address: "101, Maisha Hostel, Nyeri",
      years_of_experience: 23,
      qualifications: [
        "Doctor of Medicine (MD) in Obstetrics and Gynecology",
        "Fellowship in Gynecology and Obstetrics (FGO)",
        "Diplomate of National Board (DNB) in Obstetrics and Gynecology",
        "Certified in Laparoscopic Surgery"
      ],
      start_of_employment: "12/10/2024",
      emergency_contact: "703571509",
      emergency_contact_country_code: "+254", // Randomly selected country code (e.g., Kenya)
      patients: [
        { id: 1, name: "John Doe", age: 30, bill: 150, paid: true },
        { id: 2, name: "Jane Doe", age: 25, bill: 200, paid: false },
        { id: 3, name: "Jane Doe", age: 25, bill: 200, paid: false },
        { id: 4, name: "Jane Doe", age: 25, bill: 200, paid: false },
      ],
    },
    {
      id: 2,
      title: "Dr",
      first_name: "James",
      surname: "Quincy",
      gender: "Male",
      date_of_birth: "01/01/1980",
      specialization: "Optician",
      phone_number_country_code: "+43", // Randomly selected country code (e.g., Kenya)
      phone_number: "3722965500",
      email: "james.quicy@example.com",
      address: "52336, Muhito Plaza, Nyeri",
      years_of_experience: 13,
      qualifications: [
        "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
        "Doctor of Medicine (MD) in Obstetrics and Gynecology",
        "Fellowship in Gynecology and Obstetrics (FGO)",
        "Member of the Royal College of Obstetricians and Gynaecologists (MRCOG)",
        "Diplomate of National Board (DNB) in Obstetrics and Gynecology",
        "Certified in Laparoscopic Surgery"
      ],
      start_of_employment: "05/07/2019",
      emergency_contact: "1725639450",
      emergency_contact_country_code: "+27", // Randomly selected country code (e.g., South Africa)
      patients: [
        { id: 1, name: "John Doe", age: 30, bill: 150, paid: true },
        { id: 2, name: "Jane Doe", age: 25, bill: 200, paid: false },
        { id: 3, name: "Jane Doe", age: 25, bill: 200, paid: false },
        { id: 4, name: "Jane Doe", age: 25, bill: 200, paid: false },
        { id: 5, name: "Jane Doe", age: 25, bill: 200, paid: false },
        { id: 6, name: "Jane Doe", age: 25, bill: 200, paid: false },
      ],
    },
    {
      id: 3,
      title: "Dr",
      first_name: "Julie",
      surname: "Lentin",
      gender: "Female",
      date_of_birth: "17/09/1995",
      specialization: "Orthopidic",
      phone_number_country_code: "+972", // Randomly selected country code (e.g., Kenya)
      phone_number: "752630089",
      email: "l_julie@example.com",
      address: "85, Cointelle Part, Nyeri",
      years_of_experience: 3,
      qualifications: [
        "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
        "Certified in Orthopidic Surgery"
      ],
      start_of_employment: "03/12/2023",
      emergency_contact: "721598304",
      emergency_contact_country_code: "+20", // Randomly selected country code (e.g., Egypt)
      patients: [
        { id: 1, name: "John Doe", age: 30, bill: 150, paid: true },
        { id: 2, name: "John Doe", age: 30, bill: 150, paid: true },
        { id: 3, name: "Jane Doe", age: 25, bill: 200, paid: false },
      ],
    },
  ]);

  
  const [selectedDoctorToEdit, setSelectedDoctorToEdit] = useState({
    id: 1,
    title: "Dr",
    first_name: "John",
    surname: "Smith",
    gender: "Male",
    date_of_birth: "21/05/1975",
    specialization: "Gynacologist",
    phone_number_country_code: "+39", // Randomly selected country code (e.g., Kenya)
    phone_number: "7977272523",
    email: "john.smith@example.com",
    address: "101, Maisha Hostel, Nyeri",
    years_of_experience: 23,
    qualifications: [
      "Doctor of Medicine (MD) in Obstetrics and Gynecology",
      "Fellowship in Gynecology and Obstetrics (FGO)",
      "Diplomate of National Board (DNB) in Obstetrics and Gynecology",
      "Certified in Laparoscopic Surgery"
    ],
    start_of_employment: "12/10/2024",
    emergency_contact: "703571509",
    emergency_contact_country_code: "+254", // Randomly selected country code (e.g., Kenya)
    patients: [
      { id: 1, name: "John Doe", age: 30, bill: 150, paid: true },
      { id: 2, name: "Jane Doe", age: 25, bill: 200, paid: false },
      { id: 3, name: "Jane Doe", age: 25, bill: 200, paid: false },
      { id: 4, name: "Jane Doe", age: 25, bill: 200, paid: false },
    ],
  });

  const [isEditDoctorPromptOpen, setIsEditDoctorPromptOpen] = useState(true);

  const [doctorDetails, setDoctorDetails] = useState({
    title: '',
    first_name: '',
    surname: '',
    gender: '',
    date_of_birth: '',
    specialization: '',
    emergency_contact: '',
    country_code: countries.find(country => country.code === '+254'),
    emergency_country_code: countries.find(country => country.code === '+254'),
    phone_number: '',
    email: '',
    address: '',
    years_of_experience: '',
  });
  const [qualifications, setQualifications] = useState(['']);

  const [specialization_options, setSpecializationOptions] = useState([
    { id: 1, title: "Cardiologist" },
    { id: 2, title: "Dermatologist" },
    { id: 3, title: "Gastroenterologist" },
    { id: 4, title: "Neurologist" },
    { id: 5, title: "Oncologist" },
    { id: 6, title: "Pediatrician" },
    { id: 7, title: "Psychiatrist" },
    { id: 8, title: "Radiologist" },
    { id: 9, title: "Surgeon" },
    { id: 10, title: "Urologist" },
    { id: 11, title: "Orthopedic Surgeon" },
    { id: 12, title: "Ophthalmologist" },
    { id: 13, title: "Endocrinologist" },
    { id: 14, title: "Allergist" },
    { id: 15, title: "Obstetrician" },
    { id: 16, title: "ENT Specialist" },
    { id: 17, title: "Nephrologist" },
    { id: 18, title: "Rheumatologist" },
    { id: 19, title: "Anesthesiologist" },
    { id: 20, title: "Family Medicine" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({ ...doctorDetails, [name]: value });
  };

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Apply dark mode class to the root element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setShowSidebar(false); // Optionally hide the sidebar after selecting an action
  };

  const toogleAddDoctorPrompt = (bool) => {
    setIsAddDoctorPromptOpen(bool)
  };

  const toogleEditDoctorPrompt = (doctor) => {
    if(doctor){
      setSelectedDoctorToEdit(doctor)
    }
    setIsEditDoctorPromptOpen(doctor)
  }

  const handleEditDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
    // Update the original selectedDoctorToEdit object if needed
    setSelectedDoctorToEdit(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const [editValues, setEditValues] = useState({ ...selectedDoctorToEdit });

  const handleLogout = () => {
    navigate("/"); // Redirect to landing page
  };

  
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    
    const validQualifications = qualifications.filter((q) => q.trim() !== '');

    const { country_code, emergency_country_code, ...restOfDoctorDetails } = doctorDetails;

    const new_doctor = {
      ...restOfDoctorDetails,
      qualifications: validQualifications,
      id: doctors.length + 1,
      phone_number_country_code: doctorDetails.country_code.code,
      emergency_contact_country_code: doctorDetails.emergency_country_code.code
    };

    console.log(new_doctor)

    // Update the doctors array with the new doctor
    setDoctors((prev_doctors) => [...prev_doctors, new_doctor]);

    const defaultCountry = countries.find(country => country.name === 'Kenya');

    // Reset the form fields
    setDoctorDetails({
      title: '',
      first_name: '',
      surname: '',
      gender: '',
      date_of_birth: '',
      specialization: '',
      country_code: defaultCountry || countries[0],
      phone_number: '',
      email: '',
      address: '',
      years_of_experience: '',
      start_of_employment: '',
      emergency_country_code:   defaultCountry || countries[0],
      emergency_contact: '',
    });
    setQualifications(['']); // Reset qualifications to an empty input
  };

  const validateForm = () => {
    const { title, first_name, surname, gender, date_of_birth, phone_number, email, emergency_contact, specialization, address, years_of_experience, start_of_employment } = doctorDetails;
    
    // Check if all required fields are filled in and qualifications meet criteria
    const isValid = title && first_name && surname && gender && date_of_birth && phone_number && email && emergency_contact && specialization && address && years_of_experience && start_of_employment && qualifications.every(q => q.length >= 10);
    setIsFormValid(isValid);
  };

  // Handle qualification change when user types
  const handleQualificationChange = (index, value) => {
    const newQualifications = [...qualifications];
    newQualifications[index] = value;
    setQualifications(newQualifications);

    // If the current qualification has 5 or more characters, add a new input
    if (value.length >= 10 && index === qualifications.length - 1) {
      setQualifications([...qualifications, '']);
    }

    validateForm();
  };

  const [isFormValid, setIsFormValid] = useState(false);

// };

const isTitleValid = doctorDetails.title.trim().length > 0;
const isFirstNameValid = doctorDetails.first_name.trim().length > 2;
const isSurnameValid = isFirstNameValid && doctorDetails.surname.trim().length > 2;
const isGenderValid = isSurnameValid && doctorDetails.gender.trim().length > 0;
const isDateOfBirthValid = isGenderValid && doctorDetails.date_of_birth.length > 0;
const isPhoneValid = (
  isDateOfBirthValid 
  && doctorDetails.phone_number !== '' 
  && doctorDetails.phone_number.length === doctorDetails.country_code.digits_length
);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
const isEmailValid = isPhoneValid && doctorDetails.email.trim().length > 0 && emailPattern.test(doctorDetails.email.trim());

const isEmergencyContactValid = (
  isEmailValid 
  && doctorDetails.emergency_contact !== '' 
  && doctorDetails.emergency_contact.length === doctorDetails.emergency_country_code.digits_length
);

const isSpecializationValid = isEmergencyContactValid && doctorDetails.specialization.length > 5;
const isAddressValid = isSpecializationValid && doctorDetails.address.length > 0;
const isExperienceValid = isAddressValid && doctorDetails.years_of_experience.trim().length > 0;
const isStartEmploymentValid = isExperienceValid && doctorDetails.years_of_experience.trim().length > 0;
const isQualificationsValid = qualifications.every(q => q.trim().length >= 10 || q === ''); // Check each qualification

// Handle qualification blur (focus loss)
const handleQualificationBlur = (index) => {
  const currentQualification = qualifications[index];
  
  // If the current input is not empty and the user moves to the next, it will remain in the array
  if (currentQualification.trim() === '') {
    // Remove empty qualification if user leaves it blank
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);
  }
};

useEffect(() => {
  // Disable scrolling when the popup is open
  if (isAddDoctorPromptOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  // Cleanup function to restore overflow on unmount
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isAddDoctorPromptOpen]);
  
  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-black' : 'bg-gray-200'}`}>
      {/* Navbar */}
      <nav className={`shadow-md flex items-center justify-between px-4 py-3 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <button onClick={() => setShowSidebar(!showSidebar)} className={`${isDarkMode ? 'text-blue-400' : 'text-blue-700'} z-10`}>
          <FaBars className="text-2xl" />
        </button>
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg mr-4 ${isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      {showSidebar && (
        <div className={`absolute top-16 left-4 p-4 rounded-lg shadow-lg z-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Options</h3>
          <ul>
            <li onClick={() => handleActionClick("viewDoctors")} className={`cursor-pointer mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'} hover:underline`}>
              <FaUserMd className="inline mr-2" /> View Doctors
            </li>
            <li onClick={() => handleActionClick("viewPatients")} className={`cursor-pointer ${isDarkMode ? 'text-blue-400' : 'text-blue-700'} hover:underline`}>
              <FaUsers className="inline mr-2" /> View Patients
            </li>
          </ul>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow flex items-center justify-center relative mt-12">
        <div className={`rounded-lg shadow-lg w-full max-w-4xl p-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-80' : 'bg-white'}`}>
          <div className={`p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            {selectedAction ? (
              <>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Selected Action: {selectedAction.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/\b\w/g, str => str.toUpperCase())}
                </h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  You selected to {selectedAction.replace(/([A-Z])/g, ' $1').toLowerCase()}.
                </p>
                <div className="mt-2">
                  <button onClick={() => toogleAddDoctorPrompt(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg mx-1">
                    Add Doctor  
                  </button>
                </div>

                {/* Implement functionality for each action */}
                {selectedAction === "viewDoctors" && (
                  <div>
                    {isAddDoctorPromptOpen && (
                    <div className="fixed inset-x-0 top-5 bottom-5 flex items-center justify-center z-50">
                      <div className="bg-slate-600 rounded-lg p-6 shadow-lg w-11/12 max-w-lg h-full overflow-y-auto relative">
                        
                        {/* Close button */}
                        <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => toogleAddDoctorPrompt(false)}>
                          &times; {/* This is the "X" symbol */}
                        </div>
                        <ScrollableWrapper className="bg-white rounded">
                        
                          <StyledForm className="bg-white p-6 rounded shadow-md mt-6" onSubmit={handleAddDoctor}>
                            <div>
                              <div>
                                <label className="block mb-0">Title:</label>
                                <input
                                  className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                  type="text"
                                  name="title"
                                  value={doctorDetails.title}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>

                              <div>
                                <label className="block mt-3 mb-0">First Name:</label>
                                <input
                                  className={
                                    `mt-1 p-2 border border-gray-600 rounded w-full 
                                    ${!isTitleValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                    focus:border-blue-500 focus:ring focus:ring-blue-200`
                                  }
                                  type="text"
                                  name="first_name"
                                  value={doctorDetails.first_name}
                                  onChange={handleInputChange}
                                  disabled={!isTitleValid} // Enable if title is valid
                                  required
                                />
                              </div>

                              <div>
                                <label className="block mt-3 mb-0">Surname:</label>
                                <input
                                  className={
                                    `mt-1 p-2 border border-gray-600 rounded w-full 
                                    ${!isFirstNameValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                    focus:border-blue-500 focus:ring focus:ring-blue-200`
                                  }
                                  type="text"
                                  name="surname"
                                  value={doctorDetails.surname}
                                  onChange={handleInputChange}
                                  disabled={!isFirstNameValid} // Enable if first name is valid
                                  required
                                />
                              </div>

                              <div>
                                <label className="block mt-3 mb-0">Gender:</label>
                                <select
                                  className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                  name="gender"
                                  value={doctorDetails.gender}
                                  onChange={handleInputChange}
                                  disabled={!isSurnameValid} // Enable if surname is valid
                                  required
                                >
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>

                              <div>
                                {/* <label className="block mt-3 mb-0">Date of Birth:</label> */}
                                <label className="block mt-3 mb-0">Date of Birth:</label>

                                <input
                                  className={
                                    `mt-1 p-2 border border-gray-600 rounded w-full 
                                    ${!isGenderValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                    focus:border-blue-500 focus:ring focus:ring-blue-200`
                                  }
                                  type="date"
                                  name="date_of_birth"
                                  value={doctorDetails.date_of_birth}
                                  onChange={handleInputChange}
                                  disabled={!isGenderValid} // Enable if gender is selected
                                  required
                                />
                              </div>

                              <div>
                                <label className="block mt-3 mb-0"> Phone Number: </label>
                                <div className="flex items-center mt-1">
                                  <select
                                    className={`
                                      border border-gray-600 rounded-l p-2 bg-gray-800 text-green-500 w-1/5 
                                      ${!isDateOfBirthValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                      focus:border-blue-500 focus:ring focus:ring-blue-200
                                    `}
                                    value={doctorDetails.country_code.code}
                                    onChange={(e) => {
                                      const selectedCountry = countries.find(country => country.code === e.target.value);
                                      setDoctorDetails(prevDetails => ({ ...prevDetails, country_code: selectedCountry }));
                                    }}
                                    disabled={!isDateOfBirthValid} // Enable if date of birth is valid
                                  >
                                    {countries.map((country) => (
                                      <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                        {country.code} {country.name} 
                                      </option>
                                    ))}
                                  </select>
                                  <input
                                    className={`ml-1 p-2 border border-gray-600 rounded-r w-4/5 
                                                ${!isDateOfBirthValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                                focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="number"
                                    name="phone_number"
                                    value={doctorDetails.phone_number}
                                    onChange={handleInputChange}
                                    placeholder={`${doctorDetails.country_code.digits_length} digits`}
                                    disabled={!isDateOfBirthValid} // Enable if date of birth is valid
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block mt-3 mb-0">Email:</label>
                                <input
                                  className={
                                    `mt-1 p-2 border border-gray-600 rounded w-full 
                                    ${!isPhoneValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                    focus:border-blue-500 focus:ring focus:ring-blue-200`
                                  }
                                  type="email"
                                  name="email"
                                  value={doctorDetails.email}
                                  onChange={handleInputChange}
                                  disabled={!isPhoneValid} // Enable if phone number is valid
                                  required
                                />
                              </div>

                              <div>
                                <label className="block mt-3 mb-0">Emergency Contact:</label>
                                <p>
                                  {/* {doctorDetails.emergency_country_code.code} */}
                                </p>
                                <div className="flex items-center mt-1">
                                  <select
                                    className={`
                                      border border-gray-600 rounded-l p-2 bg-gray-800 text-green-500 w-1/5 
                                      ${!isEmailValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                      focus:border-blue-500 focus:ring focus:ring-blue-200
                                    `}
                                    disabled={!isEmailValid} // Enable if date of birth is valid
                                    onChange={(e) => {
                                      const selectedEmergencyCountry = countries.find(country => country.code === e.target.value);
                                      setDoctorDetails(prevDetails => ({ ...prevDetails, emergency_country_code: selectedEmergencyCountry }));
                                    }}

                                  >
                                    {countries.map((country) => (
                                      <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                        {country.code} {country.name} 
                                      </option>
                                    ))}
                                  </select>
                                  <input
                                    className={`ml-1 p-2 border border-gray-600 rounded-r w-4/5 
                                                ${!isEmailValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                                focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="number"
                                    name="emergency_contact"
                                    value={doctorDetails.emergency_contact}
                                    onChange={handleInputChange}
                                    placeholder={`${doctorDetails.emergency_country_code.digits_length} digits`}
                                    disabled={!isEmailValid} // Enable if date of birth is valid
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block mt-3 mb-0">Specialization:</label>
                                <select
                                  className={
                                    `mt-1 p-2 border border-gray-600 rounded w-full 
                                    ${!isEmergencyContactValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                    focus:border-blue-500 focus:ring focus:ring-blue-200`
                                  }
                                  name="specialization"
                                  value={doctorDetails.specialization}
                                  onChange={handleInputChange}
                                  disabled={!isEmergencyContactValid} // Enable if emergency contact is valid
                                  required
                                >
                                  <option value="" disabled>Select a specialization</option>
                                  {specialization_options.map((specialization) => (
                                    <option key={specialization.id} value={specialization.title}>
                                      {specialization.title}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block mt-3 mb-0">Address:</label>
                                <input
                                  className={
                                    `mt-1 p-2 border border-gray-600 rounded w-full 
                                    ${!isSpecializationValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                    focus:border-blue-500 focus:ring focus:ring-blue-200`
                                  }
                                  type="text"
                                  name="address"
                                  value={doctorDetails.address}
                                  onChange={handleInputChange}
                                  disabled={!isSpecializationValid} // Enable if specialization is selected
                                  required
                                />
                              </div>

                              <div>
                                <label className="block mt-3 mb-0">Years of Experience:</label>
                                <input
                                  className={
                                    `mt-1 p-2 border border-gray-600 rounded w-full 
                                    ${!isAddressValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                    focus:border-blue-500 focus:ring focus:ring-blue-200`
                                  }
                                  type="number"
                                  name="years_of_experience"
                                  value={doctorDetails.years_of_experience}
                                  onChange={handleInputChange}
                                  disabled={!isAddressValid}
                                  // Enable if address is valid
                                  required
                                />
                              </div>
                                  
                              <div>
                                <label className="block mt-3 mb-0">Start of Employment:</label>
                                <input
                                  className={
                                    `mt-1 p-2 border border-gray-600 rounded w-full 
                                    ${!isExperienceValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                    focus:border-blue-500 focus:ring focus:ring-blue-200`
                                  }
                                  type="date"
                                  name="start_of_employment"
                                  value={doctorDetails.start_of_employment}
                                  onChange={handleInputChange}
                                  disabled={!isExperienceValid} // Enable if years of experience is valid
                                  required
                                />
                              </div>

                              <div>
                                <label className="block mt-3 mb-2">Qualifications:</label>
                                {qualifications.map((qualification, index) => (
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isStartEmploymentValid || (index > 0 && qualifications[index - 1].length < 10) ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    key={index}
                                    type="text"
                                    value={qualification}
                                    onChange={(e) => handleQualificationChange(index, e.target.value)}
                                    onBlur={() => handleQualificationBlur(index)} 
                                    disabled={!isStartEmploymentValid || (index > 0 && qualifications[index - 1].length < 10)} // Disable if not valid or previous qualification is invalid
                                  />
                                ))}
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
                    )}

                    {isEditDoctorPromptOpen && (
                      <div className="fixed inset-x-0 top-5 bottom-5 flex items-center justify-center z-50">
                        <div className="bg-slate-600 rounded-lg p-6 shadow-lg w-11/12 max-w-lg h-full overflow-y-auto relative">
                         {/* Close button */}
                         <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => toogleEditDoctorPrompt(false)}>
                           &times; {/* This is the "X" symbol */}
                         </div>
                          <ScrollableWrapper className="bg-white rounded">
                            {selectedDoctorToEdit.title}
                            {/* <StyledForm className="bg-white p-6 rounded shadow-md mt-6" onSubmit={handleAddDoctor}>
                              <div>
                                <div>
                                  <label className="block mb-0">Title:</label>
                                  <input
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="text"
                                    name="title"
                                    onChange={handleEditDoctorInputChange}value={editValues.title} // Show the current value
                                    
                                    required
                                  />
                                </div>
                              </div>
                            </StyledForm> */}
                            <StyledForm className="bg-white p-6 rounded shadow-md mt-6" onSubmit={handleAddDoctor}>
                              <div>
                                <div>
                                  <label className="block mb-0">Title:</label>
                                  <input
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="text"
                                    name="title"
                                    onChange={handleEditDoctorInputChange}value={editValues.title}
                                    
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">First Name:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isTitleValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="text"
                                    name="first_name"
                                    onChange={handleEditDoctorInputChange}value={doctorDetails.first_name}
                                    
                                    disabled={!isTitleValid} // Enable if title is valid
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Surname:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isFirstNameValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="text"
                                    name="surname"
                                    onChange={handleEditDoctorInputChange}value={doctorDetails.surname}
                                    
                                    disabled={!isFirstNameValid} // Enable if first name is valid
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Gender:</label>
                                  <select
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    name="gender"
                                    onChange={handleEditDoctorInputChange}value={doctorDetails.gender}
                                    
                                    disabled={!isSurnameValid} // Enable if surname is valid
                                    required
                                  >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>

                                <div>
                                  {/* <label className="block mt-3 mb-0">Date of Birth:</label> */}
                                  <label className="block mt-3 mb-0">Date of Birth:</label>

                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isGenderValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="date"
                                    name="date_of_birth"
                                    onChange={handleEditDoctorInputChange}value={doctorDetails.date_of_birth}
                                    
                                    disabled={!isGenderValid} // Enable if gender is selected
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0"> Phone Number: </label>
                                  <div className="flex items-center mt-1">
                                    <select
                                      className={`
                                        border border-gray-600 rounded-l p-2 bg-gray-800 text-green-500 w-1/5 
                                        ${!isDateOfBirthValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                        focus:border-blue-500 focus:ring focus:ring-blue-200
                                      `}
                                      value={doctorDetails.country_code.code}
                                      onChange={(e) => {
                                        const selectedCountry = countries.find(country => country.code === e.target.value);
                                        setDoctorDetails(prevDetails => ({ ...prevDetails, country_code: selectedCountry }));
                                      }}
                                      disabled={!isDateOfBirthValid} // Enable if date of birth is valid
                                    >
                                      {countries.map((country) => (
                                        <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                          {country.code} {country.name} 
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      className={`ml-1 p-2 border border-gray-600 rounded-r w-4/5 
                                                  ${!isDateOfBirthValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                                  focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="number"
                                      name="phone_number"
                                      onChange={handleEditDoctorInputChange}value={doctorDetails.phone_number}
                                      
                                      placeholder={`${doctorDetails.country_code.digits_length} digits`}
                                      disabled={!isDateOfBirthValid} // Enable if date of birth is valid
                                      required
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Email:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isPhoneValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="email"
                                    name="email"
                                    onChange={handleEditDoctorInputChange}value={doctorDetails.email}
                                    
                                    disabled={!isPhoneValid} // Enable if phone number is valid
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Emergency Contact:</label>
                                  <p>
                                    {/* {doctorDetails.emergency_country_code.code} */}
                                  </p>
                                  <div className="flex items-center mt-1">
                                    <select
                                      className={`
                                        border border-gray-600 rounded-l p-2 bg-gray-800 text-green-500 w-1/5 
                                        ${!isEmailValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                        focus:border-blue-500 focus:ring focus:ring-blue-200
                                      `}
                                      disabled={!isEmailValid} // Enable if date of birth is valid
                                      onChange={(e) => {
                                        const selectedEmergencyCountry = countries.find(country => country.code === e.target.value);
                                        setDoctorDetails(prevDetails => ({ ...prevDetails, emergency_country_code: selectedEmergencyCountry }));
                                      }}

                                    >
                                      {countries.map((country) => (
                                        <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                          {country.code} {country.name} 
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      className={`ml-1 p-2 border border-gray-600 rounded-r w-4/5 
                                                  ${!isEmailValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                                  focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="number"
                                      name="emergency_contact"
                                      onChange={handleEditDoctorInputChange}value={doctorDetails.emergency_contact}
                                      
                                      placeholder={`${doctorDetails.emergency_country_code.digits_length} digits`}
                                      disabled={!isEmailValid} // Enable if date of birth is valid
                                      required
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Specialization:</label>
                                  <select
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isEmergencyContactValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    name="specialization"
                                    onChange={handleEditDoctorInputChange}value={doctorDetails.specialization}
                                    
                                    disabled={!isEmergencyContactValid} // Enable if emergency contact is valid
                                    required
                                  >
                                    <option value="" disabled>Select a specialization</option>
                                    {specialization_options.map((specialization) => (
                                      <option key={specialization.id} value={specialization.title}>
                                        {specialization.title}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Address:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isSpecializationValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="text"
                                    name="address"
                                    onChange={handleEditDoctorInputChange}value={doctorDetails.address}
                                    
                                    disabled={!isSpecializationValid} // Enable if specialization is selected
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Years of Experience:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isAddressValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="number"
                                    name="years_of_experience"
                                    onChange={handleEditDoctorInputChange}value={doctorDetails.years_of_experience}
                                    
                                    disabled={!isAddressValid}
                                    // Enable if address is valid
                                    required
                                  />
                                </div>
                                    
                                <div>
                                  <label className="block mt-3 mb-0">Start of Employment:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isExperienceValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="date"
                                    name="start_of_employment"
                                    onChange={handleEditDoctorInputChange}value={doctorDetails.start_of_employment}
                                    
                                    disabled={!isExperienceValid} // Enable if years of experience is valid
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-2">Qualifications:</label>
                                  {qualifications.map((qualification, index) => (
                                    <input
                                      className={
                                        `mt-1 p-2 border border-gray-600 rounded w-full 
                                        ${!isStartEmploymentValid || (index > 0 && qualifications[index - 1].length < 10) ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                        focus:border-blue-500 focus:ring focus:ring-blue-200`
                                      }
                                      key={index}
                                      type="text"
                                      value={qualification}
                                      onChange={(e) => handleQualificationChange(index, e.target.value)}
                                      onBlur={() => handleQualificationBlur(index)} 
                                      disabled={!isStartEmploymentValid || (index > 0 && qualifications[index - 1].length < 10)} // Disable if not valid or previous qualification is invalid
                                    />
                                  ))}
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
                    )}

                    <h3 className={`${isDarkMode ? 'my-2 text-white' : 'my-2 text-gray-900'} font-semibold`}>Doctors</h3>

                    <div className="bg-slate-500 p-2">
                      <div className="mt-4">
                        <ul className="mt-2">
                          {doctors.map((doctor) => (
                            <li key={doctor.id} className="mb-4 bg-slate-700 p-2 rounded">

                              <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-bold`}>
                                {`${doctor.id}: ${doctor.title}. ${doctor.surname}, ${doctor.first_name} (${doctor.gender})`}
                              </h4>

                              <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-bold">
                                      {`Date of Birth: `}
                                    </span>
                                    <span>
                                      {`${doctor.date_of_birth} (50)`}
                                    </span>
                                  </li>
                              </ul>

                              <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-bold">
                                      {`Phone Number: `}
                                    </span>
                                    <span>
                                      {`${doctor.phone_number_country_code} ${doctor.phone_number}`}
                                    </span>
                                  </li>
                              </ul>

                              <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-bold">
                                      {`Email: `}
                                    </span>
                                    <span>
                                      {`${doctor.email}`}
                                    </span>
                                  </li>
                              </ul>

                              <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-bold">
                                      {`Emergency Contact: `}
                                    </span>
                                    <span>
                                      {`${doctor.emergency_contact_country_code} ${doctor.emergency_contact}`}
                                    </span>
                                  </li>
                              </ul>

                              <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-bold">
                                      {`Specialization: `}
                                    </span>
                                    <span>
                                      {`${doctor.specialization}`}
                                    </span>
                                  </li>
                              </ul>

                              <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-bold">
                                      {`Address: `}
                                    </span>
                                    <span>
                                      {`${doctor.address}`}
                                    </span>
                                  </li>
                              </ul>

                              <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-bold">
                                      {`Experience: `}
                                    </span>
                                    <span>
                                      {`${doctor.years_of_experience}`}
                                    </span>
                                  </li>
                              </ul>

                              <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-bold">
                                      {`Start of Employment: `}
                                    </span>
                                    <span>
                                      {`${doctor.start_of_employment}`}
                                    </span>
                                  </li>
                              </ul>

                              <ul>
                                <p className={`${isDarkMode ? 'text-gray-300 font-bold' : 'text-gray-700 font-bold'}`}>
                                  {`Qualifications:`}
                                </p>
                                <div className="ml-4 bg-slate-900 p-2 rounded">
                                  {doctor.qualifications.map((qualification, index) => (
                                    <li key={index} className={`${isDarkMode ? 'text-white' : 'text-white'}`}>
                                      {qualification}
                                    </li>
                                  ))}
                                </div>
                              </ul>
                                <ul>
                                  <p className={`${isDarkMode ? 'text-gray-300 font-bold' : 'text-gray-700 font-bold'}`}>
                                    {`Patients:`}
                                  </p>
                                  <div className="ml-4 bg-slate-900 p-2 rounded">
                                    {doctor.patients && (
                                      
                                      <div>
                                        {doctor.patients.map((patient) => (
                                          <li key={patient.id} className={`${isDarkMode ? 'text-white' : 'text-white'}`}>
                                            {patient.name} (Age: {patient.age}) - Bill: ${patient.bill} - Status: {patient.paid ? "Paid" : "Unpaid"}
                                          </li>
                                        ))}
                                      </div>
                                    
                                  )}

                                  {!doctor.patients && (
                                    <li className={`${isDarkMode ? 'text-white' : 'text-white'}`}>
                                      {`No Patients Available.`}
                                    </li>
                                  )}
X
                                  </div>
                                </ul>

                              <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300 ml-4 mt-4' : 'text-gray-700 ml-4 mt-4'}`}>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-1"  onClick={() => toogleEditDoctorPrompt(doctor)()} >Edit Doctor</button>
                                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg mx-1">Delete Doctor</button>
                                  </li>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {selectedAction === "deleteDoctor" && (
                  <div className="mt-4">
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>Delete Doctor</h3>
                    <input type="text" placeholder="Doctor ID" className={`p-2 border rounded mb-2 w-full ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-gray-200 border-gray-400 text-gray-900'}`} />
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete Doctor</button>
                  </div>
                )}
                {selectedAction === "viewPatients" && (
                  <div className="mt-4">
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>Patient List by Doctor</h3>
                    <ul className="mt-2">
                      {doctors.map((doctor) => (
                        <li key={doctor.id} className="mb-4">
                          <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-bold`}>{doctor.name}</h4>
                          <ul>
                            {doctor.patients.map((patient) => (
                              <li key={patient.id} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {patient.name} (Age: {patient.age}) - Bill: ${patient.bill} - Status: {patient.paid ? "Paid" : "Unpaid"}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Please select an option from the menu.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default AdminDashboard;
