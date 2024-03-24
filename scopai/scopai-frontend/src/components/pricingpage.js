import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PricingPageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 80px;
  background-size:cover;
  background-image: url('/Home.png');
  background-repeat:no-repeat;
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  color: #0C2D48;
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  overflow-x: auto;
  
`;


const Plan = styled.div` 
  word-wrap: break-word; /* Apply word wrap to long words */
  width: 300px;
  margin: 20px;
  padding: 30px;
  
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  overflow: hidden;
  background-color: #fff; /* Set background color */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add subtle box shadow */

  h3 {
    font-size: 24px;
    margin-bottom: 20px;
    color: black;
  }

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
    color: #555;
    overflow-wrap: break-word;
  }
  .price {
    font-size: 28px;
    margin-top: 30px;
    color: black;
  }

  .cta-button {
    margin-top: 30px;
    padding: 15px 30px;
    background-color: black;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const PricingPage = () => {
  const plans = [
    {
      name: 'Developer Plan',
      price: '$19.99/month',
      features: ['Generative AI Optimization', 'Smart Contract Analysis'],
      image: 'https://via.placeholder.com/300', // Placeholder image URL
    },
    {
      name: 'Advertiser Plan',
      price: '$29.99/month',
      features: ['Advertisement Opportunities', 'Blockchain Promotion'],
      image: 'https://via.placeholder.com/300', // Placeholder image URL
    },
    {
      name: 'Combo Plan',
      price: '$49.99/month',
      features: ['All Features from Developer and Advertiser Plans', 'ABC'],
      image: 'https://via.placeholder.com/300', // Placeholder image URL
    },
  ];

  return (
    <PricingPageWrapper>
      <Title>Pricing Plans</Title>
      <PlansContainer>
        {plans.map((plan, index) => (
          <Plan key={index}>
            <h3>{plan.name}</h3>
            <img src={plan.image} alt={plan.name} />
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
  );
};

export default PricingPage;