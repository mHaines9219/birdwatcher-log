import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5001/login', { username, password })
      .then((result) => {
        console.log(result);
        if (result.data === 'Success') {
          navigate('/birds');
        } else {
          navigate('/signup');
          alert('You are not registered to this service');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="welcome-header">Login</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input type="submit" value="Submit" />
      </form>
      <Link to="/signup">Not signed up? Click here</Link>
    </div>
  );
}
