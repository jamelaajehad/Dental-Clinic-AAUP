import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "./AdminPage.css";

const Dashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [activeAppointments, setActiveAppointments] = useState(0);
  const [systemAlerts, setSystemAlerts] = useState(0);

  useEffect(() => {
    // Fetch data for dashboard
    const fetchData = async () => {
      const patientsSnapshot = await getDocs(collection(firestore, "Patients"));
      setTotalPatients(patientsSnapshot.size); // Updated to show total patients

      const doctorsSnapshot = await getDocs(collection(firestore, "Doctors"));
      setTotalDoctors(doctorsSnapshot.size); // Fetch and set total doctors

      const appointmentsSnapshot = await getDocs(
        collection(firestore, "ClinicAppointments")
      );
      setActiveAppointments(appointmentsSnapshot.size);

      // Fetch system alerts logic here
      setSystemAlerts(3); // Placeholder
    };

    fetchData();
  }, []);

  return (
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <p>
        Welcome to the admin dashboard. Here you can find a summary of your
        system's key metrics.
      </p>
      <div className="dashboard-widgets">
        <div className="widget">
          <h3>Total Patients</h3>
          <p>{totalPatients}</p>
        </div>
        <div className="widget">
          <h3>Total Doctors</h3>
          <p>{totalDoctors}</p>
        </div>
        <div className="widget">
          <h3>Active Appointments</h3>
          <p>{activeAppointments}</p>
        </div>
        <div className="widget">
          <h3>System Alerts</h3>
          <p>{systemAlerts}</p>
        </div>
      </div>
    </div>
  );
};

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const patientsSnapshot = await getDocs(collection(firestore, "Patients"));
      const patientsList = patientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(patientsList);
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    toast(
      <div className="toast-confirmation">
        Are you sure you want to delete this patient?
        <div className="toast-buttons">
          <button
            className="toast-button toast-button-yes"
            onClick={async () => {
              await deleteDoc(doc(firestore, "Patients", id));
              setPatients(patients.filter((patient) => patient.id !== id));
              toast.dismiss();
              toast.success("Patient deleted successfully");
            }}
          >
            Yes
          </button>
          <button
            className="toast-button toast-button-no"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
      }
    );
  };

  return (
    <div>
      <h2>Manage Patients</h2>
      <p>Here you can create, edit, or delete patient accounts.</p>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.fullname}</td>
              <td>{patient.email}</td>
              <td>Patient</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(patient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsSnapshot = await getDocs(collection(firestore, "Doctors"));
      const doctorsList = doctorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDoctors(doctorsList);
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    toast(
      <div className="toast-confirmation">
        Are you sure you want to delete this doctor?
        <div className="toast-buttons">
          <button
            className="toast-button toast-button-yes"
            onClick={async () => {
              await deleteDoc(doc(firestore, "Doctors", id));
              setDoctors(doctors.filter((doctor) => doctor.id !== id));
              toast.dismiss();
              toast.success("Doctor deleted successfully");
            }}
          >
            Yes
          </button>
          <button
            className="toast-button toast-button-no"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
      }
    );
  };

  return (
    <div>
      <h2>Manage Doctors</h2>
      <p>Here you can create, edit, or delete doctor profiles.</p>
      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.fullname}</td>
              <td>{doctor.email}</td>
              <td>{doctor.Specialization}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(doctor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const feedbacksSnapshot = await getDocs(
        collection(firestore, "Feedback")
      );
      const feedbacksList = feedbacksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbacks(feedbacksList);
    };
    fetchFeedbacks();
  }, []);

  const handleEdit = (id) => {
    // Logic for editing feedback
    console.log("Edit feedback with id:", id);
  };

  return (
    <div>
      <h2>Manage Feedback</h2>
      <p>Here you can add, edit, or delete feedback.</p>
      <div className="feedback-list">
        <table>
          <thead>
            <tr>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.content}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => handleEdit(feedback.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Using the imported signOut and auth
      navigate("/LoginForm"); // Redirecting to login page after logout
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "ManagePatients":
        return <ManagePatients />;
      case "ManageDoctors":
        return <ManageDoctors />;
      case "Feedback":
        return <Feedback />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-wrapper">
      <ToastContainer />
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <button onClick={() => setActiveComponent("Dashboard")}>
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent("ManagePatients")}>
              Manage Patients
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent("ManageDoctors")}>
              Manage Doctors
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent("Feedback")}>
              Manage Feedback
            </button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div className="admin-content">{renderComponent()}</div>
    </div>
  );
};

export default AdminPage;
