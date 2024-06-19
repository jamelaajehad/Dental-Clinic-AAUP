import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./navbar.css";
import logo from "../../Asset/app-images/logo.png";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext"; // Update the import to your correct path

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser(); // Use the user context
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
          <Link to="/clinics">Our Clinics</Link>
        </li>
        {user && (
          <li>
            <Link to="/mybooking">My Booking</Link>
          </li>
        )}
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      {user ? (
        <div className="User-Profile" onClick={() => navigate("/user")}>
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
