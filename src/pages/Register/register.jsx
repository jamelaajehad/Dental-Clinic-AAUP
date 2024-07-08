

/*import React, { useState } from "react";
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
  const [idNumber, setIdNumber] = useState(""); 
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

      // Construct the user data object
      const userData = {
        email: email,
        fullname: fullname,
        phoneNumber: phoneNumber,
        idNumber :idNumber ,
        userType: userType,
        gender: gender,
      };

      if (userType === "doctor") {
        userData.flag = false; // Or set based on your logic
        userData.isPrimaryExaminationDoctor = true; // Or set based on your logic or criteria
      }

      await setDoc(doc(db, collectionName, user.uid), userData);

      toast.success("Registration successful! Please log in.");
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
                name="idNumber"
                placeholder="ID Number"
                value={idNumber }
                onChange={(e) => {
                  setIdNumber(e.target.value);
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

export default Register;*/

/*import React, { useState } from "react";
import "./register.css";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isPrimaryExaminationDoctor, setIsPrimaryExaminationDoctor] = useState(""); 

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

      // Construct the user data object
      const userData = {
        email: email,
        fullname: fullname,
        phoneNumber: phoneNumber,
        idNumber: idNumber,
        userType: userType,
        gender: gender,
        isPrimaryExaminationDoctor: isPrimaryExaminationDoctor, // Include the new field
      };

      if (userType === "doctor") {
        userData.flag = false; // Or set based on your logic
      }

      await setDoc(doc(db, collectionName, user.uid), userData);

      toast.success("Registration successful! Please log in.");
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
                onChange={(e) => setFullname(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <FaPhone className="icon2" />
            </div>
            <div className="input-box2">
              <input
                type="text"
                name="idNumber"
                placeholder="ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
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
          {userType === "doctor" && (
            <div className="input-box3">
              <label>
                Primary Examination Doctor:
                <input
                  type="checkbox"
                  checked={isPrimaryExaminationDoctor}
                  onChange={(e) =>
                    setIsPrimaryExaminationDoctor(e.target.checked)
                  }
                />
              </label>
            </div>
          )}
          <div className="input-box4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setCpassword(e.target.value)}
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
export default Register;*/

// import React, { useState } from "react";
// import "./register.css";
// import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { app } from "../../firebase.js";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Register = () => {
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [idNumber, setIdNumber] = useState("");
//   const [userType, setUserType] = useState("");
//   const [gender, setGender] = useState("");
//   const [password, setPassword] = useState("");
//   const [cpassword, setCpassword] = useState("");
//   const [isPrimaryExaminationDoctor, setIsPrimaryExaminationDoctor] = useState(false);

//   const navigate = useNavigate();
//   const auth = getAuth(app);
//   const db = getFirestore(app);

//   const getErrorMessage = (errorCode) => {
//     switch (errorCode) {
//       case "auth/email-already-in-use":
//         return "This email is already in use.";
//       case "auth/invalid-email":
//         return "This email address is invalid.";
//       case "auth/operation-not-allowed":
//         return "Email/password accounts are not enabled.";
//       case "auth/weak-password":
//         return "The password is too weak.";
//       default:
//         return "An unexpected error occurred. Please try again.";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== cpassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const collectionName = userType === "doctor" ? "Doctors" : "Patients";

//       const userData = {
//         email: email,
//         fullname: fullname,
//         phoneNumber: phoneNumber,
//         idNumber: idNumber,
//         userType: userType,
//         gender: gender,
//       };

//       if (userType === "doctor") {
//         userData.isPrimaryExaminationDoctor = isPrimaryExaminationDoctor;
//       }

//       localStorage.setItem("userType", userType);
//       await setDoc(doc(db, collectionName, user.uid), userData);

