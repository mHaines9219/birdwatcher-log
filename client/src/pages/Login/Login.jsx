import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to your server with the form data
    console.log(username, password);
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
