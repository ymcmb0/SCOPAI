import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import GalaxyBackground from './galaxybackground';

// Styled components
const PricingPageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 80px;
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  color: #fff;
`;

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const Plan = styled.div`
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 24px;
    margin-bottom: 20px;
    color: black;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 20px;
  }

  li {
    margin: 10px 0;
    color: #555;
  }

  .price {
    font-size: 28px;
    margin-bottom: 20px;
    color: black;
  }

  .cta-button {
    padding: 15px 30px;
    background-color: black;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`;

const PricingPage = () => {
  const plans = [
    {
      name: 'Developer Plan',
      price: '$15.00/month',
      features: ['Generative AI Optimization', 'Smart Contract Analysis'],
    },
    {
      name: 'Advertiser Plan',
      price: '$10.00/month',
      features: ['Advertisement Opportunities', 'Blockchain Promotion'],
    },
    {
      name: 'Combo Plan',
      price: '$25.00/month',
      features: ['All Features from Developer Plan', 'Advertiser Plan'],
    },
  ];

  return (
    <>
      <GalaxyBackground />
      <Header />
      <PricingPageWrapper>
        <Title>Pricing Plans</Title>
        <PlansContainer>
          {plans.map((plan, index) => (
            <Plan key={index}>
              <h3>{plan.name}</h3>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <div className="price">{plan.price}</div>
              <Link to="/makepayment">
                <button className="cta-button">Choose Plan</button>
              </Link>
            </Plan>
          ))}
        </PlansContainer>
      </PricingPageWrapper>
      <Footer />
    </>
  );
};

export default PricingPage;