//       toast.success("Registration successful!");
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     } catch (error) {
//       toast.error(getErrorMessage(error.code));
//     }
//   };

//   return (
//     <div className="register">
//       <ToastContainer />
//       <div className="signup-container" style={{ height: userType === "doctor" ? '600px' : '550px' }}>
//         <form onSubmit={handleSubmit}>
//           <h1>Registration</h1>
//           <div className="firstrow">
//             <div className="input-box1">
//               <input
//                 type="text"
//                 name="fullname"
//                 placeholder="Fullname"
//                 required
//                 value={fullname}
//                 onChange={(e) => setFullname(e.target.value)}
//               />
//               <FaUser className="icon1" />
//             </div>
//             <div className="input-box1">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <FaEnvelope className="icon1" />
//             </div>
//           </div>
//           <div className="secrow">
//             <div className="input-box2">
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 placeholder="Phone number"
//                 required
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//               <FaPhone className="icon2" />
//             </div>
//             <div className="input-box2">
//               <input
//                 type="text"
//                 name="idNumber"
//                 placeholder="ID Number"
//                 value={idNumber}
//                 onChange={(e) => setIdNumber(e.target.value)}
//               />
//               <FaUser className="icon2" />
//             </div>
//           </div>
//           <div className="thirdrow">
//             <div className="input-box3">
//               <label>Are you:</label>
//               <select
//                 value={userType}
//                 onChange={(e) => setUserType(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>
//                   Select an option
//                 </option>
//                 <option value="patient">Patient</option>
//                 <option value="doctor">Doctor</option>
//               </select>
//             </div>
//             <div className="input-box3">
//               <label>Gender:</label>
//               <select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>
//                   Select an option
//                 </option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>
//           </div>
//           {userType === "doctor" && (
//             <div className="input-box3">
//               <label>
//                 Primary Examination Doctor:
//                 <input
//                   type="checkbox"
//                   checked={isPrimaryExaminationDoctor}
//                   onChange={(e) =>
//                     setIsPrimaryExaminationDoctor(e.target.checked)
//                   }
//                 />
//               </label>
//             </div>
//           )}
//           <div className="input-box4">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FaLock className="icon4" />
//           </div>
//           <div className="input-box4">
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               required
//               value={cpassword}
//               onChange={(e) => setCpassword(e.target.value)}
//             />
//             <FaLock className="icon5" />
//           </div>
//           <button type="submit">Register</button>
//         </form>
//         <div className="login-link">
//           <p>
//             Already have an account ? <Link to="/LoginForm">Log in</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register; 
import React, { useState } from "react";
import "./register.css";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDocs, query, collection, where } from "firebase/firestore";
import { app } from "../../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isPrimaryExaminationDoctor, setIsPrimaryExaminationDoctor] = useState(false);

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
        return `An unexpected error occurred: ${errorCode}`;
    }
  };

  const isIdNumberUnique = async (idNumber) => {
    try {
      const collectionName = userType === "doctor" ? "Doctors" : "Patients";
      const q = query(collection(db, collectionName), where("idNumber", "==", idNumber));
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    } catch (error) {
      toast.error(`Error checking ID number uniqueness: ${error.message}`);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (idNumber.length < 9) {
      toast.error("ID Number must be at least 9 digits long!");
      return;
    }

    try {
      const isUnique = await isIdNumberUnique(idNumber);
      if (!isUnique) {
        toast.error("ID Number already in use!");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const collectionName = userType === "doctor" ? "Doctors" : "Patients";

      const userData = {
        email: email,
        fullname: fullname,
        phoneNumber: phoneNumber,
        idNumber: idNumber,
        userType: userType,
        gender: gender,
      };

      if (userType === "doctor") {
        userData.isPrimaryExaminationDoctor = isPrimaryExaminationDoctor;
      }

      localStorage.setItem("userType", userType);
      await setDoc(doc(db, collectionName, user.uid), userData);

      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    }
  };

  return (
    <div className="register">
      <ToastContainer />
      <div className="signup-container" style={{ height: userType === "doctor" ? '600px' : '550px' }}>
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
                onChange={(e) => setFullname(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <FaPhone className="icon2" />
            </div>
            <div className="input-box2">
              <input
                type="text"
                name="idNumber"
                placeholder="ID Number"
                required
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
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
          {userType === "doctor" && (
            <div className="input-box3">
              <label>
                Primary Examination Doctor:
                <input
                  type="checkbox"
                  checked={isPrimaryExaminationDoctor}
                  onChange={(e) =>
                    setIsPrimaryExaminationDoctor(e.target.checked)
                  }
                />
              </label>
            </div>
          )}
          <div className="input-box4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setCpassword(e.target.value)}
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

