import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App'; // Update the path to your main App component
import "./index.css";
const stripePromise = loadStripe('pk_test_51OxRN4JAEZblQ9ZU4DZDgVvg4WJ7IOBXu7GIjJGUKfLsSiEdaqMkFydOuwm1nBecSB7OMZQdmmanXpAqAPaf6RV700AERon3tx');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
