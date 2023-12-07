import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #000000;
`;

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 100px; /* Adjust the size as needed */
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 40px; /* Increased padding for more space inside the form */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px; /* Increased width */
`;

const Title = styled.h2`
  color: #333333;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/api/login/', {
        username,
        password,
      });

      console.log('Login successful:', response.data);
      // Redirect or perform other actions on successful login
    } catch (error) {
      console.error('Login failed', error);
      // Handle login failure
    }
  };

  return (
    <LoginContainer>
      <LogoContainer>
        <LogoImage src="/Logo.png" alt="SCOPAI Logo" />
        <Title>SCOPAI</Title>
      </LogoContainer>
      <FormContainer>
        <Title>Login</Title>
        <Label>Username:</Label>
        <Input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />

        <Label>Password:</Label>
        <Input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

        <SubmitButton onClick={handleLogin}>Login</SubmitButton>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
