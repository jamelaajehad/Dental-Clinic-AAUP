import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../Asset/app-images/logo.png";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);

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
          <Link to="/contact">Contact</Link>
        </li>
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
