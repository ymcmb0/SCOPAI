import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BorderedFormContainer = styled.div`
  border: 2px solid #cccccc;
  border-radius: 10px;
  width:30%;
  height:100vh;
  overflow: hidden;
`;

const LogoAndTextContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 50px;
  background-color: #f9f9f9;
`;

const LogoImage = styled.img`
  width: 80px; /* Adjust the size as needed */
  margin-left: 50px;
`;
const TitleL = styled.h2`
  color: #333333;
  text-align:center;
  margin: 10;

`;
const Title = styled.h2`
  color: #333333;
  text-align:center;
  margin: 10;
  margin-left: 120px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px; /* Increased padding for more space inside the form */
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
margin-left:120px;
  &:hover {
    background-color: black;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-top: 10px;
`;

const RegisterLink = styled.p`
  margin-top: 20px;
  font-size: 14px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', {
      email: email,
      password: password,
    });

    console.log('Login successful:', response.data);
   setError('');
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid email or password. Please try again.');
    }
};const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear the error when the user starts typing again
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear the error when the user starts typing again
    setError('');
  };

  return (
    <LoginContainer>
      <BorderedFormContainer>
        <LogoAndTextContainer>
          <LogoImage src="/Logologin.png" alt="SCOPAI Logo" />
          <TitleL>SCOPAI</TitleL>
        </LogoAndTextContainer>
        <FormContainer onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <Title>Login</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Label>Email:</Label>
           <Input type="text" placeholder="Enter your email" onChange={handleEmailChange} />
          <Label>Password:</Label>
           <Input type="password" placeholder="Enter your password" onChange={handlePasswordChange} />

          <SubmitButton onClick={handleLogin}>Login</SubmitButton>

          <RegisterLink>
            Not registered? <a href="/register">Register here</a>
          </RegisterLink>
           <RegisterLink>
            Goto Homepage <a href="/home">Click here</a>
          </RegisterLink>
        </FormContainer>
      </BorderedFormContainer>
    </LoginContainer>
  );
};

export default Login;
