import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './footer';
import Header from './header';
import GalaxyBackground from './galaxybackground';

// Styled components
const AboutWrapper = styled.section`
  position: relative;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  font-style: bold;
  font-size: 1.3rem;
  padding: 80px;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
`;

const AboutContent = styled.div`
  max-width: 600px;
`;

const AboutText = styled.p`
  color: white;
  font-size: 18px;
  line-height: 1.5;
`;

const InteractiveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0c2d48;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2e8bc0;
  }
`;

const AboutSection = () => {
  const [text, setText] = useState('');
  const aboutText =
    'SCOPAI is a revolutionary platform that leverages cutting-edge technologies to provide innovative solutions for the blockchain industry. Our mission is to empower developers, advertisers, and businesses with powerful tools and insights to enhance their blockchain projects by optimizing Gas fees utilized by their smart contracts.';

  useEffect(() => {
    const writeText = async () => {
      for (let i = 0; i <= aboutText.length; i++) {
        setText(aboutText.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    };

    writeText();

    // Clean up the effect
    return () => setText('');
  }, []);

  const handleClick = () => {
    // Implement any interactive behavior here
    alert('Thanks for your interest in SCOPAI! Stay tuned for updates.');
  };

  return (
    <>
      <GalaxyBackground />
      <Header />
      <AboutWrapper>
        <h2>ABOUT SCOPAI</h2>
        <AboutContent>
          <AboutText>{text}</AboutText>
          <InteractiveButton onClick={handleClick}>Learn More</InteractiveButton>
        </AboutContent>
      </AboutWrapper>
      <Footer />
    </>
  );
};

export default AboutSection;
