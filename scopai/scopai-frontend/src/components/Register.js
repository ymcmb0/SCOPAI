import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const RegisterContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100vh;
  background-image: url('/Home.png');
  background-size: cover;
  background-position: center;
`;

const BorderedFormContainer = styled.div`
  border: 2px solid #B1D4E0;
  width: 38%;
  height: 100vh;
  background-color: #B1D4E0;
  overflow: hidden;
  padding: 10px;
`;

const TextContainer = styled.div`
  color: #000000;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 3px;
`;

const TitleL = styled.h1`
  color: #000000;
  font-size: 25px;
  text-align: center;
  margin-bottom: 0px;
`;

const Title = styled.h2`
  color: #000000;
  text-align: center;
  margin-top: 0px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  
`;

const Label = styled.label`
display: block;
margin-left: 60px;
margin-bottom: 7px;
text-align: left; /* Align the label text to the left */
width: 80%; /* Adjust the width if needed */
`;

const Input = styled.input`
  margin-left: 60px;
  width: 80%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 80%;
  margin-left: 60px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  appearance: none;
  border: 2px solid #000000;
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;



const CheckboxLabel = styled.label`
  color: #000000;
  display: inline-block; /* Ensures inline-block layout */
  border-radius: 50%; /* Make the label circular */
`;


const SubmitButton = styled.button`
  background-color: #0C2D48;
  margin-left: 60px;
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
  margin-top: 5px;
`;

const RegisterLink = styled.p`
  margin-top: 1px;
  font-size: 14px;
  margin-left: 160px;
  margin-bottom: 0px;
`;

const Register = () => {
  const [error, setError] = useState('');

  const handleRegister = async (data) => {
  console.log('Registration payload:', data);
    try {
      if (!data.role) {
        throw new Error('Please select either Developer or Advertiser.');
      }

      const response = await axios.post('http://localhost:8000/api/register/', data);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <RegisterContainer>
      <BorderedFormContainer>
        <TextContainer>
          <TitleL>Create an Account</TitleL>
        </TextContainer>
        <FormContainer>
          <Title>Register</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={handleRegister}>
            <Label>Email:</Label>
            <Input type="email" name="email" placeholder="Enter your email" required />

            <Label>Username:</Label>
            <Input type="text" name="username" placeholder="Enter your username" required />

            <Label>Password:</Label>
            <Input type="password" name="password" placeholder="Enter your password" required />

            <Label>Register As:</Label>
            <CheckboxContainer>
              <CheckboxInput type="checkbox" name="role" value="Developer" />
              <CheckboxLabel>Developer</CheckboxLabel>
            </CheckboxContainer>
            <CheckboxContainer>
              <CheckboxInput type="checkbox" name="role" value="Advertiser" />
              <CheckboxLabel>Advertiser</CheckboxLabel>
            </CheckboxContainer>

            <SubmitButton type="submit">Register</SubmitButton>
          </form>

          <RegisterLink>
            Already registered? <a href="/login">Login here</a>
          </RegisterLink>
          <RegisterLink>
            Goto Homepage <a href="/home">Click here</a>
          </RegisterLink>
        </FormContainer>
      </BorderedFormContainer>
    </RegisterContainer>
  );
};

export default Register;
