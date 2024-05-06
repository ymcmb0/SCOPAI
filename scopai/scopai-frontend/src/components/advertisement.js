import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import GalaxyBackground from './galaxybackground';

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AdvertisementContainer = styled.div`
  padding: 80px 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 36px;
  margin-bottom: 20px;
`;

const SectionContent = styled.p`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.8);
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
    <>
      <GalaxyBackground />
      <Header />
      <PageContent>
        <AdvertisementContainer>
          <SectionTitle>Advertisement Module</SectionTitle>
          <SectionContent>
            Welcome to SCOPAI's Advertisement Module. Here, you can promote your blockchain-related ads to a targeted audience, reaching potential users and investors within the blockchain community.
          </SectionContent>
          {/* Additional SectionContent with benefits of advertising */}
          <SectionContent>
            Advertising on SCOPAI provides several benefits:
            <ul>
              <li>Reach a targeted audience interested in blockchain technology.</li>
              <li>Enhance visibility for your blockchain projects and products.</li>
              <li>Connect with potential users and investors looking for innovative solutions.</li>
              <li>Drive traffic to your platform or decentralized application (DApp).</li>
            </ul>
          </SectionContent>
          {/* Check if user is logged in and subscribed, then show the upload button */}
          {loggedIn && subscription === 'true' && (
            <Button onClick={handleUploadClick}>Upload Advertisement</Button>
          )}
          {/* Add a call-to-action to sign up for advertising */}
          {!loggedIn && (
            <SectionContent>
              Sign up now to start advertising your blockchain projects and products!
              <Button onClick={() => navigate('/register')}>Sign Up</Button>
            </SectionContent>
          )}
        </AdvertisementContainer>
      </PageContent>
      <Footer />
    </>
  );
};

export default AdvertisementPage;
