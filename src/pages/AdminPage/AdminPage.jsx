// import React, { useState } from 'react';
// import './AdminPage.css';

// const Dashboard = () => (
//   <div>
//     <h2>Dashboard</h2>
//     <p>Welcome to the admin dashboard. Here you can find a summary of your system's key metrics.</p>
//     <div className="dashboard-widgets">
//       <div className="widget">
//         <h3>Total Users</h3>
//         <p>100</p>
//       </div>
//       <div className="widget">
//         <h3>Active Appointments</h3>
//         <p>50</p>
//       </div>
//       <div className="widget">
//         <h3>System Alerts</h3>
//         <p>3</p>
//       </div>
//     </div>
//   </div>
// );

// const ManagePatients = () => (
//   <div>
//     <h2>Manage Patients</h2>
//     <p>Here you can create, edit, or delete patient accounts.</p>
//     <table>
//       <thead>
//         <tr>
//           <th>Username</th>
//           <th>Email</th>
//           <th>Role</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>john_doe</td>
//           <td>john@example.com</td>
//           <td>Admin</td>
//           <td>
//             <button className="action-btn">Edit</button>
//             <button className="action-btn">Delete</button>
//           </td>
//         </tr>
//         <tr>
//           <td>jane_doe</td>
//           <td>jane@example.com</td>
//           <td>User</td>
//           <td>
//             <button className="action-btn">Edit</button>
//             <button className="action-btn">Delete</button>
//           </td>
//         </tr>
//         {/* Add more users here */}
//       </tbody>
//     </table>
//   </div>
// );

// const ManageDoctors = () => (
//   <div>
//     <h2>Manage Doctors</h2>
//     <p>Here you can create, edit, or delete doctor profiles.</p>
//     <table>
//       <thead>
//         <tr>
//           <th>Doctor Name</th>
//           <th>Email</th>
//           <th>Specialization</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>Dr. Smith</td>
//           <td>smith@example.com</td>
//           <td>Dentist</td>
//           <td>
//             <button className="action-btn">Edit</button>
//             <button className="action-btn">Delete</button>
//           </td>
//         </tr>
//         <tr>
//           <td>Dr. Jane</td>
//           <td>jane@example.com</td>
//           <td>Orthodontist</td>
//           <td>
//             <button className="action-btn">Edit</button>
//             <button className="action-btn">Delete</button>
//           </td>
//         </tr>
//         {/* Add more doctors here */}
//       </tbody>
//     </table>
//   </div>
// );

// const ManageContent = () => (
//   <div>
//     <h1>Manage Content</h1>
//     <p>Here you can add, edit, or delete website content.</p>
//     <div className="content-list">
//       <table>
//         <thead>
//           <tr>
//             <th>Content Title</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Home Page</td>
//             <td>
//               <button className="action-btn">Edit</button>
//             </td>
//           </tr>
//           <tr>
//             <td>About Us</td>
//             <td>
//               <button className="action-btn">Edit</button>
//             </td>
//           </tr>
//           {/* Add more content items here */}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// // const Settings = () => (
// //   <div>
// //     <h1>Settings</h1>
// //     <p>Configure your system settings here.</p>
// //     <form className='setting'>
// //       <label>
// //         Site Name:
// //         <input type="text" defaultValue="My Website" />
// //       </label>
// //       <label>
// //         Admin Email:
// //         <input type="email" defaultValue="admin@example.com" />
// //       </label>
// //       <button type="submit" className="action-btn">Save Settings</button>
// //     </form>
// //   </div>
// // );



