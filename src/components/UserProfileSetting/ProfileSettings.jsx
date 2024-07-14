import React, { useState, useEffect } from "react";
import "./ProfileSettings.css";
import { toast } from "react-toastify"; // Ensure you have installed react-toastify

const ProfileSettings = ({
  onProfilePictureChange,
  onCancelChanges,
  onSaveChanges,
  currentFullname,
  currentProfilePicture,
  currentPhoneNumber,
}) => {
  const [fullname, setFullname] = useState(currentFullname);
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);
  const [profilePicture, setProfilePicture] = useState(currentProfilePicture);

  useEffect(() => {
    setFullname(currentFullname);
    setPhoneNumber(currentPhoneNumber);
    setProfilePicture(currentProfilePicture);
  }, [currentFullname, currentPhoneNumber, currentProfilePicture]);

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onProfilePictureChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    onSaveChanges({ fullname, profilePicture, phoneNumber });
    toast.success("Changes have been saved successfully");
  };

  return (
    <div className="profile-settings">
      <h3>Update Your Profile</h3>
      <form onSubmit={handleSaveChanges}>
        <div className="form-row">
          <label>
            Full Name:
            <input
              type="text"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Profile Picture:
            <input type="file" onChange={handleProfilePictureUpload} />
          </label>
          {profilePicture && (
            <img
              src={profilePicture}
              alt="Profile"
              style={{ width: "50px", height: "50px", borderRadius: "25px" }}
            />
          )}
        </div>
        <div className="button-container">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onCancelChanges}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
