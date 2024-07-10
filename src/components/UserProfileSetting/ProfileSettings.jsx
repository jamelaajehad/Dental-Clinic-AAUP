// import React from 'react';
// import './ProfileSettings.css';
// import { useState } from 'react';

// const ProfileSettings = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

 
  
  
//   return (
//     <div className="profile-settings" >
//       <h3>Update Your Profile</h3>
//       <form onSubmit={""}>
//       <div className="form-row">
//         <label>
//           Username:
//           <input type="text" name="username"  value={username} onChange={(e) => setUsername(e.target.value)}/>
//         </label>
//         </div>
//         <div className="form-row"> 
//         <label>
//         Change Phone:
//         <input type="tel" name="userPhone" />
//         </label>
//         <label>
//           Password:
//           <input type="password" name="password"value={password} onChange={(e) => setPassword(e.target.value)}  />
//         </label>
//         </div>
//         <div className="button-container">
//         <button type="submit">Save Changes</button>
//         </div>
//       </form>
//     </div>
//   );
// }
// export default ProfileSettings;

import React, { useState } from 'react';
import './ProfileSettings.css';
import { toast } from 'react-toastify'; // Ensure you have installed react-toastify

const ProfileSettings = ({ onProfilePictureChange, onCancelChanges, onSaveChanges }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        onProfilePictureChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Handle save changes logic
    onSaveChanges({ username, password, profilePicture });
    toast.success('Changes have been saved successfully');
  };

  return (
    <div className="profile-settings">
      <h3>Update Your Profile</h3>
      <form onSubmit={handleSaveChanges}>
        <div className="form-row">
          <label>
            Username:
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Change Phone:
            <input type="tel" name="userPhone" />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Profile Picture:
            <input type="file" onChange={handleProfilePictureChange} />
          </label>
          {profilePicture && <img src={profilePicture} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '25px' }} />}
        </div>
        <div className="button-container">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onCancelChanges}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
