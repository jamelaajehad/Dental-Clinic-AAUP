import React from 'react';
import './ProfileSettings.css';
import { useState } from 'react';

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 /* const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
       
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleDeleteProfilePicture = () => {
    setProfilePicture(null); // إزالة صورة الملف الشخصي
    // يمكنك هنا إضافة كود لحذف الصورة من قاعدة البيانات
  };

  const handleSubmit= (e) => {
    e.preventDefault();
    console.log('Profile Updated', { username, email, password });
  };
*/
  
  
  return (
    <div className="profile-settings" >
      <h3>Update Your Profile</h3>
      <form onSubmit={""}>
      <div className="form-row">
        <label>
          Username:
          <input type="text" name="username"  value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        </div>
        <div className="form-row"> 
        <label>
        Change Phone:
        <input type="tel" name="userPhone" />
        </label>
        <label>
          Password:
          <input type="password" name="password"value={password} onChange={(e) => setPassword(e.target.value)}  />
        </label>
        </div>
        <div className="button-container">
        <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
export default ProfileSettings;