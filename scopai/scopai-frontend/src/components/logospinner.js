// LogoSpinner.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LogoContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000; /* Ensure the spinner is above the overlay */
`;

const LogoImage = styled.img`
  width: 100px; /* Adjust size as needed */
  height: auto; /* Maintain aspect ratio */
  animation: ${spinAnimation} 2s linear infinite; /* Apply animation */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust transparency here */
  z-index: 9999; /* Ensure the overlay is above other content */
`;

export default function LogoSpinner({loading}) {
  return loading ? (
    <>
      <Overlay />
      <LogoContainer>
        <LogoImage src="/Logo.png" alt="Logo" />
      </LogoContainer>
    </>
  ): null;
}
