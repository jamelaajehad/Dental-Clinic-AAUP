import { Link } from "react-router-dom";
import React, { useState,useEffect } from "react";
import './navbar.css';
import logo from  '../../Asset/app-images/logo.png';
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState({ loggedIn: true });
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {  
        const token = localStorage.getItem('authToken');
        if (token) {
          setUser({ loggedIn: true });
        }
        else {
            setUser({ loggedIn: false });
        }
    }, []);
    const handleLogout = () => {
      localStorage.removeItem('authToken');   
      setUser({ loggedIn: false });
      navigate("/");
    };

    return (
        <nav>
            <img src={logo} alt="" />
            <div className="menu"
                onClick={() => {
                    setMenuOpen(!menuOpen);
                }}>
                <span> </span>
                <span> </span>
                <span> </span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/services">Services</Link>
                </li>
                <li>
                   <Link to="/Doctor">Find dentist</Link>
                </li>
                <li>
                   <Link to="/contact">Contact</Link>  
                </li>
            </ul>
            {user.loggedIn ? (
                <div className="user-profile">
                    < FaUserCircle
                       className="user-icon" 
                       onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    />
                     {profileMenuOpen && (
                        <div className="profile-menu">
                            <button onClick={() => navigate("/user/:activepage ")}>User Profile</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
            <button onClick={() => navigate("register")} className="login">Sign Up</button>
            )}
        </nav>
    );
};

export default Navbar;
