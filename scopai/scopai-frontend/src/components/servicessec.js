import React from 'react';
import styled from 'styled-components';
import Footer from './footer';
import Header from './header';
import GalaxyBackground from './galaxybackground';

const ServicesSectionWrapper = styled.section`
  background-size: cover;
  padding: 80px 20px;

  text-align: center;
`;

const SectionTitle = styled.h2`
 font-size: 36px;
color:white;

  margin-bottom: 20px;
`;

const SectionContent = styled.p`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 30px;


`;

const ServiceCard = styled.div`
  max-width: 600px;
  margin: 0 auto 40px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  border: 1px solid black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`;

const ServiceTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
`;

const ServiceDescription = styled.p`
  font-size: 16px;
  color: white;
`;

const ServicesSection = () => {
  const services = [
    {
      title: 'Generative AI Optimization',
      icon: '🚀',
      description:
        'Optimize your Solidity smart contracts using advanced generative AI algorithms to enhance efficiency and reduce gas costs.',
    },
    {
      title: 'Advertisement Opportunities',
      icon: '📢',
      description:
        'Monetize your blockchain projects by placing targeted advertisements through SCOPAI, reaching a wide community of developers.',
    },
    {
      title: 'Smart Contract Analysis',
      icon: '📊',
      description:
        'Gain insights into your smart contract efficiency and receive comprehensive analysis reports for better decision-making.',
    },
    // Add more services as needed
  ];

  return (
    <>
      <GalaxyBackground />
      <Header />
      <ServicesSectionWrapper>
        <SectionTitle>Services Provided by SCOPAI</SectionTitle>
        <SectionContent>
          Explore our range of services designed to optimize, secure, and analyze your smart contracts using SCOPAI.
        </SectionContent>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesSectionWrapper>
      <Footer />
    </>
  );
};

export default ServicesSection;
