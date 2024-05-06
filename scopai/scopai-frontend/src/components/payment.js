import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Loader from './logospinner';
import Header from './loggedinheader';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9; /* Set background color */
`;

const Logo = styled.img`
  position: absolute;
  top: 20px; /* Adjust the position of the logo */
  left: 20px; /* Adjust the position of the logo */
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add box shadow */
  width: 40%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  gap: 12px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CardElementContainer = styled.div`
  border: 1px solid #ccc; /* Border style */
  border-radius: 4px; /* Rounded corners */
  padding: 10px; /* Padding inside the container */
`;

const Button = styled.button`
  padding: 12px;
  background-color: #0c2d48;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #145da0;
  }
`;

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const subscribe = localStorage.getItem('subscribed_user');
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (localStorage.getItem('user') && subscribe === true) {
      navigate('/landingsection');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    selected_plan: '',
    email: '',
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));
    if (error) {
      setLoading(false);
      console.error('Stripe error:', error);
      return;
    }
    const brand = token.card.brand;
    const formattedBrand = `tok_${brand.toLowerCase()}`;
   const Email=localStorage.getItem('user');
    try {
      const response = await axios.post('http://localhost:8000/api/make_payment', {
        pm_card_token: formattedBrand,
        name: formData.name,
        email: Email,
        selected_plan: formData.selected_plan,
      });
      console.log(response.data);
      if (response.data.status === 201) {

        localStorage.setItem('subscription', true);
        localStorage.setItem('subscribed_user', true);
        if (localStorage.getItem('user')) {

          navigate('/landingsection');
        }
      }
      setLoading(false);
      // Handle success response
    } catch (error) {
      console.error('Error:', error.response.data);
      // Handle error response
      setLoading(false);
    }
  };

  return (
  <>
   <Header />
    <Container>
      <Loader loading={loading} />
      <FormContainer>
        <Title>Make Payment</Title>
        <Form onSubmit={handleSubmit}>
          <Label>
            Card Number:
            <CardElementContainer>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
              />
            </CardElementContainer>
          </Label>
          <Label>
            Selected Plan:
            <Select name="selected_plan" value={formData.selected_plan} onChange={handleChange}>
              <option value="advertiser">Advertiser Plan</option>
              <option value="developer">Developer Plan</option>
              <option value="both">Combined Plan</option>
            </Select>
          </Label>
          <Label>
            Email:
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="scopai1234@gmail.com"
            />
          </Label>
          <Label>
            Name:
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Wick"
            />
          </Label>
          <Button type="submit">Pay Now</Button>
        </Form>
      </FormContainer>
    </Container>
  </>
  );
};

export default PaymentForm;
