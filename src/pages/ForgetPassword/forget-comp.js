import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './forget-comp.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Request sent for password reset for email:', email);
    setSubmitted(true);
  };

  return (
    <div className="forget-comp-container">
      <form onSubmit={handleSubmit}>
        <h1>Forget Password</h1>
        {submitted ? (
          <p>An email has been sent with instructions to reset your password.</p>
        ) : (
          <>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={handleChange} required />
            <button type="submit">Reset Password</button>
          </>
        )}
      </form>
      <div className="login-link">
        <p>Remembered your password? <Link to="/LoginForm">Log in</Link></p>

      </div>
    </div>
  );
};

export default ForgotPassword;