
import React  from "react";
import Footer from '../../components/Footer/footer';
import './userprofile.css';
import { useState } from "react";
import MyBookings from '../../components/MyBooking/Mybooking';
import ProfileSettings from "../../components/UserProfileSetting/ProfileSettings";
import setting from "../../Asset/app-images/setting.png";
import  mybooking from "../../Asset/app-images/mybooking.png";
import logout from "../../Asset/app-images/logout.png";
import profilePic from "../../Asset/app-images/profilePic.png";
const UserProfile = () => { 
    
    const [activeSection, setActiveSection] = useState('profile'); 
    const [profilePicture, setProfilePicture] = useState(profilePic);
    const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/LoginForm'; 
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return ( 
        <div>
        <div className="Userprofile ">
             <h4 className="myaccount"> My Account </h4>
             <div className="user-container">
              <div className="items"> 
              <div className="profile-picture-container">
                <img src={profilePicture} alt="Profile" style={{ width: '75px', height: '75px' }}  className="profile-picture" />
             </div>
               <ul className="ulitems">
                 <li onClick={() => setActiveSection('profile')}>
                 <img src={setting} alt="#" style={{ width: '30px', height: '30px' }} />
                    Profile Settings</li>
                 <li onClick={() => setActiveSection('bookings')}>
                 <img src={mybooking} alt="#" style={{ width: '30px', height: '30px' }} />
                    My Bookings</li>
                 <li onClick={handleLogout}>
                 <img src={logout} alt="#" style={{ width: '30px', height: '30px' }} />
                    Logout</li>
                 <li onClick={""} style={{ color: 'red' }}>Delete Account</li>
               </ul>  
              </div>
              <div className="section-content">
                 {activeSection === 'profile' && <ProfileSettings/> }
                 {activeSection === 'bookings' && <MyBookings /> }
              </div>
           </div>
         
        </div> 
        < Footer/> 
    </div>
    ); 
}
export default UserProfile; 
