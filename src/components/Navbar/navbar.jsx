
// import { Link } from "react-router-dom";
// import React, { useState } from "react";
// import "./navbar.css";
// import logo from "../../Asset/app-images/logo.png";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { useUser } from "../../contexts/UserContext"; // Update the import to your correct path

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { user } = useUser(); // Use the user context
//   const navigate = useNavigate();

//   const handleUserProfileClick = () => {
//     if (user) {
//       if (user.userType === "doctor") {
//         navigate("/DoctorDashboard");l
//       } else {
//         navigate("/user");
//       }
//     }
//   };

//   return (
//     <nav className="navbar">
//       <img src={logo} alt="Logo" className="logo" />
//       <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//       <ul className={menuOpen ? "open" : ""}>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/clinics">Our Clinics</Link>
//         </li>
//         {user && user.userType === "patient" && (
//           <li>
//             <Link to="/mybooking"  >My Booking</Link>
//           </li>
//         )}
//         {user && user.userType === "doctor" && user.isPrimaryExaminationDoctor && (
//           <li>
//             <Link to="/PatientInformation">Patient Information</Link>
//           </li>
//         )}
//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//       </ul>
//       {user ? (
//         <div className="User-Profile" onClick={handleUserProfileClick}>
//           <FaUserCircle className="user-icon" />
//           <div className="profile-info">
//             <span>{user.additionalData.fullname}</span>
//           </div>
//         </div>
//       ) : (
//         <button onClick={() => navigate("/register")} className="Sign">
//           Sign Up
//         </button>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import "./navbar.css";
import logo from "../../Asset/app-images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext"; // Update the import to your correct path

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser(); // Use the user context
  const navigate = useNavigate();

  const handleUserProfileClick = () => {
    if (user) {
      if (user.userType === "doctor") {
        if (user.isPrimaryExaminationDoctor) {
          navigate("/doctorinitial");
        } else {
          navigate("/DoctorDashboard");
        }
      } else if (user.userType === "patient") {
        navigate("/user");
      }
    }
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/clinics">Our Clinics</Link>
        </li>
        {user && user.userType === "patient" && (
          <li>
            <Link to="/mybooking">My Booking</Link>
          </li>
        )}
        {user && user.userType === "doctor" && user.isPrimaryExaminationDoctor && (
          <li>
            <Link to="/PatientInformation">Patient Information</Link>
          </li>
        )}
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      {user ? (
        <div className="User-Profile" onClick={handleUserProfileClick}>
          <FaUserCircle className="user-icon" />
          <div className="profile-info">
            <span>{user.additionalData.fullname}</span>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate("/register")} className="Sign">
          Sign Up
        </button>
      )}
    </nav>
  );
};

export default Navbar;
