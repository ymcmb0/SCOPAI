import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
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
  margin-top: 80px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 10px;
  
`;

const Label = styled.label`
display: block;
margin-left: 80px;
margin-bottom: 7px;
text-align: left; /* Align the label text to the left */
width: 80%; /* Adjust the width if needed */
`;

const Input = styled.input`
  margin-left: 80px;
  width: 70%;
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
  margin-left: 80px;
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
  margin-left: 80px;
`;


const SubmitButton = styled.button`
  background-color: #0C2D48;
  margin-left: 60px;
  color: #ffffff;
  margin-left: 80px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 70%;

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
 const { register, handleSubmit, formState: { errors } } = useForm();
 const navigate = useNavigate();
 const user = localStorage.getItem("user");

 useEffect(()=>{
  if(user){
    navigate('/');
  }
 },[navigate])
  const handleRegister = async (data) => {
  console.log('Registration payload:', data);
  try {
    const response = await axios.post('http://localhost:8000/api/register', data); // Use axios for making the POST request
    console.log('Registration successful:', response.data);
    navigate("/");
    // Optionally, you can redirect the user to another page or show a success message
  } catch (error) {
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
            <Input type="password" {...register('password', { required: 'Password is required' })} />

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