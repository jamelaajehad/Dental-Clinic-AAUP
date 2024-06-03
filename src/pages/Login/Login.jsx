import React, { useState } from "react";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import "../ForgetPassword/forget-comp.jsx";
import { Link } from "react-router-dom";
import "../Register/register.jsx";
import "../home/home.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [Username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { Username, password })
      .then((result) => {
        /* console.log(result);*/
        if (result.data === "Success") {
          navigate("/");
        } else {
          setErrorMessage("Incorrect username or password.");
        }
      })
      .catch((err) => {
        setErrorMessage("Something went wrong. Please try again.");
        console.log(err);
      });
  };
  return (
    <div className="wrapper">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={Username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
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
            <FaLock className="icon" />
          </div>
          <div className="remember-forget">
            <label>
              {" "}
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/forget-comp">Forget Password ?</a>
          </div>
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="register-link">
            <p>
              Don't have an account ? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
