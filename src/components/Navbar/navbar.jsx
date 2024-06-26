import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../Asset/app-images/logo.png";
import { useUser } from "../../contexts/UserContext";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

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
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/clinics">Our Clinics</Link>
        </li>
        {user && (
          <li>
            <Link to="/mybooking">My Booking</Link>
          </li>
        )}
        <li>
          <Link to="/PatientInformation">Patient Information</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {user && (
          <li>
            <Link to="/chat" className="nav-link">
              <IoChatbubbleOutline className="chat-icon" /> {/* أيقونة الشات */}
            </Link>
          </li>
        )}
      </ul>
      {user ? (
        <div className="user-profile" onClick={() => navigate("/user")}>
          <FaUserCircle className="user-icon" />
          <div className="profile-info">
            <span>{user.fullname}</span>
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
