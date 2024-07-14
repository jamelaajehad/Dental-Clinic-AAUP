import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../Asset/app-images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaComment } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";
import NotificationPanel from "../NotificationPanel/NotificationPanel";
import { firestore } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import defaultAvatar from "../../Asset/doctor-images/doctor3.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userAvatar, setUserAvatar] = useState(defaultAvatar);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe;

    console.log("User in useEffect:", user);
    if (user) {
      const userDocRef = doc(
        firestore,
        user.userType === "doctor" ? "Doctors" : "Patients",
        user.uid
      );

      unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          console.log("User data:", userData);
          setNotifications(userData.notifications || []);
          if (userData.image) {
            setUserAvatar(userData.image);
          }
        }
      });
    }

    // Cleanup the subscription when the component unmounts or user changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

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

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}></div>
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
        {user &&
          user.userType === "doctor" &&
          user.isPrimaryExaminationDoctor && (
            <li>
              <Link to="/PatientInformation">Patient Information</Link>
            </li>
          )}
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      {user ? (
        <div className="username-with-icons">
          <div className="notification-icon-container">
            <FaBell
              className="notification-icon"
              onClick={toggleNotifications}
            />
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
          </div>
          {showNotifications && (
            <NotificationPanel
              notifications={notifications}
              onClose={closeNotifications}
            />
          )}
          <FaComment
            className="message-icon"
            onClick={() => navigate("/Messages")}
          />
          <div className="User-Profile" onClick={handleUserProfileClick}>
            <img
              src={
                userAvatar
                  ? userAvatar
                  : "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
              }
              alt="User Avatar"
              className="user-avatar"
            />
            <div className="profile-info">
              <span>{user.additionalData?.fullname || "User"}</span>
            </div>
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
