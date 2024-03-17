// SignUpForm.js
import React, { useState } from 'react';
import './Signup.css';

const SignUpForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <h1 className="welcome-header">Welcome to Matt's Bird Journal</h1>

      <form id="reg-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username-field"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          id="password-field"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
