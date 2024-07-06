

// import React, { useEffect, useState } from 'react';
// import './DoctorDashboard.css';
// import mybooking from '../../Asset/app-images/mybooking.png';
// import setting from '../../Asset/app-images/setting.png';
// import logout from '../../Asset/app-images/logout.png';
// import manage from '../../Asset/app-images/manage.png';
// import { signOut } from 'firebase/auth';
// import { useUser } from '../../contexts/UserContext';
// import { useNavigate } from 'react-router-dom';
// import { auth, firestore } from '../../firebase';
// import { collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
// import 'react-day-picker/dist/style.css';
// import Footer from "../../components/Footer/footer";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedin,
//   FaArrowRight,
// } from 'react-icons/fa';
// import { toast, ToastContainer } from "react-toastify";
// import { parse } from 'date-fns';
// import { format } from 'date-fns';

// const DoctorDashboard = () => {
//   const [selectedAction, setSelectedAction] = useState('patients');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [doctorName, setDoctorName] = useState('');
//   const [doctorPhone, setDoctorPhone] = useState('');
//   const [doctorPassword, setDoctorPassword] = useState('');
//   const { user } = useUser();
//   const { setUser } = useUser();
//   const navigate = useNavigate();
//   const [activeButton, setActiveButton] = useState('All status');
//   const [patientData, setPatientData] = useState([]);

//   useEffect(() => {
//     const fetchDoctorData = async () => {
//       try {
//         if (!user || !user.uid) {
//           console.error("User is not set correctly or does not have a uid");
//           return;
//         }

//         const doctorDocRef = doc(firestore, "Doctors", user.uid);
//         const doctorDoc = await getDoc(doctorDocRef);

//         if (!doctorDoc.exists()) {
//           console.error("No doctor found with the given uid");
//           return;
//         }

//         const doctorData = doctorDoc.data();
//         setDoctorName(doctorData.fullname);
//         setProfilePicture(doctorData.image);
//         setDoctorPhone(doctorData.phone);
//         setDoctorPassword(doctorData.password);

//         const today = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight
//         const appointmentsQuery = query(
//           collection(firestore, "ClinicAppointments"),
//           where("doctorId", "==", user.uid)
//         );

//         const appointmentsSnapshot = await getDocs(appointmentsQuery);
//         const appointments = appointmentsSnapshot.docs
//           .map(doc => doc.data())
//           .filter(appointment => {
//             const appointmentDate = parse(appointment.day, "EEEE, MMMM do yyyy", new Date());
//             return appointmentDate >= today;
//           });

//         setPatientData(appointments);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (user && user.uid) {
//       fetchDoctorData();
//     }
//   }, [user]);

//   const handleActionClick = action => {
//     setSelectedAction(action);
//   };

//   const handleButtonClick = status => {
//     setActiveButton(status);
//   };

//   const handleProfilePictureChange = event => {
//     if (event.target.files && event.target.files[0]) {
//       setProfilePicture(URL.createObjectURL(event.target.files[0]));
//     }
//   };

//   const handleSaveSettings = async (event) => {
//     event.preventDefault();
//     try {
//       if (!user || !user.uid) {
//         console.error("User is not set correctly or does not have a uid");
//         return;
//       }

//       const name = event.target.elements.doctorName.value;
//       const password = event.target.elements.doctorPassword.value;
//       const phone = event.target.elements.doctorPhone.value;

//       const doctorDocRef = doc(firestore, "Doctors", user.uid);
//       await updateDoc(doctorDocRef, {
//         fullname: name,
//         password: password,
//         phone: phone,
//         image: profilePicture
//       });

