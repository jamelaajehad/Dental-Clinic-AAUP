// import React, { useState } from "react";
// import "./Login.css";
// import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Store user info in local storage
//       localStorage.setItem("user", JSON.stringify(user));

//       toast.success("Login successful!");
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     } catch (error) {
//       toast.error("Incorrect email or password.");
//       console.error("Error logging in: ", error);
//     }
//   };

//   return (
//     <div className="wrapper">
//       <ToastContainer />
//       <div className="login-container">
//         <form onSubmit={handleSubmit}>
//           <h1>Login</h1>
//           <div className="input-box">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <FaEnvelope className="icon" />
//           </div>
//           <div className="input-box">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FaLock className="icon" />
//           </div>
//           <div className="remember-forget">
//             <label>
//               <input type="checkbox" />
//               Remember me
//             </label>
//             <Link to="/forget-comp">Forget Password?</Link>
//           </div>
//           <button type="submit">Login</button>
//           <div className="register-link">
//             <p>
//               Don't have an account? <Link to="/register">Sign Up</Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from "react";
import "./Login.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Assuming user object contains userType property
      const userType = user.userType || "default"; // Set default value if userType is undefined

      // Store user info and userType in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", userType);

      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Incorrect email or password.");
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forget-comp">Forgot Password?</Link>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
