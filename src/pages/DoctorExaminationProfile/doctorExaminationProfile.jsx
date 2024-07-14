// import React, { useState } from "react";
// import "./doctorExaminationProfile.css";
// import mybooking from "../../Asset/app-images/mybooking.png";
// import setting from "../../Asset/app-images/setting.png";
// import logout from "../../Asset/app-images/logout.png";
// import { signOut } from "firebase/auth";
// import { useUser } from "../../contexts/UserContext";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../firebase";

// const DoctorInitial = () => {
//   const [selectedAction, setSelectedAction] = useState("appointments");
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [doctorName, setDoctorName] = useState("Dr. [Doctor Name]");
//   const [doctorPassword, setDoctorPassword] = useState("");
//   const [doctorPhone, setDoctorPhone] = useState("");
//   const { setUser } = useUser();
//   const navigate = useNavigate();

//   const handleActionClick = (action) => {
//     setSelectedAction(action);
//   };

//   const handleProfilePictureChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setProfilePicture(URL.createObjectURL(event.target.files[0]));
//     }
//   };

//   const handleSaveSettings = (event) => {
//     event.preventDefault();
//     const name = event.target.elements.doctorName.value;
//     const email = event.target.elements.doctorEmail.value;
//     const password = event.target.elements.doctorPassword.value;
//     const phone = event.target.elements.doctorPhone.value;
//     setDoctorName(name);
//     setDoctorEmail(email);
//     setDoctorPassword(password);
//     setDoctorPhone(phone);
//   };

//   const handleDeleteAccount = () => {
//     console.log("Account deleted");
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       localStorage.removeItem("user");
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.error("Error logging out: ", error);
//     }
//   };

//   return (
//     <div>
//       <div className="doctor-dashboard">
//         <h4 className="myaccount2">My Account</h4>
//         <div className="doctor-container">
//           <div className="Docitems2">
//             <ul className="ulitems2">
//               <li onClick={() => handleActionClick("appointments")}>
//                 <img
//                   src={mybooking}
//                   alt="#"
//                   style={{ width: "30px", height: "30px" }}
//                 />
//                 Appointments
//               </li>
//               <li onClick={() => handleActionClick("Profile settings")}>
//                 <img
//                   src={setting}
//                   alt="#"
//                   style={{ width: "30px", height: "30px" }}
//                 />
//                 Profile Settings
//               </li>
//               <li onClick={handleLogout}>
//                 <img
//                   src={logout}
//                   alt="#"
//                   style={{ width: "30px", height: "30px" }}
//                 />
//                 Logout
//               </li>
//               <li onClick={handleDeleteAccount} style={{ color: "red" }}>
//                 Delete Account
//               </li>
//             </ul>
//           </div>
//           <div className="section-content2">
//             {selectedAction === "appointments" && (
//               <div className="table-container">
//                 <h3>Appointments</h3>
//                 <table className="appointments-table">
//                   <thead>
//                     <tr>
//                       <th>Patient Name</th>
//                       <th>Date</th>
//                       <th>Clinic</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>John Doe</td>
//                       <td>2024-06-01</td>
//                       <td>Clinic 1</td>
//                     </tr>
//                     {/* More rows as needed */}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {selectedAction === "Profile settings" && (
//               <div className="form-container">
//                 <h3> Profile Settings</h3>
//                 <form onSubmit={handleSaveSettings}>
//                   <label>
//                     Change Name:
//                     <input
//                       type="text"
//                       name="doctorName"
//                       defaultValue={doctorName}
//                       required
//                     />
//                   </label>

//                   <label>
//                     Change Password:
//                     <input
//                       type="password"
//                       name="doctorPassword"
//                       defaultValue={doctorPassword}
//                       required
//                     />
//                   </label>
//                   <label>
//                     Change Phone:
//                     <input
//                       type="tel"
//                       name="doctorPhone"
//                       defaultValue={doctorPhone}
//                       required
//                     />
//                   </label>
//                   <label>
//                     Change Profile Picture:
//                     <input
//                       type="file"
//                       name="profilePicture"
//                       onChange={handleProfilePictureChange}
//                     />
//                   </label>
//                   <label>
//                     Notification Preferences:
//                     <select name="notificationPreferences">
//                       <option value="email">Email</option>
//                       <option value="sms">SMS</option>
//                       <option value="none">None</option>
//                     </select>
//                   </label>
//                   <button type="submit" className="savebutton">
//                     Save
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorInitial ;

