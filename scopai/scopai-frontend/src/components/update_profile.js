import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/update-password',
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Password updated successfully:', response.data);
      setSuccessMessage(response.data.message);
      // Add any additional logic for handling success
    } catch (error) {
      console.error('Error updating password:', error.response.data);
      setError(error.response.data.error || 'An error occurred while updating password');
      // Add any additional logic for handling errors
    }
  };

  return (
    <FormContainer>
      <h3>Update Password</h3>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          name="old_password"
          placeholder="Current Password"
          value={formData.old_password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="new_password"
          placeholder="New Password"
          value={formData.new_password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="confirm_password"
          placeholder="Confirm New Password"
          value={formData.confirm_password}
          onChange={handleChange}
        />
        <Button type="submit">Update Password</Button>
      </form>
    </FormContainer>
  );
};

export default UpdatePasswordForm;
