// import React, { useState } from "react";
// import Footer from "../../components/Footer/footer";
// import MyBookings from "../../components/UserBooking/Mybooking";
// import ProfileSettings from "../../components/UserProfileSetting/ProfileSettings";
// import setting from "../../Asset/app-images/setting.png";
// import mybooking from "../../Asset/app-images/mybooking.png";
// import logout from "../../Asset/app-images/logout.png";
// import profilePic from "../../Asset/app-images/profilePic.png";
// import { useUser } from "../../contexts/UserContext";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../firebase"; // Adjust the import path as necessary
// import { signOut } from "firebase/auth";
// import "./userprofile.css";

// const UserProfile = () => {
//   const [activeSection, setActiveSection] = useState("profile");
//   const [profilePicture, setProfilePicture] = useState(profilePic);
//   const { setUser } = useUser();
//   const navigate = useNavigate();

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicture(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       localStorage.removeItem("user");
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.error("Error logging out: ", error);
//     }
//   };

//   return (
//     <div>
//       <div className="profileimage">
//         <h1 align="center">User Profile</h1>
//       </div>
//       <div className="Userprofile">
       
//         <div className="user-container">
//           <div className="items1">
//             <div className="profile-picture-container">
//               <img
//                 src={profilePicture}
//                 alt="Profile"
//                 style={{ width: "95px", height: "95px", borderRadius: "50px" }}
//                 className="profile-picture"
//               />
//             </div>
//             <ul className="ulitems">
//               <li onClick={() => setActiveSection("profile")}>
//                 <img
//                   src={setting}
//                   alt="#"
//                   style={{ width: "30px", height: "30px" }}
//                 />
//                 Profile Settings
//               </li>
//               <li onClick={() => setActiveSection("bookings")}>
//                 <img
//                   src={mybooking}
//                   alt="#"
//                   style={{ width: "30px", height: "30px" }}
//                 />
//                 My Bookings
//               </li>
//               <li onClick={handleLogout}>
//                 <img
//                   src={logout}
//                   alt="#"
//                   style={{ width: "30px", height: "30px" }}
//                 />
//                 Logout
//               </li>
//               <li onClick={""} style={{ color: "red" }}>
//                 Delete Account
//               </li>
//             </ul>
//           </div>
//           <div className="section-content">
//             {activeSection === "profile" && <ProfileSettings />}
//             {activeSection === "bookings" && <MyBookings />}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/footer";
import MyBookings from "../../components/UserBooking/Mybooking";
import ProfileSettings from "../../components/UserProfileSetting/ProfileSettings";
import setting from "../../Asset/app-images/setting.png";
import mybooking from "../../Asset/app-images/mybooking.png";
import logout from "../../Asset/app-images/logout.png";
import profilePic from "../../Asset/app-images/profilePic.png";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase"; // Adjust the import path as necessary
import { signOut, deleteUser } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import "./userprofile.css";
import { toast, ToastContainer } from 'react-toastify'; // Ensure you have installed react-toastify
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profilePicture, setProfilePicture] = useState(profilePic);
  const [username, setUsername] = useState('');
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const userDoc = await getDoc(doc(firestore, "Patients", auth.currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfilePicture(userData.image || "https://firebasestorage.googleapis.com/v0/b/dental-aaup.appspot.com/o/default.jpg?alt=media&token=cf0548b6-f7cb-410d-bd1d-f17a83b541d7");
        setUsername(userData.fullname || '');
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
    }
  };

  const handleProfilePictureChange = (newProfilePicture) => {
    setProfilePicture(newProfilePicture);
  };

  const handleSaveChanges = async (changes) => {
    try {
      const userDoc = doc(firestore, "Patients", auth.currentUser.uid);
      await updateDoc(userDoc, {
        username: changes.username,
        photoURL: changes.profilePicture,
        password: changes.password,
      });

      // Optionally update the user profile in auth
      await auth.currentUser.updateProfile({
        displayName: changes.username,
        photoURL: changes.profilePicture,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Error updating profile");
    }
  };

  const handleCancelChanges = () => {
    fetchUserProfile();
    toast.info("Changes have been canceled");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
      toast.error("Error logging out");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userDoc = doc(firestore, "Patients", auth.currentUser.uid);
      await deleteDoc(userDoc);
      await deleteUser(auth.currentUser);

      setUser(null);
      navigate("/");
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account: ", error);
      toast.error("Error deleting account");
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
          <div className="user-info">
          <img
            src={profilePicture}
            alt="Profile"
            style={{ width: "95px", height: "95px", borderRadius: "50px" }}
            className="profile-picture"
          />
          <h4>{username}</h4>
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
              <li onClick={handleDeleteAccount} style={{ color: "red" }}>
                Delete Account
              </li>
            </ul>
          </div>
          <div className="section-content">
            {activeSection === "profile" && (
              <ProfileSettings
                onProfilePictureChange={handleProfilePictureChange}
                onCancelChanges={handleCancelChanges}
                onSaveChanges={handleSaveChanges}
              />
            )}
            {activeSection === "bookings" && <MyBookings />}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
