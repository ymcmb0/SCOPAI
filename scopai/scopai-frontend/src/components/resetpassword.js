import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate, useParams } from 'react-router-dom';
import { Shimmer } from 'react-shimmer';
import GalaxyBackground from './galaxybackground';

// Styled components
const ResetPasswordContainer = styled.div`
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
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #000;
  z-index: 1;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border: 1px solid ;
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

const ResetPassword = () => {
  const { token, uidb64 } = useParams();
  const [newpassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("uidb64:", uidb64);
console.log("token:", token);
    try {
       const response = await axios.post(`http://localhost:8000/api/password/reset/confirm/?${uidb64}&${token}`, {
      newpassword
    });
      // Assuming the backend response includes a success message
           setError(response.data.detail);
 navigate('/login');
    } catch (error) {
      setError('Failed to reset password. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <>
      <GalaxyBackground />
      <ResetPasswordContainer>
        <BorderedFormContainer>
          <LogoContainer>
            <LogoImg src="/Logo.png" alt="Logo" />
          </LogoContainer>
          <TextContainer>
            <TitleL>Reset Password</TitleL>
          </TextContainer>
          <Form onSubmit={handleSubmit}>
            {loading ? (
              <Shimmer width={500} height={500} />
            ) : (
              <>
                <ErrorMessage>{error}</ErrorMessage>
                <Label>New Password:</Label>
                <Input type="password" value={newpassword} onChange={handlePasswordChange} placeholder="Enter your new password" required />
                <SubmitButton type="submit">Reset Password</SubmitButton>
              </>
            )}
          </Form>
        </BorderedFormContainer>
      </ResetPasswordContainer>
    </>
  );
};

export default ResetPassword;
