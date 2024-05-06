import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import HeroSec from './herosec';
import GalaxyBackground from './galaxybackground';
import styled, { css } from 'styled-components';

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

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  z-index: 1001; /* Ensure it appears above the popup */
`;

const ImageContainer = styled.div`
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 80vh;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1; /* Ensure content is above the popup */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ showOverlay }) => (showOverlay ? 'rgba(0, 0, 0, 0.5)' : 'none')};/* Semi-transparent black */
  z-index: 999; /* Ensure it appears above other elements except the popup */
  pointer-events: ${({ showOverlay }) => (showOverlay ? 'auto' : 'none')}; /* Enable clicks on the overlay only if showOverlay is true */
`;

const LandingPage = () => {
  const location = useLocation();
  const [randomAd, setRandomAd] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const fetchRandomAd = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/adlist');
        if (response.ok) {
          const data = await response.json();
          setRandomAd(data);
          setShowOverlay(true); // Show overlay when popup is displayed
        } else {
          console.error('Failed to fetch random advertisement');
        }
      } catch (error) {
        console.error('Error fetching random advertisement:', error);
      }
    };

    fetchRandomAd();
  }, []);

  const closePopup = () => {
    setRandomAd(null);
    setShowOverlay(false); // Hide overlay when popup is closed
  };

  const renderRandomAd = () => {
    if (randomAd) {
      return (
        <PopupContainer>
          <CloseButton onClick={closePopup}>&times;</CloseButton>
          <ImageContainer>
            <Image src={`http://localhost:8000${randomAd.image}`} alt="Ad Poster" />
          </ImageContainer>
          <p>{randomAd.description}</p>
          <a href={randomAd.link} target="_blank" rel="noopener noreferrer">
            Visit Advertiser Website
          </a>
        </PopupContainer>
      );
    }
    return null;
  };

  return (
    <>
      <GalaxyBackground />
      <Header />
      <HeroSec />
      <ContentWrapper>
        {renderRandomAd()}
        <Overlay showOverlay={showOverlay} />
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default LandingPage;
