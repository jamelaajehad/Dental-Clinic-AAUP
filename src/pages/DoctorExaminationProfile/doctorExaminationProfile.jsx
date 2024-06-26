import React, { useState } from "react";
import "./doctorExaminationProfile.css";
import mybooking from "../../Asset/app-images/mybooking.png";
import setting from "../../Asset/app-images/setting.png";
import logout from "../../Asset/app-images/logout.png";
import { signOut } from "firebase/auth";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const DoctorInitial = () => {
  const [selectedAction, setSelectedAction] = useState("appointments");
  const [profilePicture, setProfilePicture] = useState(null);
  const [doctorName, setDoctorName] = useState("Dr. [Doctor Name]");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();
  
  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  const handleProfilePictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSaveSettings = (event) => {
    event.preventDefault();
    const name = event.target.elements.doctorName.value;
    const email = event.target.elements.doctorEmail.value;
    const password = event.target.elements.doctorPassword.value;
    const phone = event.target.elements.doctorPhone.value;
    setDoctorName(name);
    setDoctorEmail(email);
    setDoctorPassword(password);
    setDoctorPhone(phone);
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
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
      <div className="doctor-dashboard">
        <h4 className="myaccount2">My Account</h4>
        <div className="doctor-container">
          <div className="Docitems2">
            <ul className="ulitems2">
              <li onClick={() => handleActionClick("appointments")}>
                <img
                  src={mybooking}
                  alt="#"
                  style={{ width: "30px", height: "30px" }}
                />
                Appointments
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
              <li onClick={handleDeleteAccount} style={{ color: "red" }}>
                Delete Account
              </li>
            </ul>
          </div>
          <div className="section-content2">
            {selectedAction === "appointments" && (
              <div className="table-container">
                <h3>Appointments</h3>
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Date</th>
                      <th>Clinic</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>2024-06-01</td>
                      <td>Clinic 1</td>
                    </tr>
                    {/* More rows as needed */}
                  </tbody>
                </table>
              </div>
            )}
            
            {selectedAction === "Profile settings" && (
              <div className="form-container">
                <h3> Profile Settings</h3>
                <form onSubmit={handleSaveSettings}>
                  <label>
                    Change Name:
                    <input
                      type="text"
                      name="doctorName"
                      defaultValue={doctorName}
                      required
                    />
                  </label>
                  
                  <label>
                    Change Password:
                    <input
                      type="password"
                      name="doctorPassword"
                      defaultValue={doctorPassword}
                      required
                    />
                  </label>
                  <label>
                    Change Phone:
                    <input
                      type="tel"
                      name="doctorPhone"
                      defaultValue={doctorPhone}
                      required
                    />
                  </label>
                  <label>
                    Change Profile Picture:
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                  <label>
                    Notification Preferences:
                    <select name="notificationPreferences">
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="none">None</option>
                    </select>
                  </label>
                  <button type="submit" className="savebutton">
                    Save
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInitial ;
