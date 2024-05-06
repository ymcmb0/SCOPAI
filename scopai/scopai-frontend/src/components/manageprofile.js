import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './loggedinheader';
import { Shimmer } from 'react-shimmer'; // Import Shimmer from react-shimmer
import UpdateProfileForm from './update_profile'; // Import the UpdateProfileForm component
import UpdatePasswordForm from './updatepassword'; // Import the UpdatePasswordForm component

const ProfileContainer = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  margin-top: 100px;
  width: 200px;
  background-color: #fff;
  color: #000;
  height: calc(100vh - 100px); /* Adjusted sidebar height */
  position: fixed; /* Fix sidebar position */
  top: 0; /* Position sidebar at the top */
  left: 0; /* Position sidebar at the left */
  border-top-right-radius: 15px; /* Rounded top-right corner */
  border-bottom-right-radius: 15px; /* Rounded bottom-right corner */
`;

const SidebarItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: white;
    border-top-right-radius: 15px; /* Rounded top-right corner */
    border-bottom-right-radius: 15px; /* Rounded bottom-right corner */
  }
  ${({ active }) =>
    active &&
    `
    background-color: #000;
    color: white;
    border-top-right-radius: 15px; /* Rounded top-right corner */
    border-bottom-right-radius: 15px; /* Rounded bottom-right corner */
  `}
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: 60px;
  margin-left: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ManageProfile = () => {
  const [selectedOption, setSelectedOption] = useState('Manage User Info');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // If not logged in, redirect to the login page
      navigate('/login');
    }
  }, [navigate]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Header />
      <ProfileContainer>
        <Sidebar>
          <SidebarItem
            active={selectedOption === 'Manage User Info'}
            onClick={() => handleOptionClick('Manage User Info')}
          >
            Manage User Info
          </SidebarItem>
          <SidebarItem
            active={selectedOption === 'Manage Password'}
            onClick={() => handleOptionClick('Manage Password')}
          >
            Manage Password
          </SidebarItem>
        </Sidebar>
        <Content>
          <h2>{selectedOption}</h2>
          {selectedOption === 'Manage User Info' && (
            // Render UpdateProfileForm component when 'Manage Profile' is selected
            <UpdateProfileForm />
          )}
          {selectedOption === 'Manage Password' && (
            // Render UpdatePasswordForm component when 'Manage Password' is selected
            <UpdatePasswordForm />
          )}
        </Content>
      </ProfileContainer>
    </>
  );
};

export default ManageProfile;