// import React, { useState } from 'react';
//  import "./doctorExaminationProfile.css";
// import mybooking from '../../Asset/app-images/mybooking.png';
// import setting from '../../Asset/app-images/setting.png';
// import logout from '../../Asset/app-images/logout.png';
// import manage from '../../Asset/app-images/manage.png';
// import { signOut } from 'firebase/auth';
// import { useUser } from '../../contexts/UserContext';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../../firebase';
// import 'react-day-picker/dist/style.css';
// import Footer from "../../components/Footer/footer";

// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedin,
//   FaArrowRight,
// } from 'react-icons/fa';

// const css = `
// .my-selected3:not([disabled]) {
//   font-weight: bold;
//   border: 1px solid rgb(67, 147, 167);
// }
// .my-selected3:hover:not([disabled]) {
//   border-color: rgb(67, 147, 167);
//   color: black;
// }
// `;

// const DoctorDashboard = () => {
//   const [selectedAction, setSelectedAction] = useState('patients');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [doctorName, setDoctorName] = useState('Dr. [Doctor Name]');
//   const [doctorPassword, setDoctorPassword] = useState('');
//   const [doctorPhone, setDoctorPhone] = useState('');

//   const { setUser } = useUser();
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [patientData, setPatientData] = useState(
//     getPatientsForDate(new Date())
//   );

//   const handleDateChange = date => {
//     setSelectedDate(date);
//     setPatientData(getPatientsForDate(date));
//   };

//   const handleActionClick = action => {
//     setSelectedAction(action);
//   };

//   const handleProfilePictureChange = event => {
//     if (event.target.files && event.target.files[0]) {
//       setProfilePicture(URL.createObjectURL(event.target.files[0]));
//     }
//   };
//   const [activeButton, setActiveButton] = useState('All status');

//   const handleButtonClick = status => {
//     setActiveButton(status);
//   };

//   const handleSaveSettings = event => {
//     event.preventDefault();
//     const name = event.target.elements.doctorName.value;
//     const email = event.target.elements.doctorEmail.value;
//     const password = event.target.elements.doctorPassword.value;
//     const phone = event.target.elements.doctorPhone.value;
//     setDoctorName(name);
//     setDoctorEmail(email);
//     setDoctorPassword(password);
//     setDoctorPhone(phone);
//   };

//   const handleDeleteAccount = () => {
//     console.log('Account deleted');
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
//       <div className="doctor-dashboardex">
//         <div className="doctor-containerex">
//           <div
//             className="Docitemsex"
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <div
//               className="profile-detilesex"
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
//                 src="https://i.pinimg.com/736x/37/83/41/378341dbf716f60840b31abf29401c1e.jpg"
//                 alt="Profile"
//               />

//               <h4 style={{ margin: '4px ', color: '#4393a7' }}>
//                 Anwar Ghannam
//               </h4>
//             </div>
//             <ul className="ulitemsex">
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
//           <div className="section-contentex">
//             {selectedAction === 'patients' && (
//               <div className="table-containerex">
//                 <div className="container-doctorex">
//                   <div className="contentex">
//                     <div className="headerex">
//                       <h1>Patient list</h1>
//                     </div>
//                     <div className="filter-barex">
//                       <button
//                         className={
//                           activeButton === 'All status' ? 'active' : ''
//                         }
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
//                       className="patient-listex"
//                       style={{ fontFamily: 'tajawal', fontSize: '15px' }}
//                     >
//                       {patientData.length == 0 ? (
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
//                         patientData.map((patient, index) => (
//                           <div className={'patient-itemex'} key={index}>
//                             <div className="patient-infoex">
//                               <div className="patient-detailsex">
//                                 <img
//                                   src={patient.img}
//                                   alt={patient.name}
//                                   width="50"
//                                   height="50"
//                                 />
//                                 <div
//                                   style={{
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     justifyContent: 'center',
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       color: '#6a6a6a',
//                                       fontWeight: '500',
//                                       marginBottom: '0px',
//                                     }}
//                                   >
//                                     {patient.name} | {patient.age} Year
//                                   </p>
//                                   <p style={{ marginTop: 'revert' }}>
//                                     {patient.phone}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div>
//                                 <p>Clinic : {patient.clinic}</p>
//                                 <div className="patient-timeex">
//                                   <p>{patient.date} | </p>
//                                   <p>{patient.time}</p>
//                                 </div>
//                               </div>
//                               <div className="patient-timeex">
//                                 <button className="edit-buttonex">Edit </button>
//                                 <button>Delete</button>
//                               </div>
//                               <button
//                                 style={{
//                                   border: 'none',
//                                   borderRadius: '10px',
//                                   padding: '0px',
//                                   backgroundColor: 'white',
//                                   color: '#4393a7',
//                                   fontWeight: '500',
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   gap: '4px',
//                                 }}
//                               >
//                                 More Details <FaArrowRight />
//                               </button>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {selectedAction === 'Profile settings' && (
//               <div className="form-containerex">
//                 <div
//                   className="profile-detilesex"
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
//                     src="https://i.pinimg.com/736x/37/83/41/378341dbf716f60840b31abf29401c1e.jpg"
//                     alt="Profile"
//                   />
//                   <div style={{ marginTop: '10px ' }}>
//                     <h3 style={{ margin: '4px ', color: '#4393a7' }}>
//                       Anwar Ghannam
//                     </h3>
//                     <p
//                       style={{
//                         margin: '4px ',
//                         fontFamily: 'tajawal',
//                         fontSize: '15px',
//                         fontStyle: 'italic',
//                       }}
//                     >
//                       Email : anwarghannam319@gmail.com
//                     </p>
//                     <p
//                       style={{
//                         margin: '4px ',
//                         fontFamily: 'tajawal',
//                         fontSize: '15px',
//                         fontStyle: 'italic',
//                       }}
//                     >
//                       Phone : +970 943 46239
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
//                     className="savebuttonex"
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
//     </div>
//   );
// };

// const getPatientsForDate = date => {
//   const formattedDate = date.toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric',
//   });
//   console.log(formattedDate);
//   // يمكن تغيير هذه البيانات لتناسب المرضى الفعليين
//   const allPatients = [
//     {
//       date: '24 September 2024',
//       time: '08:00 - 10:00',
//       clinic: 'Anwar Ghannam',
//       name: 'Nina Singleton',
//       phone: '068 350 90 20',
//       img: 'https://i.pinimg.com/564x/0a/65/b7/0a65b7e685fc31d3dda7ce23ddcafc5c.jpg',
//       status: 'Adult',
//       statusClass: 'status-adult',
//       age: 25,
//     },
//     {
//       date: '24 September 2024',
//       time: '11:00 - 12:00',
//       clinic: 'Anwar Ghannam',
//       name: 'John Norton',
//       phone: '063 780 81 31',
//       img: 'https://i.pinimg.com/564x/15/03/fc/1503fc4ae8ad7eab7e96b80ca1cfe0df.jpg',
//       status: 'Adult',
//       statusClass: 'status-adult',
//       age: 30,
//     },
//     {
//       date: '24 September 2024',
//       time: '12:00 - 13:00',
//       clinic: 'Anwar Ghannam',
//       name: 'Lucy Brady',
//       phone: '095 580 62 53',
//       img: 'https://i.pinimg.com/564x/43/54/7b/43547be790fe70ac9e472ffed658376b.jpg',
//       status: 'Pediatric',
//       statusClass: 'status-pediatric',
//       age: 15,
//     },
//     {
//       date: '24 September 2024',
//       time: '13:00 - 14:00',
//       clinic: 'Anwar Ghannam',
//       name: 'Ruby Huff',
//       phone: '067 420 40 50',
//       img: 'https://i.pinimg.com/564x/2e/dd/02/2edd02160b51797f7adb807a79d96d36.jpg',
//       status: 'Adult',
//       statusClass: 'status-adult',
//       age: 40,
//     },
//     {
//       date: '24 September 2024',
//       time: '14:00 - 15:00',
//       clinic: 'Anwar Ghannam',
//       name: 'Jon Oliver',
//       phone: '093 952 32 21',
//       img: 'https://i.pinimg.com/564x/b0/23/3c/b0233cbe2b61247dc365765b72c2eb3b.jpg',
//       status: 'Pediatric',
//       statusClass: 'status-pediatric',
//       age: 12,
//     },
//   ];

//   return allPatients.filter(patient => patient.date === formattedDate);

// };

// export default DoctorDashboard;

// import React, { useState, useEffect } from 'react';
// import './doctorExaminationProfile.css';
// import mybooking from '../../Asset/app-images/mybooking.png';
// import setting from '../../Asset/app-images/setting.png';
// import logout from '../../Asset/app-images/logout.png';
// import manage from '../../Asset/app-images/manage.png';
// import { signOut } from 'firebase/auth';
// import { useUser } from '../../contexts/UserContext';
// import { useNavigate } from 'react-router-dom';
// import { auth, firestore } from '../../firebase';
// import { collection, query, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
// import 'react-day-picker/dist/style.css';
// import Footer from "../../components/Footer/footer";

// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedin,
//   FaArrowRight,
// } from 'react-icons/fa';
// import { parse } from 'date-fns';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// const DoctorDashboard = () => {
//   const [selectedAction, setSelectedAction] = useState('patients');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [doctorName, setDoctorName] = useState('');
//   const [doctorEmail, setDoctorEmail] = useState('');
//   const [doctorPhone, setDoctorPhone] = useState('');
//   const [doctorPassword, setDoctorPassword] = useState('');
//   const [activeButton, setActiveButton] = useState('All status');
//   const [patientData, setPatientData] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const { user } = useUser();
//   const { setUser } = useUser();
//   const navigate = useNavigate();

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
//         setDoctorEmail(doctorData.email);
//         setDoctorPhone(doctorData.phone);
//         setDoctorPassword(doctorData.password);

//         const today = new Date();

//         const appointmentsSnapshot = await getDocs(collection(firestore, "Appointments"));
//         const appointments = appointmentsSnapshot.docs.map(doc => doc.data());

//         const upcomingAppointments = appointments.filter(appointment => {
//           const appointmentDate = parse(appointment.day, "EEEE, MMMM do yyyy", new Date());
//           return appointmentDate > today;
//         });

//         console.log('Fetched Appointments:', upcomingAppointments); // Log fetched data

//         setPatientData(upcomingAppointments);
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
//     } catch (error) {
//       console.error("Error updating profile:", error);
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
//     } catch (error) {
//       console.error("Error deleting account:", error);
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

//   const openModal = async (patientId) => {
//     try {
//       const patientDocRef = doc(firestore, "Patients", patientId);
//       const patientDoc = await getDoc(patientDocRef);
//       if (patientDoc.exists()) {
//         setSelectedPatient(patientDoc.data());
//         setModalIsOpen(true);
//       }
//     } catch (error) {
//       console.error("Error fetching patient details:", error);
//     }
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedPatient(null);
//   };

//   const renderPatientDetails = (details) => {
//     return Object.entries(details).map(([key, value]) => (
//       <div key={key} style={{ marginBottom: '10px' }}>
//         <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <div className="doctor-dashboardex">
//         <div className="doctor-containerex">
//           <div
//             className="Docitemsex"
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <div
//               className="profile-detilesex"
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

//               <h4 style={{ margin: '4px ', color: '#4393a7', fontFamily: 'Arial, sans-serif' }}>
//                 {doctorName}
//               </h4>
//               <p style={{ margin: '4px ', fontFamily: 'Arial, sans-serif', fontSize: '15px' }}>
//                 {doctorPhone}
//               </p>
//             </div>
//             <ul className="ulitemsex">
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
//           <div className="section-contentex">
//             {selectedAction === 'patients' && (
//               <div className="table-containerex">
//                 <div className="container-doctorex">
//                   <div className="contentex">
//                     <div className="headerex">
//                       <h1>Patient list</h1>
//                     </div>
//                     <div className="filter-barex">
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
//                         className={activeButton === 'Paediatric' ? 'active' : ''}
//                         onClick={() => handleButtonClick('Paediatric')}
//                       >
//                         Paediatric
//                       </button>
//                     </div>
//                     <div
//                       className="patient-listex"
//                       style={{ fontFamily: 'tajawal', fontSize: '18px' }}
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
//                             <div className={'patient-itemex'} key={index}>
//                               <div className="patient-infoex">
//                                 <div className="patient-detailsex">
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
//                                         fontFamily: 'Arial, sans-serif',
//                                       }}
//                                     >
//                                       {patient.patientName}
//                                     </p>
//                                     <p style={{ marginTop: 'revert' }}>
//                                       Type: {patient.patientType}
//                                     </p>
//                                     <p style={{ marginTop: 'revert' }}>
//                                       {patient.day} | {patient.time}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="patient-timeex">
//                                   <button className="edit-buttonex">Edit</button>
//                                   <button>Delete</button>
//                                 </div>
//                                 <button
//                                   onClick={() => openModal(patient.userId)}
//                                   style={{
//                                     border: 'none',
//                                     borderRadius: '10px',
//                                     padding: '0px',
//                                     backgroundColor: 'white',
//                                     color: '#4393a7',
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
//               <div className="form-containerex">
//                 <div
//                   className="profile-detilesex"
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
//                       width: '90%',
//                       height: '300px',
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
//                       Email : {doctorEmail}
//                     </p>
//                     <p
//                       style={{
//                         margin: '4px ',
//                         fontFamily: 'tajawal',
//                         fontSize: '15px',
//                         fontStyle: 'italic',
//                       }}
//                     >
//                       Phone : {doctorPhone}
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
//                       fontSize: '16px',
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
//                       fontSize: '16px',
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
//                       fontSize: '16px',
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
//                       fontSize: '16px',
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

//                   <li onClick={handleDeleteAccount} style={{ color: 'red', fontSize: '16px' }}>
//                     Delete Account
//                   </li>
//                   <button
//                     type="submit"
//                     className="savebuttonex"
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
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         className="Modal2"
//         overlayClassName="Overlay"
//       >
//         {selectedPatient && (
//           <div>
//             <h2>Patient Details</h2>
//             <div style={{ marginBottom: '10px' }}>
//               <strong>Full Name:</strong> {selectedPatient.fullname}
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <strong>Phone Number:</strong> {selectedPatient.phoneNumber}
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <strong>Gender:</strong> {selectedPatient.gender}
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <strong>Dental History:</strong>
//               {renderPatientDetails(selectedPatient.dentalHistory)}
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <strong>Medical History:</strong>
//               {renderPatientDetails(selectedPatient.medicalHistory)}
//             </div>
//             <button className="close-button" onClick={closeModal} style={{ marginTop: '20px' }}>Close</button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default DoctorDashboard;

import React, { useState, useEffect } from "react";
import "./doctorExaminationProfile.css";
import mybooking from "../../Asset/app-images/mybooking.png";
import setting from "../../Asset/app-images/setting.png";
import logout from "../../Asset/app-images/logout.png";
import manage from "../../Asset/app-images/manage.png";
import { signOut } from "firebase/auth";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "react-day-picker/dist/style.css";
import Footer from "../../components/Footer/Footer";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
  FaUser,
  FaPhone,
  FaVenusMars,
  FaTooth,
  FaHeartbeat,
} from "react-icons/fa";
import { parse } from "date-fns";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const DoctorDashboard = () => {
  const [selectedAction, setSelectedAction] = useState("patients");
  const [profilePicture, setProfilePicture] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [activeButton, setActiveButton] = useState("All status");
  const [patientData, setPatientData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { user } = useUser();
  const { setUser } = useUser();
  const navigate = useNavigate();

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
        setDoctorEmail(doctorData.email);
        setDoctorPhone(doctorData.phone);
        setDoctorPassword(doctorData.password);

        const today = new Date();

        const appointmentsSnapshot = await getDocs(
          collection(firestore, "Appointments")
        );
        const appointments = appointmentsSnapshot.docs.map((doc) => doc.data());

        const upcomingAppointments = appointments.filter((appointment) => {
          const appointmentDate = parse(
            appointment.day,
            "EEEE, MMMM do yyyy",
            new Date()
          );
          return appointmentDate > today;
        });

        console.log("Fetched Appointments:", upcomingAppointments); // Log fetched data

        setPatientData(upcomingAppointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user && user.uid) {
      fetchDoctorData();
    }
  }, [user]);

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  const handleButtonClick = (status) => {
    setActiveButton(status);
  };

  const handleProfilePictureChange = (event) => {
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
        image: profilePicture,
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
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
      toast.success("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error deleting account.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
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
      <div key={key} style={{ marginBottom: "10px" }}>
        <strong>{key}:</strong>{" "}
        {Array.isArray(value) ? value.join(", ") : value}
      </div>
    ));
  };

  return (
    <div>
      <div className="doctor-dashboardex">
        <div className="doctor-containerex">
          <div
            className="Docitemsex"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="profile-detilesex"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "32px",
              }}
            >
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "100px",
                  border: "2px solid #e1e1e1",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
                src={profilePicture}
                alt="Profile"
              />

              <h4
                style={{
                  margin: "4px ",
                  color: "#4393a7",
                  fontFamily: "outfit, sans-serif",
                }}
              >
                {doctorName}
              </h4>
              <p
                style={{
                  margin: "4px ",
                  fontFamily: "outfit, sans-serif",
                  fontSize: "15px",
                }}
              >
                {doctorPhone}
              </p>
            </div>
            <ul className="ulitemsex">
              <li onClick={() => handleActionClick("patients")}>
                <img
                  src={manage}
                  alt="#"
                  style={{ width: "30px", height: "30px" }}
                />
                Manage Patients
              </li>
              <li onClick={() => handleActionClick("Profile settings")}>
                <img
                  src={setting}
                  alt="#"
                  style={{ width: "30px", height: "30px" }}
                />
                Profile Settings
              </li>
              <li onClick={handleLogout}>
                <img
                  src={logout}
                  alt="#"
                  style={{ width: "30px", height: "30px" }}
                />
                Logout
              </li>
            </ul>
          </div>
          <div className="section-contentex">
            {selectedAction === "patients" && (
              <div className="table-containerex">
                <div className="container-doctorex">
                  <div className="contentex">
                    <div className="headerex">
                      <h1>Patient list</h1>
                    </div>
                    <div className="filter-barex">
                      <button
                        className={
                          activeButton === "All status" ? "active" : ""
                        }
                        onClick={() => handleButtonClick("All status")}
                      >
                        All status
                      </button>
                      <button
                        className={activeButton === "Adult" ? "active" : ""}
                        onClick={() => handleButtonClick("Adult")}
                      >
                        Adult
                      </button>
                      <button
                        className={
                          activeButton === "Paediatric" ? "active" : ""
                        }
                        onClick={() => handleButtonClick("Paediatric")}
                      >
                        Paediatric
                      </button>
                    </div>
                    <div
                      className="patient-listex"
                      style={{ fontFamily: "tajawal", fontSize: "20px" }}
                    >
                      {patientData.length === 0 ? (
                        <p
                          style={{
                            textAlign: "center",
                            color: "#6a6a6a",
                            fontWeight: "400",
                            fontSize: "20px",
                          }}
                        >
                          No patient for today
                        </p>
                      ) : (
                        patientData
                          .filter(
                            (patient) =>
                              activeButton === "All status" ||
                              patient.patientType === activeButton
                          )
                          .map((patient, index) => (
                            <div className={"patient-itemex"} key={index}>
                              <div className="patient-infoex">
                                <div className="patient-detailsex">
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#161616 ",
                                        fontSize: "19px",
                                        fontWeight: "500",
                                        marginBottom: "0px",
                                        fontFamily: "Tajawal, sans-serif",
                                      }}
                                    >
                                      {patient.patientName}
                                    </p>
                                    <p style={{ marginTop: "revert" }}>
                                      Type: {patient.patientType}
                                    </p>
                                    <p style={{ marginTop: "revert" }}>
                                      {patient.day} | {patient.time}
                                    </p>
                                  </div>
                                </div>
                                <div className="patient-timeex">
                                  <button className="edit-buttonex">
                                    Edit
                                  </button>
                                  <button>Delete</button>
                                </div>
                                <button
                                  onClick={() => openModal(patient.userId)}
                                  style={{
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "0px",
                                    backgroundColor: "white",
                                    color: "#4393a7",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
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
            {selectedAction === "Profile settings" && (
              <div className="form-containerex">
                <div
                  className="profile-detilesex"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    style={{
                      width: "90%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      border: "2px solid #e1e1e1",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                    src={profilePicture}
                    alt="Profile"
                  />
                  <div style={{ marginTop: "10px " }}>
                    <h3 style={{ margin: "4px ", color: "#4393a7" }}>
                      {doctorName}
                    </h3>
                    <p
                      style={{
                        margin: "4px ",
                        fontFamily: "tajawal",
                        fontSize: "15px",
                        fontStyle: "italic",
                      }}
                    >
                      Email : {doctorEmail}
                    </p>
                    <p
                      style={{
                        margin: "4px ",
                        fontFamily: "tajawal",
                        fontSize: "15px",
                        fontStyle: "italic",
                      }}
                    >
                      Phone : {doctorPhone}
                    </p>
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
                    width: "60%",
                    height: "fit-content",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    fontFamily: "tajawal",
                    margin: "auto",
                  }}
                >
                  <label
                    style={{
                      marginTop: "0px",
                      marginBottom: "0px",
                      fontSize: "17px",
                    }}
                  >
                    Change Name:
                    <input
                      type="text"
                      name="doctorName"
                      defaultValue={doctorName}
                      required
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #e0e0e0",
                        marginTop: "4px",
                      }}
                    />
                  </label>

                  <label
                    style={{
                      marginTop: "0px",
                      marginBottom: "0px",
                      fontSize: "16px",
                    }}
                  >
                    Change Password:
                    <input
                      type="password"
                      name="doctorPassword"
                      defaultValue={doctorPassword}
                      required
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #e0e0e0",
                        marginTop: "4px",
                      }}
                    />
                  </label>
                  <label
                    style={{
                      marginTop: "0px",
                      marginBottom: "0px",
                      fontSize: "17px",
                    }}
                  >
                    Change Phone:
                    <input
                      type="tel"
                      name="doctorPhone"
                      defaultValue={doctorPhone}
                      required
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #e0e0e0",
                        marginTop: "4px",
                      }}
                    />
                  </label>
                  <label
                    style={{
                      marginTop: "0px",
                      marginBottom: "0px",
                      fontSize: "17px",
                    }}
                  >
                    Change Profile Picture:
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleProfilePictureChange}
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #e0e0e0",
                        marginTop: "4px",
                      }}
                    />
                  </label>

                  <li
                    onClick={handleDeleteAccount}
                    style={{ color: "red", fontSize: "18px" }}
                  >
                    Delete Account
                  </li>
                  <button
                    type="submit"
                    className="savebuttonex"
                    style={{
                      width: "20%",
                      border: "1px solid #e0e0e0",
                      borderRadius: "10px",
                      padding: "10px",
                      marginTop: "10px",
                      backgroundColor: "#4393a7",
                      color: "white",
                      fontWeight: "500",
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
        className="Modal2"
        overlayClassName="Overlay"
      >
        {selectedPatient && (
          <div className="Patient-Details" style={{ fontFamily: "Sriracha" }}>
            <h3>Patient Details :</h3>
            <div
              style={{
                marginTop: "7px",
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                fontFamily: "outfit, sans-serif",
                fontSize: "17px",
              }}
            >
              <FaUser style={{ marginRight: "8px", color: "#4393a7" }} />
              <strong>Full Name: </strong> {selectedPatient.fullname}
              <FaPhone
                style={{
                  marginLeft: "30px",
                  marginRight: "8px",
                  color: "#4393a7",
                }}
              />
              <strong>Phone Number:</strong> {selectedPatient.phoneNumber}
              <FaVenusMars
                style={{
                  marginLeft: "30px",
                  marginRight: "8px",
                  color: "#4393a7",
                }}
              />
              <strong>Gender:</strong> {selectedPatient.gender}
            </div>

            <div
              style={{
                marginBottom: "15px",
                fontFamily: "outfit, sans-serif",
                fontSize: "17px",
              }}
            >
              <FaTooth style={{ marginRight: "10px", color: "#4393a7" }} />
              <strong>Dental History:</strong>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "30px",
                  paddingRight: "15px",
                }}
              >
                {renderPatientDetails(selectedPatient.dentalHistory)}
              </div>
            </div>
            <div
              style={{
                marginBottom: "15px",
                fontFamily: "outfit, sans-serif",
                fontSize: "17px",
              }}
            >
              <FaHeartbeat style={{ marginRight: "10px", color: "#4393a7" }} />
              <strong>Medical History:</strong>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "30px",
                  paddingRight: "15px",
                }}
              >
                {renderPatientDetails(selectedPatient.medicalHistory)}
              </div>
            </div>
            <button
              className="close-button"
              onClick={closeModal}
              style={{ marginTop: "20px" }}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DoctorDashboard;
