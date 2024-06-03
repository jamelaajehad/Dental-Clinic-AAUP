import React, { useState } from "react";
import "./register.css";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [studentId, setstudentId] = useState("");
  const [userType, setUserType] = useState("");
  const [gender, setGender] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const navigate = useNavigate();

  const auth = getAuth(app);
  const db = getFirestore(app);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-email":
        return "This email address is invalid.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled.";
      case "auth/weak-password":
        return "The password is too weak.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const collectionName = userType === "doctor" ? "Doctors" : "Patients";

      await setDoc(doc(db, collectionName, user.uid), {
        email: email,
        fullname: fullname,
        phoneNumber: phoneNumber,
        studentId: studentId,
        userType: userType,
        gender: gender,
      });

      toast.success("Registration successful! You can log in.");
      setTimeout(() => {
        navigate("/LoginForm");
      }, 2000);
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    }
  };

  return (
    <div className="register">
      <ToastContainer />
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <h1>Registration</h1>
          <div className="firstrow">
            <div className="input-box1">
              <input
                type="text"
                name="fullname"
                placeholder="Fullname"
                required
                value={fullname}
                onChange={(e) => {
                  setfullname(e.target.value);
                }}
              />
              <FaUser className="icon1" />
            </div>
            <div className="input-box1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <FaEnvelope className="icon1" />
            </div>
          </div>
          <div className="secrow">
            <div className="input-box2">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone number"
                required
                value={phoneNumber}
                onChange={(e) => {
                  setphoneNumber(e.target.value);
                }}
              />
              <FaPhone className="icon2" />
            </div>
            <div className="input-box2">
              <input
                type="text"
                name="studentId"
                placeholder="Student ID(optional)"
                value={studentId}
                onChange={(e) => {
                  setstudentId(e.target.value);
                }}
              />
              <FaUser className="icon2" />
            </div>
          </div>
          <div className="thirdrow">
            <div className="input-box3">
              <label>Are you:</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <div className="input-box3">
              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="input-box4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <FaLock className="icon4" />
          </div>
          <div className="input-box4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <FaLock className="icon5" />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="login-link">
          <p>
            Already have an account ? <Link to="/LoginForm">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
