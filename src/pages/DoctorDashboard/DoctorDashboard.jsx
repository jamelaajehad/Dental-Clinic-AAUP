import React, { useState } from "react";
import "./DoctorDashboard.css";
import mybooking from "../../Asset/app-images/mybooking.png";
import setting from "../../Asset/app-images/setting.png";
import logout from "../../Asset/app-images/logout.png";
import manage from "../../Asset/app-images/manage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const DoctorDashboard = () => {
  const [selectedAction, setSelectedAction] = useState("appointments");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New patient appointment: John Doe" },
    { id: 2, message: "New patient appointment: Jane Smith" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/LoginForm";
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = (notification) => {
    alert(`Notification details: ${notification.message}`);
    // Here you can implement a detailed view of the notification if needed
  };

  return (
    <div className="doctor-dashboard">
      <div className="header">
        <h4 className="myaccount2">My Account</h4>
        <div className="notifications" onClick={toggleNotifications}>
          <FontAwesomeIcon icon={faBell} size="lg" />
          {notifications.length > 0 && (
            <span className="notification-count">{notifications.length}</span>
          )}
        </div>
      </div>
      {showNotifications && (
        <div className="notification-dropdown">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification-item"
              onClick={() => handleNotificationClick(notification)}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
      <div className="doctor-container">
        <div className="Docitems">
          <ul className="ulitems2">
            <li onClick={() => handleActionClick("appointments")}>
              <img src={mybooking} alt="My Bookings" style={{ width: "30px", height: "30px" }} />
              Appointments
            </li>
            <li onClick={() => handleActionClick("patients")}>
              <img src={manage} alt="Manage Patients" style={{ width: "30px", height: "30px" }} />
              Manage Patients
            </li>
            <li onClick={() => handleActionClick("Profile settings")}>
              <img src={setting} alt="Profile Settings" style={{ width: "30px", height: "30px" }} />
              Profile Settings
            </li>
            <li onClick={handleLogout}>
              <img src={logout} alt="Logout" style={{ width: "30px", height: "30px" }} />
              Logout
            </li>
            <li onClick={() => console.log("Account deleted")} style={{ color: "red" }}>
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
          {selectedAction === "patients" && (
            <div className="table-container">
              <h3>Manage Patients</h3>
              <table className="patients-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Contact Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jane Doe</td>
                    <td>30</td>
                    <td>123-456-7890</td>
                    <td>
                      <button className="button">Edit</button>
                      <button className="button">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {selectedAction === "Profile settings" && (
            <div className="form-container">
              <h3>Profile Settings</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>
                  Change Name:
                  <input type="text" name="doctorName" required />
                </label>
                <label>
                  Change Email:
                  <input type="email" name="doctorEmail" required />
                </label>
                <label>
                  Change Password:
                  <input type="password" name="doctorPassword" required />
                </label>
                <label>
                  Change Phone:
                  <input type="tel" name="doctorPhone" required />
                </label>
                <label>
                  Notification Preferences:
                  <select name="notificationPreferences">
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="none">None</option>
                  </select>
                </label>
                <button type="submit" className="savebutton">Save</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
