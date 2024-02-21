import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faClock, faLock, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

const FeaturePageWrapper = styled.div`
  background-image: url('/Home.png');
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  max-width: 1400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  padding: 110px;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  overflow-x: hidden;
`;

const Title = styled.h2`
  font-size: 36px;
  margin: 0px;
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const Feature = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .feature-content {
    color: #fff;

    .feature-icon {
      font-size: 40px;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .advertisement {
      color: #ddd;
      font-style: italic;
    }
  }
`;

const FeaturePage = () => {
  const features = [
    {
      id: 1,
      title: 'AI-Driven Optimization',
      description: 'Our generative AI optimizes solidity smart contracts for improved efficiency and reduced gas costs.',
      icon: faBrain,
      background:
        'https://images.unsplash.com/photo-1645713166780-80654705395b?ixlib=rb-1.2.1&ixid=MnwxMjA3TEhDbWU5&auto=format&fit=crop&w=800&h=400',
      advertisement: 'AI-powered optimization for smart contracts.',
    },
    {
      id: 2,
      title: 'Real-Time Monitoring',
      description: 'Monitor contract performance in real-time and make dynamic adjustments for optimal results.',
      icon: faClock,
      background:
        'https://images.pexels.com/photos/656177/data-analysis-chart-graph-business-656177.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      advertisement: 'Real-time insights into your smart contracts.',
    },
    {
      id: 3,
      title: 'Secure Smart Contracts',
      description: "Enhance the security of your smart contracts with SCOPAI's advanced security features.",
      icon: faLock,
      background:
        'https://images.pixabay.com/photos/cyber-security-lock-padlock-protection-1963515.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      advertisement: 'Advanced security features for your smart contracts.',
    },
    {
      id: 4,
      title: 'Advertisement Showcase',
      description: 'Advertise your blockchain products or services on SCOPAI and reach a vast community of developers.',
      icon: faNetworkWired,
      background:
        'https://images.unsplash.com/photo-1617098160799-c810482b3048?ixlib=rb-1.2.1&ixid=MnwxMjA3TEhDbWU5&auto=format&fit=crop&w=800&h=400',
      advertisement: 'Promote your products to a wide audience on SCOPAI.',
    },
  ];

  return (
    <FeaturePageWrapper>
      <Title>Key Features</Title>
      <FeaturesContainer>
        {features.map((feature) => (
          <Feature key={feature.id} background={feature.background}>
            <div className="feature-content">
              <div className="feature-icon">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="advertisement">{feature.advertisement}</div>
            </div>
          </Feature>
        ))}
      </FeaturesContainer>
    </FeaturePageWrapper>
  );
};

export default FeaturePage;
