import React from 'react';
import Header from './header';
import Footer from './footer';
import styled from 'styled-components';

// Styled component for the entire page content
const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url('/Home.png'); /* Apply background image to the entire page */
  background-size: cover;
  background-position: center;
`;

// Styled component for sections
const Section = styled.section`
  padding: 50px 0;
  background-color: rgba(255, 255, 255, 0.8); /* Set background color for content */
  background-image: url('/Home.png'); /* Apply same background image to each section */
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* Set minimum height to full viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Styled component for the advertisement container
const AdvertisementContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  overflow-y: auto;
  min-height: 100vh; /* Set minimum height to full viewport height */
`;

// Styled component for the advertisement content
const AdvertisementContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdvertisementPage = () => {
  return (
    <PageContent>
      <Header />
      
      {/* Advertisement Section */}
      <AdvertisementContainer>
        <AdvertisementContent>
          {/* Text about advertisement on the left side */}
          <div>
            <h2>Advertisement Module</h2>
            <p>This is where you can showcase your advertisement content.</p>
          </div>
          {/* Button on the right side */}
          <button>Get Started</button>
        </AdvertisementContent>
      </AdvertisementContainer>
      
      {/* Pricing Section */}
      <Section>
        <h2>Pricing</h2>
        {/* Your pricing content goes here */}
        <p>Display your pricing plans here.</p>
      </Section>
      
      {/* How It Works Section */}
      <Section>
        <h2>How It Works</h2>
        {/* Your how it works content goes here */}
        <p>Explain how your platform works.</p>
      </Section>
      
      {/* Testimonials Section */}
      <Section>
        <h2>Testimonials</h2>
        {/* Your testimonials content goes here */}
        <p>Display testimonials from satisfied customers.</p>
      </Section>
      
      {/* FAQs Section */}
      <Section>
        <h2>FAQs</h2>
        {/* Your FAQs content goes here */}
        <p>Answer common questions users may have.</p>
      </Section>
      
      {/* Contact Section */}
      <Section>
        <h2>Contact</h2>
        {/* Your contact content goes here */}
        <p>Provide contact information and a form for inquiries.</p>
      </Section>
      
      <Footer />
    </PageContent>
  );
};

export default AdvertisementPage;