// const AdminPage = () => {
//   const [activeComponent, setActiveComponent] = useState('Dashboard');

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'Dashboard':
//         return <Dashboard />;
//       case 'ManagePatients':
//         return <ManagePatients />;
//       case 'ManageDoctors':
//         return <ManageDoctors />;
//       case 'ManageContent':
//         return <ManageContent />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="admin-wrapper">
//       <div className="admin-sidebar">
//         <h2>Admin Panel</h2>
//         <ul>
//           <li><button onClick={() => setActiveComponent('Dashboard')}>Dashboard</button></li>
//           <li><button onClick={() => setActiveComponent('ManagePatients')}>Manage Patients</button></li>
//           <li><button onClick={() => setActiveComponent('ManageDoctors')}>Manage Doctors</button></li>
//           <li><button onClick={() => setActiveComponent('ManageContent')}>Manage content</button></li>
//         </ul>
//       </div>
//       <div className="admin-content">
//         {renderComponent()}
//       </div>
//     </div>
//   );
// }

// export default AdminPage;

import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase"; // تأكد من أن مسار الاستيراد صحيح
import './AdminPage.css';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeAppointments, setActiveAppointments] = useState(0);
  const [systemAlerts, setSystemAlerts] = useState(0);

  useEffect(() => {
    // Fetch data for dashboard
    const fetchData = async () => {
      const usersSnapshot = await getDocs(collection(firestore, "Patients"));
      setTotalUsers(usersSnapshot.size);

      const appointmentsSnapshot = await getDocs(collection(firestore, "ClinicAppointments"));
      setActiveAppointments(appointmentsSnapshot.size);

      // Fetch system alerts logic here
      setSystemAlerts(3); // Placeholder
    };
    fetchData();
  }, []);

  return (
    <div className='Dashboard'>
      <h2>Dashboard</h2>
      <p>Welcome to the admin dashboard. Here you can find a summary of your system's key metrics.</p>
      <div className="dashboard-widgets">
        <div className="widget">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
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
      const patientsList = patientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(patientsList);
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "Patients", id));
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const handleEdit = (id) => {
    // Logic for editing a patient
    console.log("Edit patient with id:", id);
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
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.fullname}</td>
              <td>{patient.email}</td>
              <td>Patient</td>
              <td>
                <button className="action-btn" onClick={() => handleEdit(patient.id)}>Edit</button>
                <button className="action-btn" onClick={() => handleDelete(patient.id)}>Delete</button>
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
      const doctorsList = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(doctorsList);
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "Doctors", id));
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  const handleEdit = (id) => {
    // Logic for editing a doctor
    console.log("Edit doctor with id:", id);
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
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td>{doctor.fullname}</td>
              <td>{doctor.email}</td>
              <td>{doctor.Specialization}</td>
              <td>
                <button className="action-btn" onClick={() => handleEdit(doctor.id)}>Edit</button>
                <button className="action-btn" onClick={() => handleDelete(doctor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ManageContent = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      const contentsSnapshot = await getDocs(collection(firestore, "Content"));
      const contentsList = contentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContents(contentsList);
    };
    fetchContents();
  }, []);

  const handleEdit = (id) => {
    // Logic for editing content
    console.log("Edit content with id:", id);
  };

  return (
    <div>
      <h1>Manage Content</h1>
      <p>Here you can add, edit, or delete website content.</p>
      <div className="content-list">
        <table>
          <thead>
            <tr>
              <th>Content Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contents.map(content => (
              <tr key={content.id}>
                <td>{content.title}</td>
                <td>
                  <button className="action-btn" onClick={() => handleEdit(content.id)}>Edit</button>
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
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'ManagePatients':
        return <ManagePatients />;
      case 'ManageDoctors':
        return <ManageDoctors />;
      case 'ManageContent':
        return <ManageContent />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><button onClick={() => setActiveComponent('Dashboard')}>Dashboard</button></li>
          <li><button onClick={() => setActiveComponent('ManagePatients')}>Manage Patients</button></li>
          <li><button onClick={() => setActiveComponent('ManageDoctors')}>Manage Doctors</button></li>
          <li><button onClick={() => setActiveComponent('ManageContent')}>Manage content</button></li>
        </ul>
      </div>
      <div className="admin-content">
        {renderComponent()}
      </div>
    </div>
  );
}

export default AdminPage;
 