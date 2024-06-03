import React, { useState } from 'react';
import './AdminPage.css';

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to the admin dashboard. Here you can find a summary of your system's key metrics.</p>
    <div className="dashboard-widgets">
      <div className="widget">
        <h3>Total Users</h3>
        <p>100</p>
      </div>
      <div className="widget">
        <h3>Active Appointments</h3>
        <p>50</p>
      </div>
      <div className="widget">
        <h3>System Alerts</h3>
        <p>3</p>
      </div>
    </div>
  </div>
);

const ManageUsers = () => (
  <div>
    <h1>Manage Users</h1>
    <p>Here you can create, edit, or delete user accounts.</p>
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
        <tr>
          <td>john_doe</td>
          <td>john@example.com</td>
          <td>Admin</td>
          <td>
            <button className="action-btn">Edit</button>
            <button className="action-btn">Delete</button>
          </td>
        </tr>
        <tr>
          <td>jane_doe</td>
          <td>jane@example.com</td>
          <td>User</td>
          <td>
            <button className="action-btn">Edit</button>
            <button className="action-btn">Delete</button>
          </td>
        </tr>
        {/* Add more users here */}
      </tbody>
    </table>
  </div>
);

const ManageDoctors = () => (
  <div>
    <h1>Manage Doctors</h1>
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
        <tr>
          <td>Dr. Smith</td>
          <td>smith@example.com</td>
          <td>Dentist</td>
          <td>
            <button className="action-btn">Edit</button>
            <button className="action-btn">Delete</button>
          </td>
        </tr>
        <tr>
          <td>Dr. Jane</td>
          <td>jane@example.com</td>
          <td>Orthodontist</td>
          <td>
            <button className="action-btn">Edit</button>
            <button className="action-btn">Delete</button>
          </td>
        </tr>
        {/* Add more doctors here */}
      </tbody>
    </table>
  </div>
);

const ManageContent = () => (
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
          <tr>
            <td>Home Page</td>
            <td>
              <button className="action-btn">Edit</button>
            </td>
          </tr>
          <tr>
            <td>About Us</td>
            <td>
              <button className="action-btn">Edit</button>
            </td>
          </tr>
          {/* Add more content items here */}
        </tbody>
      </table>
    </div>
  </div>
);

const Settings = () => (
  <div>
    <h1>Settings</h1>
    <p>Configure your system settings here.</p>
    <form className='setting'>
      <label>
        Site Name:
        <input type="text" defaultValue="My Website" />
      </label>
      <label>
        Admin Email:
        <input type="email" defaultValue="admin@example.com" />
      </label>
      <button type="submit" className="action-btn">Save Settings</button>
    </form>
  </div>
);

const ActivityLog = () => (
  <div>
    <h1>Activity Log</h1>
    <p>View the recent activities performed in the system.</p>
    <ul>
      <li>User "john_doe" logged in at 10:00 AM</li>
      <li>User "jane_doe" created a new appointment at 10:15 AM</li>
      <li>User "admin" updated system settings at 10:30 AM</li>
      {/* Add more log items here */}
    </ul>
  </div>
);

const SystemNotifications = () => (
  <div>
    <h1>System Notifications</h1>
    <p>View the system notifications.</p>
    <ul>
      <li>Database backup completed successfully.</li>
      <li>New user registration: john_doe.</li>
      <li>System update available.</li>
      {/* Add more notifications here */}
    </ul>
  </div>
);

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'ManageUsers':
        return <ManageUsers />;
      case 'ManageDoctors':
        return <ManageDoctors />;
      case 'ManageContent':
        return <ManageContent />;
      case 'Settings':
        return <Settings />;
      case 'ActivityLog':
        return <ActivityLog />;
      case 'SystemNotifications':
        return <SystemNotifications />;
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
          <li><button onClick={() => setActiveComponent('ManageUsers')}>Manage Users</button></li>
          <li><button onClick={() => setActiveComponent('ManageDoctors')}>Manage Doctors</button></li>
          <li><button onClick={() => setActiveComponent('ManageContent')}>Manage Content</button></li>
          <li><button onClick={() => setActiveComponent('Settings')}>Settings</button></li>
          <li><button onClick={() => setActiveComponent('ActivityLog')}>Activity Log</button></li>
          <li><button onClick={() => setActiveComponent('SystemNotifications')}>System Notifications</button></li>
        </ul>
      </div>
      <div className="admin-content">
        {renderComponent()}
      </div>
    </div>
  );
}

export default AdminPage;
