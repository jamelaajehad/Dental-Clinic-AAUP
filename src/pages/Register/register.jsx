import React ,{useState} from 'react';
import './register.css';
import { FaUser, FaEnvelope, FaPhone,FaLock} from "react-icons/fa";
import {Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
   const[fullname,setfullname] = useState('')
   const[email,setemail] = useState('');
   const[phoneNumber,setphoneNumber] = useState('')
   const[studentId,setstudentId] = useState('')
   const [userType, setUserType] = useState('');
   const [gender, setGender] = useState('');
   const[password,setpassword] = useState('')
   const[cpassword,setcpassword] = useState('')
   const [message, setMessage] = useState('')
   const [isError, setIsError] = useState(false);
   const navigate = useNavigate()

   const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form validation or submission logic here
    setMessage('Registration successful! You can Log in.');
    setIsError(false);
}
   
    return(
    <div className="register">
       <div className="signup-container">
        <form onSubmit={handleSubmit}>
           <h1>Registration </h1>
           <div className='firstrow'>
             <div className="input-box1">
             <input type="text" name="fullname" placeholder='Fullname' required 
             value={fullname} onChange={(e)=>{setfullname(e.target.value)}}/>
             <FaUser className="icon1"/>
             </div>
             <div className="input-box1">
             <input type="email" name="email" placeholder='Email' required 
             value={email} onChange={(e)=>{setemail(e.target.value)}} />
             <FaEnvelope className="icon1"/>
             </div>
           </div>
           <div className="secrow"> 
            <div className="input-box2">
            <input type="text" name="phoneNumber" placeholder='Phone number' required
            value={phoneNumber} onChange={(e)=>{setphoneNumber(e.target.value)}} />
            <FaPhone className="icon2"/>
            </div>
            <div className="input-box2">
            <input type="text" name="studentId"  placeholder='Student ID(optional)'
             value={studentId} onChange={(e)=>{setstudentId(e.target.value)}} />
            <FaUser className="icon2"/>
          </div>
          </div>
          <div className="thirdrow">
            <div className="input-box3">
            <label>Are you:</label>
                <select value={userType}  onChange={(e) => setUserType(e.target.value)} required>
                  <option value="" disabled>Select an option</option>
                  <option value="patient">Patient</option>
                   <option value="doctor">Doctor</option>
                </select>
            </div>
             <div className="input-box3">
             <label>Gender:</label>
               <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="" disabled>Select an option</option>
                   <option value="male">Male</option>
                   <option value="female">Female</option>
                </select>
              </div>
              </div>
          <div className="input-box4">
            <input type="password" name="password" placeholder='Password' required
             value={password} onChange={(e)=>{setpassword(e.target.value)}} />
            <FaLock className="icon4"/>
          </div>
          <div className="input-box4">
            <input type="password" name="confirmPassword" placeholder='Confirm Password' required
            value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}} />
            <FaLock className="icon5"/>
          </div>
          <button type="submit" >Register</button>
          </form>
          {message && <p className={`message ${isError ? 'error' : 'success'}`}>{message}</p>}
          <div className="login-link">
            <p>Already have an account ? <Link to="/LoginForm">Log in</Link></p>
          </div>
     
      </div>
     </div>
  
    );
    
};


export default Register;