import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url('/Home.png'); 
  background-size: cover;
  background-position: center;
`;

const Section = styled.section`
  padding: 50px 0;
  background-color: rgba(255, 255, 255, 0.8); 
  background-image: url('/Home.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const AdvertisementContainer = styled.div`
  padding: 80px 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: #0C2D48;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const SectionContent = styled.p`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 30px;
  background-color: black; 
  padding: 20px; 
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #0C2D48;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #145DA0;
  }
`;

const AdvertisementPage = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('user');
  const subscription = localStorage.getItem('subscription');

  const handleUploadClick = () => {
    navigate('/adupload');
  };

  return (
    <PageContent>    
      {/* Advertisement Section */}
      <AdvertisementContainer>
        <SectionTitle>Advertisement Module</SectionTitle>
        <SectionContent>
          SCOPAI's advertisement module allows you to promote blockchain-related ads to a targeted audience, providing an effective way to reach potential users and investors in the blockchain community.
        </SectionContent>
        {/* Add advertisement content here */}
        <SectionContent>
          Optimizing gas consumption is important in Ethereum smart contract development to reduce transaction costs and make DApps more efficient and economical for users.
        </SectionContent>
        <SectionContent>
          Promoting optimized smart contract code enhances scalability, reduces gas costs, and improves overall efficiency of decentralized applications (DApps).
        </SectionContent>
        {/* Check if user is logged in and subscribed, then show the upload button */}
        {loggedIn && subscription === 'true' && (
          <Button onClick={handleUploadClick}>Upload Advertisement</Button>
        )}
      </AdvertisementContainer>
    </PageContent>
  );
};

export default AdvertisementPage;
