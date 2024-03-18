import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100vh;
  background-image: url(\Home.png);
  background-size: cover;
  background-position: center;
`;

const BorderedFormContainer = styled.div`
  border: 2px solid #B1D4E0;
  width: 38%;
  height: 100vh;
  background-color: #B1D4E0;
  overflow: hidden;
  
`;

const TextContainer = styled.div`
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center; /* Align content horizontally to the center */
  padding: 10px;
`;


// const LogoImage = styled.img`
//   width: 80px;
//   margin-left: 65px;
  
// `;

const TitleL = styled.h1`
  color: #000000;
  font-size: 25px;
  text-align:center;
  margin-top: 120px;
  margin-bottom: 0px;
  
`;

const Title = styled.h2`
  color: #000000;
  text-align: center;
  margin-top: 10px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const Label = styled.label`
display: block;
margin-bottom: 7px;
text-align: left; /* Align the label text to the left */
width: 80%; /* Adjust the width if needed */
`;

const Input = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #0C2D48;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 80%;
  &:hover {
    background-color: #2E8BC0;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-top: 10px;
`;

const RegisterLink = styled.p`
  margin-top: 1px;
  font-size: 14px;
  margin-bottom: 0px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/home")
    }
  },[navigate]);

  const handleLogin = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email,
      password: password,
    });

    console.log('Login successful:', response);
    if(response.status === 200){
      localStorage.setItem("user",email)
      navigate("/home");
    }
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
        { <TextContainer>
          <TitleL>Sign into your account</TitleL>
        </TextContainer> }
        <FormContainer>
          <Title>Login</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {/* Your form inputs */}
          <Label>Email:</Label>
          <Input type='email' value={email} onChange={handleEmailChange} placeholder="Enter your email" />
          <Label>Password:</Label>
          <Input type='password' value={password} onChange={handlePasswordChange} placeholder="Enter your password" />

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
}

export default Login;
