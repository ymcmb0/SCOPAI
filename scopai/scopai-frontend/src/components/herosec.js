import React,{useState} from 'react';
import styled from 'styled-components';
// Styled components
const Hero = styled.section`
  position: relative;
  max-width:1400px;
  width: 100%;
  background-position:center; /* Center the background image */
  font-family:'poppins',sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0; /* to reset margin */
  overflow: hidden;
`;

const TextContainer = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  margin-bottom: 10px;
  color: black;
  background-color:white;
   border-radius: 15px;

`;

const HeroParagraph = styled.p`
  margin: 0;
  color:#fff;
`;

const GetStartedButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #424949;
  color: white;
  text-decoration: none;
  border-radius: 14px;
 &:hover {
    color: black;
    background-color:white;
    textDecoration:underline;
  }
`;

// Interactive Button
const InteractiveButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #424949;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const HeroSec = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <>
      <main className="main">
        <Hero>
          <TextContainer>
            <HeroTitle>Optimize Your Workflow</HeroTitle>
            <HeroParagraph>
              SCOPAI is a powerful tool that empowers teams
            </HeroParagraph>
            <HeroParagraph>
              to manage projects, collaborate seamlessly,
            </HeroParagraph>
            <HeroParagraph>and achieve greater efficiency.</HeroParagraph>
            <GetStartedButton href="/Optimize">Get Started</GetStartedButton>
          </TextContainer>
        </Hero>
        {isScrolled && (
          <InteractiveButton onClick={() => setIsScrolled(false)}>
            Go to Footer
          </InteractiveButton>
        )}
      </main>

    </>
  );
};

export default HeroSec;