//       setDoctorName(name);
//       setDoctorPassword(password);
//       setDoctorPhone(phone);
//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Error updating profile.");
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       if (!user || !user.uid) {
//         console.error("User is not set correctly or does not have a uid");
//         return;
//       }

//       const doctorDocRef = doc(firestore, "Doctors", user.uid);
//       await deleteDoc(doctorDocRef);
      
//       await signOut(auth);
//       localStorage.removeItem('user');
//       setUser(null);
//       navigate('/');
//       toast.success("Account deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       toast.error("Error deleting account.");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       localStorage.removeItem('user');
//       setUser(null);
//       navigate('/');
//     } catch (error) {
//       console.error('Error logging out: ', error);
//     }
//   };

//   return (
//     <div>
//       <div className="doctor-dashboard3">
//         <div className="doctor-container3">
//           <div
//             className="Docitems3"
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <div
//               className="profile-detiles3"
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 gap: '32px',
//               }}
//             >
//               <img
//                 style={{
//                   width: '100px',
//                   height: '100px',
//                   objectFit: 'cover',
//                   borderRadius: '100px',
//                   border: '2px solid #e1e1e1',
//                   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//                 }}
//                 src={profilePicture}
//                 alt="Profile"
//               />

//               <h4 style={{ margin: '4px ', color: '#4393a7' }}>
//                 {doctorName}
//               </h4>
//             </div>
//             <ul className="ulitems13">
//               <li onClick={() => handleActionClick('patients')}>
//                 <img
//                   src={manage}
//                   alt="#"
//                   style={{ width: '30px', height: '30px' }}
//                 />
//                 Manage Patients
//               </li>
//               <li onClick={() => handleActionClick('Profile settings')}>
//                 <img
//                   src={setting}
//                   alt="#"
//                   style={{ width: '30px', height: '30px' }}
//                 />
//                 Profile Settings
//               </li>
//               <li onClick={handleLogout}>
//                 <img
//                   src={logout}
//                   alt="#"
//                   style={{ width: '30px', height: '30px' }}
//                 />
//                 Logout
//               </li>
//             </ul>
//           </div>
//           <div className="section-content23">
//             {selectedAction === 'patients' && (
//               <div className="table-container3">
//                 <div className="container-doctor3">
//                   <div className="content3">
//                     <div className="header3">
//                       <h1>Patient list</h1>
//                     </div>
//                     <div className="filter-bar3">
//                       <button
//                         className={activeButton === 'All status' ? 'active' : ''}
//                         onClick={() => handleButtonClick('All status')}
//                       >
//                         All status
//                       </button>
//                       <button
//                         className={activeButton === 'Adult' ? 'active' : ''}
//                         onClick={() => handleButtonClick('Adult')}
//                       >
//                         Adult
//                       </button>
//                       <button
//                         className={activeButton === 'Pediatric' ? 'active' : ''}
//                         onClick={() => handleButtonClick('Pediatric')}
//                       >
//                         Pediatric
//                       </button>
//                     </div>
//                     <div
//                       className="patient-list3"
//                       style={{ fontFamily: 'tajawal', fontSize: '15px' }}
//                     >
//                       {patientData.length === 0 ? (
//                         <p
//                           style={{
//                             textAlign: 'center',
//                             color: '#6a6a6a',
//                             fontWeight: '400',
//                             fontSize: '20px',
//                           }}
//                         >
//                           No patient for today
//                         </p>
//                       ) : (
//                         patientData
//                           .filter(patient => activeButton === 'All status' || patient.patientType === activeButton)
//                           .map((patient, index) => (
//                             <div className={'patient-item3'} key={index}>
//                               <div className="patient-info3">
//                                 <div className="patient-details3">
//                                   <div
//                                     style={{
//                                       display: 'flex',
//                                       flexDirection: 'column',
//                                       justifyContent: 'center',
//                                     }}
//                                   >
//                                     <p
//                                       style={{
//                                         color: '#6a6a6a',
//                                         fontWeight: '500',
//                                         marginBottom: '0px',
//                                       }}
//                                     >
//                                       {patient.patientName}
//                                     </p>
//                                     <p style={{ marginTop: 'revert' }}>
//                                       Clinic: {patient.clinicName}
//                                     </p>
//                                     <p style={{ marginTop: 'revert' }}>
//                                       {patient.day} | {patient.time}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="patient-time3">
//                                   <button className="edit-button">Edit</button>
//                                   <button>Delete</button>
//                                 </div>
//                                 <button
//                                   style={{
//                                     border: 'none',
//                                     borderRadius: '10px',
//                                     padding: '0px',
//                                     backgroundColor: 'white',
//                                     color: '#4393a7',
//                                     fontSize:'18px',
//                                     fontWeight: '500',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: '4px',
//                                   }}
//                                 >
//                                   More Details <FaArrowRight />
//                                 </button>
//                               </div>
//                             </div>
//                           ))
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {selectedAction === 'Profile settings' && (
//               <div className="form-container3">
//                 <div
//                   className="profile-detiles3"
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     width: '30%',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     padding: '20px',
//                     borderRadius: '10px',
//                     border: '1px solid #e0e0e0',
//                     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//                   }}
//                 >
//                   <img
//                     style={{
//                       width: '100%',
//                       height: '400px',
//                       objectFit: 'cover',
//                       borderRadius: '12px',
//                       border: '2px solid #e1e1e1',
//                       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//                     }}
//                     src={profilePicture}
//                     alt="Profile"
//                   />
//                   <div style={{ marginTop: '10px ' }}>
//                     <h3 style={{ margin: '4px ', color: '#4393a7' }}>
//                       {doctorName}
//                     </h3>
//                     <p
//                       style={{
//                         margin: '4px ',
//                         fontFamily: 'tajawal',
//                         fontSize: '15px',
//                         fontStyle: 'italic',
//                       }}
//                     >
//                       Phone: {doctorPhone}
//                     </p>
//                   </div>
//                   <div className="social-media-icons3">
//                     <a
//                       href="https://facebook.com/doctor"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaFacebook />
//                     </a>
//                     <a
//                       href="https://twitter.com/doctor"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaTwitter />
//                     </a>
//                     <a
//                       href="https://instagram.com/doctor"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaInstagram />
//                     </a>
//                     <a
//                       href="https://linkedin.com/in/doctor"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <FaLinkedin />
//                     </a>
//                   </div>
//                 </div>
//                 <form
//                   onSubmit={handleSaveSettings}
//                   style={{
//                     width: '60%',
//                     height: 'fit-content',
//                     padding: '20px',
//                     borderRadius: '10px',
//                     border: '1px solid #e0e0e0',
//                     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//                     fontFamily: 'tajawal',
//                     margin: 'auto',
//                   }}
//                 >
//                   <label
//                     style={{
//                       marginTop: '0px',
//                       marginBottom: '0px',
//                     }}
//                   >
//                     Change Name:
//                     <input
//                       type="text"
//                       name="doctorName"
//                       defaultValue={doctorName}
//                       required
//                       style={{
//                         borderRadius: '10px',
//                         border: '1px solid #e0e0e0',
//                         marginTop: '4px',
//                       }}
//                     />
//                   </label>

//                   <label
//                     style={{
//                       marginTop: '0px',
//                       marginBottom: '0px',
//                     }}
//                   >
//                     Change Password:
//                     <input
//                       type="password"
//                       name="doctorPassword"
//                       defaultValue={doctorPassword}
//                       required
//                       style={{
//                         borderRadius: '10px',
//                         border: '1px solid #e0e0e0',
//                         marginTop: '4px',
//                       }}
//                     />
//                   </label>
//                   <label
//                     style={{
//                       marginTop: '0px',
//                       marginBottom: '0px',
//                     }}
//                   >
//                     Change Phone:
//                     <input
//                       type="tel"
//                       name="doctorPhone"
//                       defaultValue={doctorPhone}
//                       required
//                       style={{
//                         borderRadius: '10px',
//                         border: '1px solid #e0e0e0',
//                         marginTop: '4px',
//                       }}
//                     />
//                   </label>
//                   <label
//                     style={{
//                       marginTop: '0px',
//                       marginBottom: '0px',
//                     }}
//                   >
//                     Change Profile Picture:
//                     <input
//                       type="file"
//                       name="profilePicture"
//                       onChange={handleProfilePictureChange}
//                       style={{
//                         borderRadius: '10px',
//                         border: '1px solid #e0e0e0',
//                         marginTop: '4px',
//                       }}
//                     />
//                   </label>
//                   <label
//                     style={{
//                       marginTop: '0px',
//                       marginBottom: '0px',
//                     }}
//                   >
//                     Notification Preferences:
//                     <select
//                       name="notificationPreferences"
//                       style={{
//                         borderRadius: '10px',
//                         border: '1px solid #e0e0e0',
//                         marginTop: '4px',
//                       }}
//                     >
//                       <option value="email">Email</option>
//                       <option value="sms">SMS</option>
//                       <option value="none">None</option>
//                     </select>
//                   </label>
//                   <li onClick={handleDeleteAccount} style={{ color: 'red' }}>
//                     Delete Account
//                   </li>
//                   <button
//                     type="submit"
//                     className="savebutton3"
//                     style={{
//                       width: '20%',
//                       border: '1px solid #e0e0e0',
//                       borderRadius: '10px',
//                       padding: '10px',
//                       marginTop: '10px',
//                       backgroundColor: '#4393a7',
//                       color: 'white',
//                       fontWeight: '500',
//                     }}
//                   >
//                     Save
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <ToastContainer />
//     </div>
//   );
// };

// export default DoctorDashboard;


import React, { useEffect, useState } from 'react';
import './DoctorDashboard.css';
import mybooking from '../../Asset/app-images/mybooking.png';
import setting from '../../Asset/app-images/setting.png';
import logout from '../../Asset/app-images/logout.png';
import manage from '../../Asset/app-images/manage.png';
import { signOut } from 'firebase/auth';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import 'react-day-picker/dist/style.css';
import Footer from "../../components/Footer/footer";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
} from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import { parse } from 'date-fns';
import { format } from 'date-fns';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DoctorDashboard = () => {
  const [selectedAction, setSelectedAction] = useState('patients');
  const [profilePicture, setProfilePicture] = useState(null);
  const [doctorName, setDoctorName] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');
  const { user } = useUser();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('All status');
  const [patientData, setPatientData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        if (!user || !user.uid) {
          console.error("User is not set correctly or does not have a uid");
          return;
        }

        const doctorDocRef = doc(firestore, "Doctors", user.uid);
        const doctorDoc = await getDoc(doctorDocRef);

        if (!doctorDoc.exists()) {
          console.error("No doctor found with the given uid");
          return;
        }

        const doctorData = doctorDoc.data();
        setDoctorName(doctorData.fullname);
        setProfilePicture(doctorData.image);
        setDoctorPhone(doctorData.phone);
        setDoctorPassword(doctorData.password);

        const today = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight
        const appointmentsQuery = query(
          collection(firestore, "ClinicAppointments"),
          where("doctorId", "==", user.uid)
        );

        const appointmentsSnapshot = await getDocs(appointmentsQuery);
        const appointments = appointmentsSnapshot.docs
          .map(doc => doc.data())
          .filter(appointment => {
            const appointmentDate = parse(appointment.day, "EEEE, MMMM do yyyy", new Date());
            return appointmentDate >= today;
          });

        setPatientData(appointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user && user.uid) {
      fetchDoctorData();
    }
  }, [user]);

  const handleActionClick = action => {
    setSelectedAction(action);
  };

  const handleButtonClick = status => {
    setActiveButton(status);
  };

  const handleProfilePictureChange = event => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSaveSettings = async (event) => {
    event.preventDefault();
    try {
      if (!user || !user.uid) {
        console.error("User is not set correctly or does not have a uid");
        return;
      }

      const name = event.target.elements.doctorName.value;
      const password = event.target.elements.doctorPassword.value;
      const phone = event.target.elements.doctorPhone.value;

      const doctorDocRef = doc(firestore, "Doctors", user.uid);
      await updateDoc(doctorDocRef, {
        fullname: name,
        password: password,
        phone: phone,
        image: profilePicture
      });

      setDoctorName(name);
      setDoctorPassword(password);
      setDoctorPhone(phone);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user || !user.uid) {
        console.error("User is not set correctly or does not have a uid");
        return;
      }

      const doctorDocRef = doc(firestore, "Doctors", user.uid);
      await deleteDoc(doctorDocRef);
      
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
      toast.success("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error deleting account.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const openModal = async (patientId) => {
    try {
      const patientDocRef = doc(firestore, "Patients", patientId);
      const patientDoc = await getDoc(patientDocRef);
      if (patientDoc.exists()) {
        setSelectedPatient(patientDoc.data());
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPatient(null);
  };

  const renderPatientDetails = (details) => {
    return Object.entries(details).map(([key, value]) => (
      <div key={key} style={{ marginBottom: '10px' }}>
        <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
      </div>
    ));
  };

  return (
    <div>
      <div className="doctor-dashboard3">
        <div className="doctor-container3">
          <div
            className="Docitems3"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              className="profile-detiles3"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '32px',
              }}
            >
              <img
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '100px',
                  border: '2px solid #e1e1e1',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
                src={profilePicture}
                alt="Profile"
              />

              <h4 style={{ margin: '4px ', color: '#4393a7' }}>
                {doctorName}
              </h4>
            </div>
            <ul className="ulitems13">
              <li onClick={() => handleActionClick('patients')}>
                <img
                  src={manage}
                  alt="#"
                  style={{ width: '30px', height: '30px' }}
                />
                Manage Patients
              </li>
              <li onClick={() => handleActionClick('Profile settings')}>
                <img
                  src={setting}
                  alt="#"
                  style={{ width: '30px', height: '30px' }}
                />
                Profile Settings
              </li>
              <li onClick={handleLogout}>
                <img
                  src={logout}
                  alt="#"
                  style={{ width: '30px', height: '30px' }}
                />
                Logout
              </li>
            </ul>
          </div>
          <div className="section-content23">
            {selectedAction === 'patients' && (
              <div className="table-container3">
                <div className="container-doctor3">
                  <div className="content3">
                    <div className="header3">
                      <h1>Patient list</h1>
                    </div>
                    <div className="filter-bar3">
                      <button
                        className={activeButton === 'All status' ? 'active' : ''}
                        onClick={() => handleButtonClick('All status')}
                      >
                        All status
                      </button>
                      <button
                        className={activeButton === 'Adult' ? 'active' : ''}
                        onClick={() => handleButtonClick('Adult')}
                      >
                        Adult
                      </button>
                      <button
                        className={activeButton === 'Pediatric' ? 'active' : ''}
                        onClick={() => handleButtonClick('Pediatric')}
                      >
                        Pediatric
                      </button>
                    </div>
                    <div
                      className="patient-list3"
                      style={{ fontFamily: 'tajawal', fontSize: '15px' }}
                    >
                      {patientData.length === 0 ? (
                        <p
                          style={{
                            textAlign: 'center',
                            color: '#6a6a6a',
                            fontWeight: '400',
                            fontSize: '20px',
                          }}
                        >
                          No patient for today
                        </p>
                      ) : (
                        patientData
                          .filter(patient => activeButton === 'All status' || patient.patientType === activeButton)
                          .map((patient, index) => (
                            <div className={'patient-item3'} key={index}>
                              <div className="patient-info3">
                                <div className="patient-details3">
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: '#6a6a6a',
                                        fontWeight: '500',
                                        marginBottom: '0px',
                                      }}
                                    >
                                      {patient.patientName}
                                    </p>
                                    <p style={{ marginTop: 'revert' }}>
                                      Clinic: {patient.clinicName}
                                    </p>
                                    <p style={{ marginTop: 'revert' }}>
                                      {patient.day} | {patient.time}
                                    </p>
                                  </div>
                                </div>
                                <div className="patient-time3">
                                  <button className="edit-button">Edit</button>
                                  <button>Delete</button>
                                </div>
                                <button
                                  onClick={() => openModal(patient.userId)}
                                  style={{
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '0px',
                                    backgroundColor: 'white',
                                    color: '#4393a7',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                  }}
                                >
                                  More Details <FaArrowRight />
                                </button>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedAction === 'Profile settings' && (
              <div className="form-container3">
                <div
                  className="profile-detiles3"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '30%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <img
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      border: '2px solid #e1e1e1',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    }}
                    src={profilePicture}
                    alt="Profile"
                  />
                  <div style={{ marginTop: '10px ' }}>
                    <h3 style={{ margin: '4px ', color: '#4393a7' }}>
                      {doctorName}
                    </h3>
                    {user && (
                      <>
                        <p style={{ margin: '4px ', fontFamily: 'tajawal', fontSize: '15px', fontStyle: 'italic' }}>
                          Email: {user.email}
                        </p>
                        <p style={{ margin: '4px ', fontFamily: 'tajawal', fontSize: '15px', fontStyle: 'italic' }}>
                          Phone: {doctorPhone}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="social-media-icons3">
                    <a
                      href="https://facebook.com/doctor"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="https://twitter.com/doctor"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="https://instagram.com/doctor"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://linkedin.com/in/doctor"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
                <form
                  onSubmit={handleSaveSettings}
                  style={{
                    width: '60%',
                    height: 'fit-content',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'tajawal',
                    margin: 'auto',
                  }}
                >
                  <label
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                    }}
                  >
                    Change Name:
                    <input
                      type="text"
                      name="doctorName"
                      defaultValue={doctorName}
                      required
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #e0e0e0',
                        marginTop: '4px',
                      }}
                    />
                  </label>

                  <label
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                    }}
                  >
                    Change Password:
                    <input
                      type="password"
                      name="doctorPassword"
                      defaultValue={doctorPassword}
                      required
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #e0e0e0',
                        marginTop: '4px',
                      }}
                    />
                  </label>
                  <label
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                    }}
                  >
                    Change Phone:
                    <input
                      type="tel"
                      name="doctorPhone"
                      defaultValue={doctorPhone}
                      required
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #e0e0e0',
                        marginTop: '4px',
                      }}
                    />
                  </label>
                  <label
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                    }}
                  >
                    Change Profile Picture:
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleProfilePictureChange}
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #e0e0e0',
                        marginTop: '4px',
                      }}
                    />
                  </label>
                  <label
                    style={{
                      marginTop: '0px',
                      marginBottom: '0px',
                    }}
                  >
                    Notification Preferences:
                    <select
                      name="notificationPreferences"
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #e0e0e0',
                        marginTop: '4px',
                      }}
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="none">None</option>
                    </select>
                  </label>
                  <li onClick={handleDeleteAccount} style={{ color: 'red' }}>
                    Delete Account
                  </li>
                  <button
                    type="submit"
                    className="savebutton3"
                    style={{
                      width: '20%',
                      border: '1px solid #e0e0e0',
                      borderRadius: '10px',
                      padding: '10px',
                      marginTop: '10px',
                      backgroundColor: '#4393a7',
                      color: 'white',
                      fontWeight: '500',
                    }}
                  >
                    Save
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        {selectedPatient && (
          <div>
            <h2>Patient Details</h2>
            <div style={{ marginBottom: '10px' }}>
              <strong>Full Name:</strong> {selectedPatient.fullname}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Phone Number:</strong> {selectedPatient.phoneNumber}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Gender:</strong> {selectedPatient.gender}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Dental History:</strong>
              {renderPatientDetails(selectedPatient.dentalHistory)}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Medical History:</strong>
              {renderPatientDetails(selectedPatient.medicalHistory)}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Required Treatment Condition:</strong> {selectedPatient.requiredTreatmentCondition}
            </div>
           
            <button className="close-button"  onClick={closeModal} style={{ marginTop: '20px' }}>Close</button>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DoctorDashboard;
