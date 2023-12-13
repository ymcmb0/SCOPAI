import React from 'react';
import styled from 'styled-components';

const ServicesSectionWrapper = styled.section`
  background-color: #f5f5f5;
  background-image: url('/aboutsec.jpg');
  background-repeat:no-repeat;
  background-size:cover;
  padding: 80px 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: black;
  font-size: 2rem;
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
  background-color: black;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ServiceIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`;

const ServiceTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
`;

const ServiceDescription = styled.p`
  font-size: 16px;
  color: #fff;
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
  );
};

export default ServicesSection;
