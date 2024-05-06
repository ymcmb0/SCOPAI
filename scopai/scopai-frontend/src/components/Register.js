import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Loader from './logospinner';
import { Shimmer } from 'react-shimmer';
import GalaxyBackground from './galaxybackground';
import Recaptcha from 'react-recaptcha';
// Styled components
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5); /* Transparent white background */
  box-shadow: 0px 0px 10px #000;
`;

const LogoImg = styled.img`
  width: 80px;
  height: 80px;
  filter: invert(100%);
  margin: 0 auto 20px;
  display: block;
`;

const Title = styled.h2`
  color: #000000;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 7px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
`;

const CheckboxLabel = styled.label`
  color: #000000;
`;

const SubmitButton = styled.button`
  background-color: #0C2D48;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-top: 5px;
`;

const RegisterLink = styled.p`
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;


const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false); // State for success message
  const [captchaVerified, setCaptchaVerified] = useState(false); // State to track captcha verification
  useEffect(() => {
    if (user) {
      navigate('/landingsection');
    }
  }, [navigate, user]);
  const handleCaptchaVerify = (response) => {
    if (response) {
      setCaptchaVerified(true);
    }
  };
  const handleRegister = async (data) => {
    console.log('Registration payload:', data);
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/register', data);
      console.log('Registration successful:', response.data);
      setLoading(false);
      // Set success message
      setSuccessMessage('Registration successful! Please check your email for the activation link.');
    } catch (error) {
      setLoading(false);
      console.error('Registration failed', error);
      if (error.response) {
        console.error('HTTP error:', error.response.data);
      } else if (error.message) {
        console.error('Error:', error.message);
      }
    }
  };

  return (
  <>
  <GalaxyBackground />
    <RegisterContainer>
     {loading ? (
        <Shimmer width={500} height={500} />
      ) : (
      <FormWrapper>
        <LogoImg src="/Logo.png" alt="Logo" />
        <Title>Register</Title>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <Form onSubmit={handleSubmit(handleRegister)}>

          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <Label>Email:</Label>
          <Input type="email" {...register('email', { required: 'Email is required' })} />

          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
          <Label>Username:</Label>
          <Input type="text" {...register('username', { required: 'Username is required' })} />

          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          <Label>Password:</Label>
          <Input type="password" {...register('password', { required: 'Password is required' })} />

          <Label>Register As:</Label>
          <CheckboxContainer>
            <CheckboxInput type="checkbox" {...register('is_developer', { value: true })} />
            <CheckboxLabel>Developer</CheckboxLabel>
          </CheckboxContainer>
          <CheckboxContainer>
            <CheckboxInput type="checkbox" {...register('is_advertiser', { value: true })} />
            <CheckboxLabel>Advertiser</CheckboxLabel>
          </CheckboxContainer>

          {errors.isDeveloper && <ErrorMessage>{errors.isDeveloper.message}</ErrorMessage>}
          {errors.isAdvertiser && <ErrorMessage>{errors.isAdvertiser.message}</ErrorMessage>}
        <Recaptcha
                sitekey="6Ld7184pAAAAAMS6MLYExjOWUKbC3Kpt2yA1FFMh"
                render="explicit"
                verifyCallback={handleCaptchaVerify}
              />
          <SubmitButton type="submit"
          //disabled={!captchaVerified}
          >Register</SubmitButton>
        </Form>

        <RegisterLink>
          Already registered? <a href="/login">Login here</a>
        </RegisterLink>
        <RegisterLink>
          Go to Homepage <a href="/landingsection">Click here</a>
        </RegisterLink>
      </FormWrapper>)}
    </RegisterContainer>
    </>
  );
};

export default Register;
