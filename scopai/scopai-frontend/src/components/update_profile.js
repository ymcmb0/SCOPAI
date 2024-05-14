
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 20px;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  z-index: 999; /* Ensure it appears above other elements */
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Ensure it appears above other elements */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const UpdateProfileForm = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUsername && newEmail) {
      setShowPasswordPopup(true);
    } else {
      setError('Please enter new username and email');
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8000/api/updateprofile',
        {
          new_username: newUsername,
          new_email: newEmail,
          password: password,
        },
        {
          headers: {
            Authorization: `Token ${token}`, // Corrected string interpolation
          }
        },
      );
      setSuccessMessage(response.data.message);
      setShowPasswordPopup(false);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleClosePopup = () => {
    setShowPasswordPopup(false);
  };

  return (
    <FormContainer>
      <h2>Update Profile</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="newUsername">New Username:</Label>
          <Input type="text" id="newUsername" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="newEmail">New Email:</Label>
          <Input type="email" id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
        </InputWrapper>
        <Button type="submit">Submit</Button>
      </form>

      {showPasswordPopup && (
        <>
          <PopupOverlay onClick={handleClosePopup} />
          <PopupContainer>
            <CloseButton onClick={handleClosePopup}>Close</CloseButton>
            <h3>Enter Password</h3>
            <InputWrapper>
              <Label htmlFor="password">Password:</Label>
              <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </InputWrapper>
            <Button onClick={handlePasswordSubmit}>Submit</Button>
          </PopupContainer>
        </>
      )}
    </FormContainer>
  );
};

export default UpdateProfileForm;