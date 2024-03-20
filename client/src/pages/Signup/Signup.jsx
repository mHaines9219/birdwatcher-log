// SignUpForm.js
import { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5001/signup', formData)
      .then(() => {
        navigate('/birds');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        navigate('/birds');
      });
  };
  return (
    <>
      <h1 className="welcome-header">Welcome to the Bird Journal</h1>
      <h3 className="explanatory-header">
        A place for birders worldwide to log their sightings
      </h3>

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
        <button type="submit" value="Submit">
          Sign Up
        </button>
      </form>
      <Link to="/login"> Already signed up? Log in here</Link>
    </>
  );
};

export default SignUpForm;
