import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Shimmer } from 'react-shimmer';
import LogoImage from './Logo.png';
import GalaxyBackground from './galaxybackground';

const LoginContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BorderedFormContainer = styled.div`
  width: 90%;
  position: relative;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.5); /* Transparent white background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #000;
  z-index: 1;
`;

const GalaxyBackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: black;
  height: 100%;
  z-index: 0; /* Ensure the GalaxyBackground is rendered behind other elements */
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoImg = styled.img`
  filter: invert(100%);
  width: 100px;
  height: 100px;
`;

const TextContainer = styled.div`
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const TitleL = styled.h1`
  color: #000000;
  font-size: 25px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0px;
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
  text-align: left;
  width: 80%;
`;

const Input = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #0c2d48;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 80%;
  &:hover {
    background-color: #2e8bc0;
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

const Forgetpass = styled.p`
  margin-top: 1px;
  font-size: 14px;
  margin-bottom: 0px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Initially set loading to true for shimmer effect

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Set loading to false after 1 second delay
    return () => clearTimeout(timer);
  }, []);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordStrong = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    if (!isEmailValid(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isPasswordStrong(password)) {
      setError('Password should have at least 8 characters.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem('user', email);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('subscribed_user', response.data.subscription_status);
        navigate('/');
      }

      setError('');
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError('An error occurred while processing your request.');
      }
      console.error('Login failed', error.response);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  return (
    <>
      <GalaxyBackgroundContainer>
        <GalaxyBackground />
      </GalaxyBackgroundContainer>
      <LoginContainer>
        {loading ? (
          <Shimmer width={500} height={500} />
        ) : (
          <BorderedFormContainer>
            <LogoContainer>
              <LogoImg src={LogoImage} alt="Logo" />
            </LogoContainer>
            <TextContainer>
              <TitleL>Sign into your account</TitleL>
            </TextContainer>
            <FormContainer>
              <TitleL>Login</TitleL>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Label>Email:</Label>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
              <Label>Password:</Label>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
              <SubmitButton onClick={handleLogin}>Login</SubmitButton>
              <RegisterLink>
                Not registered? <a href="/register">Register here</a>
              </RegisterLink>
              <Forgetpass>
                Forgot password? <a href="/forgot-password">Reset Password</a>
              </Forgetpass>
              <RegisterLink>
                Goto Homepage <a href="/">Click here</a>
              </RegisterLink>
            </FormContainer>
          </BorderedFormContainer>
        )}
      </LoginContainer>
    </>
  );
};

export default Login;
