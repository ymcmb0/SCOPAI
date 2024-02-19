import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.section`
  border: 1px solid #000;
  position:relative;
  background-image: url('/Home.png');
  background-repeat: no-repeat;
  background-size: cover;
 background-position: center;
  width: 100%;
  height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  font-style:'bold';
  font-size:1.2rem;
  padding: 80px;
  font-family: 'Poppins', sans-serif;
  //margin: 0;
  overflow: hidden;
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

  return (
    <AboutWrapper>
      <h2 >ABOUT SCOPAI</h2>
      <p >{text}</p>
    </AboutWrapper>
  );
};

export default AboutSection;
