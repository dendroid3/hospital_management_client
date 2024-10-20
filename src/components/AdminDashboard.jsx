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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAction, setSelectedAction] = useState("viewPatients");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAddDoctorPromptOpen, setIsAddDoctorPromptOpen] = useState(false);
  const [isAddPatientPromptOpen, setIsAddPatientPromptOpen] = useState(false);
  
  useEffect(() => {
    const user_role = localStorage.getItem('user_role');

    if (!user_role) {
      alert("You are not Logged In")
      navigate('/'); 
      return
    }

    if (user_role != 1) {
      alert("Unauthorized")
      navigate('/');  
      return
    }
  }, [navigate]);

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

  
  const [patients, setPatients] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [selectedDoctorToEdit, setSelectedDoctorToEdit] = useState(null);

  const [selectedPatientToEdit, setSelectedPatientToEdit] = useState(null);

  const [isEditDoctorPromptOpen, setIsEditDoctorPromptOpen] = useState(false);

  const [isEditPatientPromptOpen, setIsEditPatientPromptOpen] = useState(false);


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

  const [newPatientDetails, setNewPatientDetails] = useState({
    "first_name": "",
    "last_name": "",
    "date_of_birth": "",
    "gender": "",
    "phone_number": "",
    "email": "",
    "address": "",
    "doctor_id": "",
    "emergency_contact_phone_number": "" 
  })

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

  const handleNewPatientInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatientDetails({ ...newPatientDetails, [name]: value });
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

  const toogleAddPatientPrompt = (bool) => {
    setIsAddPatientPromptOpen(bool)
  };

  const toogleEditDoctorPrompt = (doctor) => {
    if(doctor){
      setSelectedDoctorToEdit(doctor)
    }
    setIsEditDoctorPromptOpen(doctor)
  };

  const toogleEditPatientPrompt = (patient) => {
    if(patient){
      setSelectedPatientToEdit(patient)
    }
    setIsEditPatientPromptOpen(patient)
  }
  
  useEffect(() => {
    if (selectedDoctorToEdit) {
      setEditValues(selectedDoctorToEdit)
    }
  }, [selectedDoctorToEdit]);

  useEffect(() => {
    if (selectedPatientToEdit) {
      setEditPatientValues(selectedPatientToEdit)
    }
  }, [selectedPatientToEdit]);

  const [editValues, setEditValues] = useState({ ...selectedDoctorToEdit });

  const [editPatientValues, setEditPatientValues] = useState({ ...selectedPatientToEdit });

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

  const handleEditPatientInputChange = (e) => {
    const { name, value } = e.target;
    setEditPatientValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const handleLogout = () => {
    const confirmation_message_to_logout = "You are about to logout.\nProceed?"
    if(!confirm(confirmation_message_to_logout)){
      return
    }
    localStorage.setItem('access_token', null);  
    localStorage.setItem('user_id', null);
    localStorage.setItem('user_role', null);

    navigate("/");
  };
  
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    
    const validQualifications = qualifications.filter((q) => q.trim() !== '');

    const { country_code, emergency_country_code, ...restOfDoctorDetails } = doctorDetails;

    const new_doctor = {
      ...restOfDoctorDetails,
      qualifications: validQualifications,
      phone_number_country_code: doctorDetails.country_code.code,
      emergency_contact_country_code: doctorDetails.emergency_country_code.code
    };

    try {
      const response = await fetch('https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//doctors/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_doctor)
      });

      if (response.ok) {
        fetchDoctors()
        toogleAddDoctorPrompt(false)

        setDoctorDetails({
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

        setTimeout(() => {
          alert("Doctor added successfully")
        }, 0);
      } else {
        alert("Could not add doctor")
      }
    } catch (error) {
      alert(error)
    }

    setQualifications(['']);
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//patients/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatientDetails)
      });

      if (response.ok) {
        fetchPatients()
        toogleAddPatientPrompt(false)
        
        setNewPatientDetails({
          "first_name": "",
          "last_name": "",
          "date_of_birth": "",
          "gender": "",
          "phone_number": "",
          "email": "",
          "address": "",
          "doctor_id": "",
          "emergency_contact_phone_number": "" 
        })

        setTimeout(() => {
          alert("Patient added successfully")
        }, 0);
      } else {
        alert("Could not add patient")
      }
    } catch (error) {
      alert(error)
    }
  };

  const handleEditDoctor = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//doctors/${editValues.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editValues)
      });

      if (response.ok) {
        fetchDoctors()
        toogleEditDoctorPrompt(false)
        setTimeout(() => {
          alert("Doctor edited successfully")
        }, 0);
      } else {
        alert("Could not edit doctor")
      }
    } catch (error) {
      alert(error)
    }
  };

  const handleEditPatient = async (e) => {
    e.preventDefault();
    
    try {
      const updatedValues = {
        ...editPatientValues,
        doctor_id: editPatientValues.doctor_id || (editPatientValues.doctor ? editPatientValues.doctor.id : 1) // Default to 1 if doctor is not found
      };

      const response = await fetch(`https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//patients/${editPatientValues.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues)
      });

      if (response.ok) {
        fetchPatients()
        // toogleEditPatientPrompt(false)
        setTimeout(() => {
          alert("Patient edited successfully")
        }, 0);
      } else {
        alert("Could not edit patient")
      }
    } catch (error) {
      alert(error)
    }
  };

  
  const handleDeleteDoctor = async (doctor) => {
    const confirmation_message_to_delete = `You are about to delete ${doctor.title}. ${doctor.surname}, ${doctor.first_name}`

    if(!confirm(confirmation_message_to_delete)) return

    try {
      const response = await fetch(`https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//doctors/${doctor.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });


      if (response.ok) {
        fetchDoctors()
        setTimeout(() => {
          alert("Doctor deleted successfully")
        }, 0);
      } else {
        alert("Could not delete doctor")
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleDeletePatient = async (patient) => {
    const confirmation_message_to_delete = `You are about to delete  ${patient.first_name} ${patient.last_name} (${patient.gender}).\nAll their records will be deleted. Proceed?`

    if(!confirm(confirmation_message_to_delete)) return

    try {
      const response = await fetch(`https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//patients/${patient.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });


      if (response.ok) {
        fetchPatients()

        setTimeout(() => {
          alert("Patient deleted successfully")
        }, 0);
      } else {
        alert("Could not delete pa")
      }
    } catch (error) {
      alert(error)
    }
  }

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
// const isQualificationsValid = qualifications.every(q => q.trim().length >= 10 || q === ''); // Check each qualification

const isEditTitleValid = editValues.title ? editValues.title.trim().length > 0 : false;
const isEditFirstNameValid = editValues.first_name ? editValues.first_name.trim().length > 2 : false;
const isEditSurnameValid = editValues.surname ? isEditFirstNameValid && editValues.surname.trim().length > 2 : false;
const isEditGenderValid = editValues.gender ? isEditSurnameValid && editValues.gender.trim().length > 0 : false;
const isEditDateOfBirthValid = editValues.date_of_birth ? isEditGenderValid && editValues.date_of_birth.length > 0 : false;

const jsonString = JSON.stringify(editValues);

const parsedObject = JSON.parse(jsonString);

const selectedEditCountryPhoneNumber = countries.find(country => country.code === parsedObject.phone_number_country_code);

const isEditPhoneValid = (
  isEditDateOfBirthValid 
  && editValues.phone_number !== '' 
  && editValues.phone_number.length === selectedEditCountryPhoneNumber.digits_length  //editValues.country_code.digits_length
);

const isEditEmailValid = isEditPhoneValid && editValues.email.trim().length > 0 && emailPattern.test(editValues.email.trim());

const isEditEmergencyContactValid = (
  isEditEmailValid 
  && editValues.emergency_contact !== '' 
  // && editValues.emergency_contact.length === parsedObject.emergency_country_code.digits_length
);

const isEditSpecializationValid = isEditEmergencyContactValid && editValues.specialization.length > 5;
const isEditAddressValid = isEditSpecializationValid && editValues.address.length > 0;
const isEditExperienceValid = true//isEditAddressValid && editValues.years_of_experience.trim().length > 0;
const isEditStartEmploymentValid = true//isEditExperienceValid && editValues.years_of_experience.trim().Editlength > 0;
const isQualificationsValid = qualifications.every(q => q.trim().length >= 10 || q === ''); 

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
  
  // Function to be called on mount
  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//doctors/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDoctors(result)
      } else {
        throw new Error('Failed to fetch doctors.');
      }
    } catch (error) {
      // setMessage(`Error: ${error.message}`);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch('https://geographical-euphemia-wazo-tank-f4308d3f.koyeb.app//patients/', {
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
      // setMessage(`Error: ${error.message}`);
    }
  };

  // useEffect to call fetchData on component mount
  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []); // Empty dependency array means this effect runs once after initial render

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
                  {selectedAction.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/\b\w/g, str => str.toUpperCase()).split(" ")[1]}
                </h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  You selected to {selectedAction.replace(/([A-Z])/g, ' $1').toLowerCase()}.
                </p>

                {/* Implement functionality for each action */}
                {selectedAction === "viewDoctors" && (
                  <div>
                    <div className="my-2">
                      <button onClick={() => toogleAddDoctorPrompt(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg mx-1">
                        Add Doctor  
                      </button>
                    </div>

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
                                <div className="mx-4 bg-slate-900 p-2 rounded">
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
                                  <div className="mx-4 bg-slate-900 p-2 rounded">
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
                                  </div>
                                </ul>

                                <ul>
                                  <li className={`${isDarkMode ? 'text-gray-300 ml-4 mt-4' : 'text-gray-700 ml-4 mt-4'}`}>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-1"  onClick={() => toogleEditDoctorPrompt(doctor)} >Edit Doctor</button>
                                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg mx-1" onClick={() => handleDeleteDoctor(doctor)} >Delete Doctor</button>
                                  </li>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Ender add doc prompt */}
                    {isAddDoctorPromptOpen && (
                    <div className="fixed inset-x-0 top-5 bottom-5 flex items-center justify-center z-50">
                      <div className="bg-slate-600 rounded-lg p-6 shadow-lg w-11/12 max-w-lg h-full overflow-y-auto relative">
                        <div>
                          <h1 className="absolute top-4 text-3xl mb-4 text-white">{`Add Doctor`}</h1>

                          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => toogleAddDoctorPrompt(false)}>
                            &times; {/* This is the "X" symbol */}
                          </div>
                        </div>
                        <ScrollableWrapper className="bg-white rounded">
                        
                          <StyledForm className="bg-white p-6 text rounded shadow-md mt-6" onSubmit={handleAddDoctor}>
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
                         <div>
                          <h1 className="absolute top-4 text-3xl mb-4 text-white">{`Edit ${editValues.title}. ${editValues.surname}, ${editValues.first_name}`}</h1>

                          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => toogleEditDoctorPrompt(false)}>
                            &times; {/* This is the "X" symbol */}
                          </div>
                         </div>
                          <ScrollableWrapper className="bg-white rounded">
                            <StyledForm className="bg-white p-6 rounded shadow-md mt-6" onSubmit={handleEditDoctor}>
                              <div>
                                <div>
                                  <label className="block mb-0">Title:</label>
                                  <input
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="text"
                                    name="title"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.title}
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">First Name:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isEditTitleValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="text"
                                    name="first_name"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.first_name}
                                    disabled={!isEditTitleValid} // Enable if title is valid
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Surname:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isEditFirstNameValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="text"
                                    name="surname"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.surname}
                                    disabled={!isEditFirstNameValid} // Enable if first name is valid
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Gender:</label>
                                  <select
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    name="gender"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.gender}
                                    disabled={!isEditSurnameValid} // Enable if surname is valid
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
                                      ${!isEditGenderValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="date"
                                    name="date_of_birth"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.date_of_birth}
                                    disabled={!isEditGenderValid} // Enable if gender is selected
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0"> Phone Number: </label>
                                  <div className="flex items-center mt-1">
                                    <select
                                      className={`
                                        border border-gray-600 rounded-l p-2 bg-gray-800 text-green-500 w-1/5 
                                        ${!isEditDateOfBirthValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                        focus:border-blue-500 focus:ring focus:ring-blue-200
                                      `}
                                      value={editValues.phone_number_country_code}
                                      onChange={(e) => {
                                        const selectedCountry = countries.find(country => country.code === e.target.value);
                                        setDoctorDetails(prevDetails => ({ ...prevDetails, country_code: selectedCountry }));
                                      }}
                                      disabled={!isEditDateOfBirthValid} // Enable if date of birth is valid
                                    >
                                      {countries.map((country) => (
                                        <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                          {country.code} {country.name} 
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      className={`ml-1 p-2 border border-gray-600 rounded-r w-4/5 
                                                  ${!isEditDateOfBirthValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                                  focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="number"
                                      name="phone_number"
                                      onChange={handleEditDoctorInputChange}
                                      value={editValues.phone_number}
                                      disabled={!isEditDateOfBirthValid} // Enable if date of birth is valid
                                      required
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Email:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isEditPhoneValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="email"
                                    name="email"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.email}
                                    disabled={!isEditPhoneValid} // Enable if phone number is valid
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
                                        ${!isEditEmailValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                        focus:border-blue-500 focus:ring focus:ring-blue-200
                                      `}
                                      disabled={!isEditEmailValid} // Enable if date of birth is valid
                                      onChange={(e) => {
                                        const selectedEmergencyCountry = countries.find(country => country.code === e.target.value);
                                        setDoctorDetails(prevDetails => ({ ...prevDetails, emergency_country_code: selectedEmergencyCountry }));
                                      }}
                                      value={editValues.emergency_contact_country_code}
                                    >
                                      {countries.map((country) => (
                                        <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                          {country.code} {country.name} 
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      className={`ml-1 p-2 border border-gray-600 rounded-r w-4/5 
                                                  ${!isEditEmailValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')}
                                                  focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="number"
                                      name="emergency_contact"
                                      onChange={handleEditDoctorInputChange}
                                      value={editValues.emergency_contact}
                                      placeholder={`${doctorDetails.emergency_country_code.digits_length} digits`}
                                      disabled={!isEditEmailValid} // Enable if date of birth is valid
                                      required
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Specialization:</label>
                                  <select
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isEditEmergencyContactValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    name="specialization"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.specialization}
                                    disabled={!isEditEmergencyContactValid} // Enable if emergency contact is valid
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
                                      ${!isEditSpecializationValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="text"
                                    name="address"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.address}
                                    disabled={!isEditSpecializationValid} // Enable if specialization is selected
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Years of Experience:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isEditAddressValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="number"
                                    name="years_of_experience"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.years_of_experience}
                                    disabled={!isEditAddressValid}
                                    // Enable if address is valid
                                    required
                                  />
                                </div>
                                    
                                <div>
                                  <label className="block mt-3 mb-0">Start of Employment:</label>
                                  <input
                                    className={
                                      `mt-1 p-2 border border-gray-600 rounded w-full 
                                      ${!isEditExperienceValid ? 'bg-gray-500 text-gray-500' : (isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black')} 
                                      focus:border-blue-500 focus:ring focus:ring-blue-200`
                                    }
                                    type="date"
                                    name="start_of_employment"
                                    onChange={handleEditDoctorInputChange}
                                    value={editValues.start_of_employment}
                                    disabled={!isEditExperienceValid} // Enable if years of experience is valid
                                    required
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
                    )}
                  </div>
                )}

                {selectedAction === "viewPatients" && 
                (
                  <div>
                    <div className="my-2">
                      <button onClick={() => toogleAddPatientPrompt(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg mx-1">
                        Add Patient  
                      </button>
                    </div>

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
                                  {`Doctor:`}
                                </p>
                                <div className="mx-4 bg-slate-900 p-2 rounded">
                                  <ul>
                                    {Object.entries(patient.doctor).map(([key, value], index) => (
                                      <li key={index} className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                                         {key !== "id" && 
                                        (
                                          <span>
                                            {`${key}: ${value}`}
                                          </span>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </ul>
                              <ul>
                                <li className={`${isDarkMode ? 'text-gray-300 ml-4 mt-4' : 'text-gray-700 ml-4 mt-4'}`}>
                                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-1"  onClick={() => toogleEditPatientPrompt(patient)} >Edit Patient</button>
                                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg mx-1" onClick={() => handleDeletePatient(patient)()} >Delete Patient</button>
                                </li>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Ender add doc prompt */}
                    {isAddPatientPromptOpen && (
                      <div className="fixed inset-x-0 top-5 bottom-5 flex items-center justify-center z-50">
                        <div className="bg-slate-600 rounded-lg p-6 shadow-lg w-11/12 max-w-lg h-full overflow-y-auto relative">
                          <div>
                            <h1 className="absolute top-4 text-3xl mb-4 text-white">{`Add Patient`}</h1>

                            <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => toogleAddPatientPrompt(false)}>
                              &times; {/* This is the "X" symbol */}
                            </div>
                          </div>
                          <ScrollableWrapper className="bg-white rounded">
                          
                            <StyledForm className="bg-white p-6 text rounded shadow-md mt-6" onSubmit={handleAddPatient}>
                              <div>
                                <div>
                                  <label className="block mb-0">First Name:</label>
                                  <input
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="text"
                                    name="first_name"
                                    value={newPatientDetails.first_name}
                                    onChange={handleNewPatientInputChange}
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Last Name:</label>
                                  <input
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="text"
                                    name="last_name"
                                    value={newPatientDetails.last_name}
                                    onChange={handleNewPatientInputChange}
                                    required
                                  />
                                </div>

                                <div>
                                </div>
                                <div>
                                  <label className="block mt-3 mb-0">Gender:</label>
                                  <select
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    name="gender"
                                    value={newPatientDetails.gender}
                                    onChange={handleNewPatientInputChange}
                                    required
                                  >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Date of Birth:</label>
                                  <input
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="date"
                                    name="date_of_birth"
                                    value={newPatientDetails.date_of_birth}
                                    onChange={handleNewPatientInputChange}
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0"> Phone Number: </label>
                                  <div className="flex items-center mt-1">
                                    <select
                                      className={`mt-1 p-2 border border-gray-600 rounded w-1/5 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      onChange={(e) => {
                                        const selectedCountry = countries.find(country => country.code === e.target.value);
                                        setDoctorDetails(prevDetails => ({ ...prevDetails, country_code: selectedCountry }));
                                      }}
                                      disabled
                                      value="`+254`"
                                    >
                                      {countries.map((country) => (
                                        <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                          {country.code} {country.name} 
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      className={`mt-1 p-2 border border-gray-600 rounded w-4/5 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="number"
                                      name="phone_number"
                                      value={newPatientDetails.phone_number}
                                      onChange={handleNewPatientInputChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Email:</label>
                                  <input
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="email"
                                    name="email"
                                    value={newPatientDetails.email}
                                    onChange={handleNewPatientInputChange}
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
                                      className={`mt-1 p-2 border border-gray-600 rounded w-1/5 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      onChange={(e) => {
                                        const selectedEmergencyCountry = countries.find(country => country.code === e.target.value);
                                        setDoctorDetails(prevDetails => ({ ...prevDetails, emergency_country_code: selectedEmergencyCountry }));
                                      }}
                                      disabled
                                      value="`+254`"
                                    >
                                      {countries.map((country) => (
                                        <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                          {country.code} {country.name} 
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      className={`mt-1 p-2 border border-gray-600 rounded w-4/5 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="number"
                                      name="emergency_contact_phone_number"
                                      value={newPatientDetails.emergency_contact_phone_number}
                                      onChange={handleNewPatientInputChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Address:</label>
                                  <input
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    type="text"
                                    name="address"
                                    value={newPatientDetails.address}
                                    onChange={handleNewPatientInputChange}
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block mt-3 mb-0">Assign Doctor:</label>
                                  <select
                                    className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                    name="doctor_id"
                                    value={newPatientDetails.doctor_id}
                                    onChange={handleNewPatientInputChange}
                                    required
                                  >
                                    <option value="">Assign Doctor</option>
                                      {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id} className="bg-gray-800 text-white hover:text-green-500">
                                          {`${doctor.id}: ${doctor.title}. ${doctor.surname}, ${doctor.first_name} (${doctor.gender})`}
                                        </option>
                                      ))}
                                  </select>
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

                    {isEditPatientPromptOpen && (
                      <div className="fixed inset-x-0 top-5 bottom-5 flex items-center justify-center z-50">
                        <div className="bg-slate-600 rounded-lg p-6 shadow-lg w-11/12 max-w-lg h-full overflow-y-auto relative">
                         {/* Close button */}
                         <div>
                          <h1 className="absolute top-4 text-3xl mb-4 text-white">{`Edit ${selectedPatientToEdit.id}: ${selectedPatientToEdit.first_name} ${selectedPatientToEdit.last_name}`}</h1>

                          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => toogleEditPatientPrompt(false)}>
                            &times; {/* This is the "X" symbol */}
                          </div>
                         </div>
                          <ScrollableWrapper className="bg-white rounded">
                            <StyledForm className="bg-white p-6 rounded shadow-md mt-6" onSubmit={handleEditPatient}>
                              <div>
                                  <div>
                                    <label className="block mb-0">First Name:</label>
                                    <input
                                      className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="text"
                                      name="first_name"
                                      value={editPatientValues.first_name}
                                      onChange={handleEditPatientInputChange}
                                      required
                                    />
                                  </div>

                                  <div>
                                    <label className="block mt-3 mb-0">Last Name:</label>
                                    <input
                                      className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="text"
                                      name="last_name"
                                      value={editPatientValues.last_name}
                                      onChange={handleEditPatientInputChange}
                                      required
                                    />
                                  </div>

                                  <div>
                                  </div>
                                  <div>
                                    <label className="block mt-3 mb-0">Gender:</label>
                                    <select
                                      className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      name="gender"
                                      value={editPatientValues.gender}
                                      onChange={handleEditPatientInputChange}
                                      required
                                    >
                                      <option value="">Select Gender</option>
                                      <option value="male">Male</option>
                                      <option value="female">Female</option>
                                      <option value="other">Other</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block mt-3 mb-0">Date of Birth:</label>
                                    <input
                                      className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="date"
                                      name="date_of_birth"
                                      value={editPatientValues.date_of_birth}
                                      onChange={handleEditPatientInputChange}
                                      required
                                    />
                                  </div>

                                  <div>
                                    <label className="block mt-3 mb-0"> Phone Number: </label>
                                    <div className="flex items-center mt-1">
                                      <select
                                        className={`mt-1 p-2 border border-gray-600 rounded w-1/5 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                        onChange={(e) => {
                                          const selectedCountry = countries.find(country => country.code === e.target.value);
                                          setDoctorDetails(prevDetails => ({ ...prevDetails, country_code: selectedCountry }));
                                        }}
                                        disabled
                                        value="`+254`"
                                      >
                                        {countries.map((country) => (
                                          <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                            {country.code} {country.name} 
                                          </option>
                                        ))}
                                      </select>
                                      <input
                                        className={`mt-1 p-2 border border-gray-600 rounded w-4/5 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                        type="number"
                                        name="phone_number"
                                        value={editPatientValues.phone_number}
                                        onChange={handleEditPatientInputChange}
                                        placeholder={`${doctorDetails.country_code.digits_length} digits`}
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block mt-3 mb-0">Email:</label>
                                    <input
                                      className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="email"
                                      name="email"
                                      value={editPatientValues.email}
                                      onChange={handleEditPatientInputChange}
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
                                        className={`mt-1 p-2 border border-gray-600 rounded w-1/5 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                        onChange={(e) => {
                                          const selectedEmergencyCountry = countries.find(country => country.code === e.target.value);
                                          setDoctorDetails(prevDetails => ({ ...prevDetails, emergency_country_code: selectedEmergencyCountry }));
                                        }}
                                        disabled
                                        value="`+254`"
                                      >
                                        {countries.map((country) => (
                                          <option key={country.name} value={country.code} className="bg-gray-800 text-white hover:text-green-500">
                                            {country.code} {country.name} 
                                          </option>
                                        ))}
                                      </select>
                                      <input
                                        className={`mt-1 p-2 border border-gray-600 rounded w-4/5 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                        type="number"
                                        name="emergency_contact_phone_number"
                                        value={editPatientValues.emergency_contact_phone_number}
                                        onChange={handleEditPatientInputChange}
                                        placeholder={`${doctorDetails.emergency_country_code.digits_length} digits`}
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block mt-3 mb-0">Address:</label>
                                    <input
                                      className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      type="text"
                                      name="address"
                                      value={editPatientValues.address}
                                      onChange={handleEditPatientInputChange}
                                      required
                                    />
                                  </div>

                                  <div>
                                    <label className="block mt-3 mb-0">Assign Doctor:</label>
                                    <select
                                      className={`mt-1 p-2 border border-gray-600 rounded w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:border-blue-500 focus:ring focus:ring-blue-200`}
                                      name="doctor_id"
                                      // value={editPatientValues.doctor_id}
                                      // value={editPatientValues.doctor_id || (doctors.find(doc => doc.id === editPatientValues.doctor.id)?.id || '')}
                                      value={editPatientValues.doctor_id || (editPatientValues.doctor && doctors.find(doc => doc.id === editPatientValues.doctor.id)?.id) || ''}
                                      onChange={handleEditPatientInputChange}
                                      required
                                    >
                                      <option value="">Assign Doctor</option>
                                        {doctors.map((doctor) => (
                                          <option key={doctor.id} value={doctor.id} className="bg-gray-800 text-white hover:text-green-500">
                                            {`${doctor.id}: ${doctor.title}. ${doctor.surname}, ${doctor.first_name} (${doctor.gender})`}
                                          </option>
                                        ))}
                                    </select>
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
                  </div>
                )
                }
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
