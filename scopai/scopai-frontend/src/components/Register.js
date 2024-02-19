import React from 'react';
import { useForm } from 'react-hook-form';
//import axios from 'axios';
import styled from 'styled-components';

// Styled components
const RegisterContainer = styled.div`
//position:relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BorderedFormContainer = styled.div`
  border: 2px solid #cccccc;
  border-radius: 10px;
  width: 30%;
  //height: 100vh;
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
  text-align: center;
  margin: 10;
`;

const Title = styled.h2`
  color: #333333;
  text-align: center;
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 8px;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745; /* Green color */
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 120px;

  &:hover {
    background-color: #218838; /* Darker green on hover */
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-top: 5px; /* Increase or decrease as needed */
  font-size: 14px; /* Adjust the font size */
`;

const RegisterLink = styled.p`
  margin-top: 20px;
  font-size: 14px;
`;

const Register = () => {
 const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    console.log('Registration payload:', data);
    try {
      if (!data.isDeveloper && !data.isAdvertiser) {
        throw new Error('Please select either Developer or Advertiser.');
      }

      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      }
    catch (error) {
      console.error('Registration failed', error);
      // Handle registration failure, display error message to the user
      if (error.response) {
        // Handle HTTP errors (non-2xx responses)
        console.error('HTTP error:', error.response.data);
      } else if (error.message) {
        // Handle other errors
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <RegisterContainer>
      <BorderedFormContainer>
        <LogoAndTextContainer>
          <LogoImage src="/Logologin.png" alt="SCOPAI Logo" />
          <TitleL>SCOPAI</TitleL>
        </LogoAndTextContainer>
        <FormContainer>
          <Title>Register</Title>
          <form onSubmit={handleSubmit(handleRegister)}>
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            <Label>Email:</Label>
            <Input type="email" {...register('email', { required: 'Email is required' })} />

            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
            <Label>Username:</Label>
            <Input type="text" {...register('username', { required: 'Username is required' })} />

            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            <Label>Password:</Label>
            <Input type="password" {...register('password1', { required: 'Password is required' })} />

            <Label>Register As:</Label>
            <CheckboxContainer>
             <input type="checkbox" {...register('role', { value: 'Developer' })} />
              <label>Developer</label>
            </CheckboxContainer>
            <CheckboxContainer>
             <input type="checkbox" {...register('role', { value: 'Advertiser' })} />
              <label>Advertiser</label>
            </CheckboxContainer>

            {errors.isDeveloper && <ErrorMessage>{errors.isDeveloper.message}</ErrorMessage>}
            {errors.isAdvertiser && <ErrorMessage>{errors.isAdvertiser.message}</ErrorMessage>}

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