import React, { useState } from "react";
import Footer from "../../components/Footer/footer";
import MyBookings from "../../components/UserBooking/Mybooking";
import ProfileSettings from "../../components/UserProfileSetting/ProfileSettings";
import setting from "../../Asset/app-images/setting.png";
import mybooking from "../../Asset/app-images/mybooking.png";
import logout from "../../Asset/app-images/logout.png";
import profilePic from "../../Asset/app-images/profilePic.png";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Adjust the import path as necessary
import { signOut } from "firebase/auth";
import "./userprofile.css";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profilePicture, setProfilePicture] = useState(profilePic);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
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

  return (
    <div>
      <div className="profileimage">
        <h1 align="center">User Profile</h1>
      </div>
      <div className="Userprofile">
       
        <div className="user-container">
          <div className="items1">
            <div className="profile-picture-container">
              <img
                src={profilePicture}
                alt="Profile"
                style={{ width: "95px", height: "95px", borderRadius: "50px" }}
                className="profile-picture"
              />
            </div>
            <ul className="ulitems">
              <li onClick={() => setActiveSection("profile")}>
                <img
                  src={setting}
                  alt="#"
                  style={{ width: "30px", height: "30px" }}
                />
                Profile Settings
              </li>
              <li onClick={() => setActiveSection("bookings")}>
                <img
                  src={mybooking}
                  alt="#"
                  style={{ width: "30px", height: "30px" }}
                />
                My Bookings
              </li>
              <li onClick={handleLogout}>
                <img
                  src={logout}
                  alt="#"
                  style={{ width: "30px", height: "30px" }}
                />
                Logout
              </li>
              <li onClick={""} style={{ color: "red" }}>
                Delete Account
              </li>
            </ul>
          </div>
          <div className="section-content">
            {activeSection === "profile" && <ProfileSettings />}
            {activeSection === "bookings" && <MyBookings />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
