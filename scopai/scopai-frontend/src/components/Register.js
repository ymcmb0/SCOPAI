import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/api/register/', {
        email,
        username,
        password,
      });

      console.log('User registered:', response.data);
      // Redirect or perform other actions on successful registration
    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration failure
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>Email:</label>
      <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />

      <label>Username:</label>
      <input type="text" placeholder="Choose a username" onChange={(e) => setUsername(e.target.value)} />

      <label>Password:</label>
      <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
