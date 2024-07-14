import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import MyBookings from "../../components/UserBooking/MyBooking";
import ProfileSettings from "../../components/UserProfileSetting/ProfileSettings";
import setting from "../../Asset/app-images/setting.png";
import mybooking from "../../Asset/app-images/mybooking.png";
import logout from "../../Asset/app-images/logout.png";
import profilePic from "../../Asset/app-images/profilePic.png";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { auth, firestore, storage } from "../../firebase";
import { signOut, deleteUser, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./userprofile.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profilePicture, setProfilePicture] = useState(profilePic);
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.uid) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.uid) {
        console.error("User is not authenticated or does not have a UID");
        return;
      }
      const userDoc = await getDoc(doc(firestore, "Patients", currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfilePicture(userData.image || profilePic);
        setFullname(userData.fullname || "");
        setPhoneNumber(userData.phoneNumber || "");
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
    }
  };

  const handleProfilePictureChange = async (newProfilePictureFile) => {
    setProfilePictureFile(newProfilePictureFile);
    if (newProfilePictureFile) {
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, newProfilePictureFile);
      const downloadURL = await getDownloadURL(storageRef);
      setProfilePicture(downloadURL);
    }
  };

  const handleSaveChanges = async (changes) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.uid) {
        console.error("User is not authenticated or does not have a UID");
        return;
      }

      if (profilePictureFile) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, profilePictureFile);
        const downloadURL = await getDownloadURL(storageRef);
        changes.profilePicture = downloadURL;
      }

      const userDoc = doc(firestore, "Patients", currentUser.uid);
      await updateDoc(userDoc, {
        fullname: changes.fullname,
        image: changes.profilePicture,
        phoneNumber: changes.phoneNumber,
      });
      console.log("Document successfully updated!");

      await updateProfile(currentUser, {
        displayName: changes.fullname,
        photoURL: changes.profilePicture,
      });
      console.log("User profile successfully updated!");

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Error updating profile.");
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
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.uid) {
        console.error("User is not authenticated or does not have a UID");
        return;
      }

      const userDoc = doc(firestore, "Patients", currentUser.uid);
      await deleteDoc(userDoc);
      await deleteUser(currentUser);

      setUser(null);
      navigate("/");
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account: ", error);
      toast.error("Error deleting account");
    }
  };

  return (
    <div className="back-colorProfile">
      <div className="UserProfile">
        <div className="user-container">
          <div className="items1">
            <div className="user-info">
              <img
                src={profilePicture}
                alt="Profile"
                style={{ width: "95px", height: "95px", borderRadius: "50px" }}
                className="profile-picture"
              />
              <h4>{fullname}</h4>
            </div>
            <ul className="ulitems">
              <li onClick={() => setActiveSection("profile")}>
                <img
                  src={setting}
                  alt="Settings"
                  style={{ width: "30px", height: "30px" }}
                />
                Profile Settings
              </li>
              <li onClick={() => setActiveSection("bookings")}>
                <img
                  src={mybooking}
                  alt="My Bookings"
                  style={{ width: "30px", height: "30px" }}
                />
                My Bookings
              </li>
              <li onClick={handleLogout}>
                <img
                  src={logout}
                  alt="Logout"
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
                currentFullname={fullname}
                currentProfilePicture={profilePicture}
                currentPhoneNumber={phoneNumber}
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
