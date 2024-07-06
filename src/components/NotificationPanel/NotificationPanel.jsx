import React, { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  updateDoc,
  arrayRemove,
  addDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import "./NotificationPanel.css";
import { FaCheck, FaTimes } from "react-icons/fa";

const NotificationPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const user = auth.currentUser;
      if (user) {
        let userDoc;
        let userType;

        // Try fetching from Doctors collection
        userDoc = await getDoc(doc(firestore, "Doctors", user.uid));
        if (userDoc.exists()) {
          userType = "Doctor";
        } else {
          // Try fetching from Patients collection
          userDoc = await getDoc(doc(firestore, "Patients", user.uid));
          if (userDoc.exists()) {
            userType = "Patient";
          }
        }

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setNotifications(userData.notifications || []);
          setUserType(userType);
        }
      }
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (notification) => {
    const appointmentDetails = notification.appointmentDetails;
    const appointmentRef = collection(firestore, "ClinicAppointments");

    try {
      // Add appointment to ClinicAppointments
      await addDoc(appointmentRef, appointmentDetails);

      // Fetch the current user's data to get the avatar
      const currentUser = auth.currentUser;
      let currentUserData;
      let currentUserAvatar =
        "https://firebasestorage.googleapis.com/v0/b/dental-aaup.appspot.com/o/default.jpg?alt=media&token=cf0548b6-f7cb-410d-bd1d-f17a83b541d7";

      if (currentUser) {
        const doctorDoc = await getDoc(
          doc(firestore, "Doctors", currentUser.uid)
        );
        if (doctorDoc.exists()) {
          currentUserData = doctorDoc.data();
        } else {
          const patientDoc = await getDoc(
            doc(firestore, "Patients", currentUser.uid)
          );
          if (patientDoc.exists()) {
            currentUserData = patientDoc.data();
          }
        }

        if (currentUserData && currentUserData.image) {
          currentUserAvatar = currentUserData.image;
        }
      }

      // Send confirmation notification to the patient
      const patientNotification = {
        name: appointmentDetails.doctorName,
        avatar: currentUserAvatar, // Use the current user's avatar
        message: `Your appointment with Dr. ${appointmentDetails.doctorName} on ${appointmentDetails.day} at ${appointmentDetails.time} has been confirmed.`,
        timestamp: new Date(),
        read: false,
      };

      await updateDoc(doc(firestore, "Patients", appointmentDetails.userId), {
        notifications: arrayUnion(patientNotification),
      });

      // Remove notification from the doctor's notifications
      await updateDoc(doc(firestore, "Doctors", auth.currentUser.uid), {
        notifications: arrayRemove(notification),
      });

      setNotifications((prev) => prev.filter((n) => n !== notification));
    } catch (error) {
      console.error("Error accepting booking: ", error);
    }
  };

  const handleReject = async (notification) => {
    const appointmentDetails = notification.appointmentDetails;

    try {
      // Fetch the current user's data to get the avatar
      const currentUser = auth.currentUser;
      let currentUserData;
      let currentUserAvatar =
        "https://firebasestorage.googleapis.com/v0/b/dental-aaup.appspot.com/o/default.jpg?alt=media&token=cf0548b6-f7cb-410d-bd1d-f17a83b541d7";

      if (currentUser) {
        const doctorDoc = await getDoc(
          doc(firestore, "Doctors", currentUser.uid)
        );
        if (doctorDoc.exists()) {
          currentUserData = doctorDoc.data();
        } else {
          const patientDoc = await getDoc(
            doc(firestore, "Patients", currentUser.uid)
          );
          if (patientDoc.exists()) {
            currentUserData = patientDoc.data();
          }
        }

        if (currentUserData && currentUserData.image) {
          currentUserAvatar = currentUserData.image;
        }
      }

      // Send rejection notification to the patient
      const patientNotification = {
        name: appointmentDetails.doctorName,
        avatar: currentUserAvatar, // Use the current user's avatar
        message: `Your appointment with Dr. ${appointmentDetails.doctorName} on ${appointmentDetails.day} at ${appointmentDetails.time} has been rejected.`,
        timestamp: new Date(),
        read: false,
      };

      await updateDoc(doc(firestore, "Patients", appointmentDetails.userId), {
        notifications: arrayUnion(patientNotification),
      });

      // Remove notification from the doctor's notifications
      await updateDoc(doc(firestore, "Doctors", auth.currentUser.uid), {
        notifications: arrayRemove(notification),
      });

      setNotifications((prev) => prev.filter((n) => n !== notification));
    } catch (error) {
      console.error("Error rejecting booking: ", error);
    }
  };

  const handleDelete = async (notification) => {
    try {
      await updateDoc(
        doc(
          firestore,
          userType === "Doctor" ? "Doctors" : "Patients",
          auth.currentUser.uid
        ),
        {
          notifications: arrayRemove(notification),
        }
      );
      setNotifications((prev) => prev.filter((n) => n !== notification));
    } catch (error) {
      console.error("Error deleting notification: ", error);
    }
  };

  return (
    <div className="notification-panel">
      <div className="panel-header">
        <h5>Notifications</h5>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="panel-body">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification-card">
              <div className="notification-avatar">
                <img src={notification.avatar} alt="notification-avatar" />
              </div>
              <div className="notification-content">
                {/* <p className="notification-title">{notification.name}</p> */}
                <p className="notification-text">{notification.message}</p>
                {/* <p className="notification-time">
                  {new Date(notification.timestamp.toDate()).toLocaleString()}
                </p> */}
              </div>
              {userType === "Doctor" && (
                <div className="notification-actions">
                  <button
                    className="accept-button"
                    onClick={() => handleAccept(notification)}
                    title="Accept"
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleReject(notification)}
                    title="Reject"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              {userType === "Patient" && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(notification)}
                  title="Delete"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))
        ) : (
          <p style={{ fontFamily: "Sriracha", padding: "10px" }}>
            There are no notifications yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;

